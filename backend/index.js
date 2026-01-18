import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import basicAuth from "basic-auth"; 
import rateLimit from "express-rate-limit";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
});
app.use(limiter);

// Basic Auth function
function requireAuth(req, res, next) {
  const user = basicAuth(req);

  const USERNAME = process.env.ADMIN_USER || "admin";
  const PASSWORD = process.env.ADMIN_PASS || "password";

  if (!user || user.name !== USERNAME || user.pass !== PASSWORD) {
    res.set("WWW-Authenticate", 'Basic realm="Profile Admin"');
    return res.status(401).send("Authentication required.");
  }

  next();
}

// =====================
// Health Check
// =====================
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// =====================
// PROFILE CRUD
// =====================

// READ profile
app.get("/profile", async (req, res) => {
  const profile = await prisma.profile.findFirst({
    include: {
      skills: true,
      projects: true,
      work: true,
    },
  });
  res.json(profile);
});

// CREATE profile
app.post("/profile", requireAuth, async (req, res) => {
  const data = req.body;
  const profile = await prisma.profile.create({ data });
  res.json(profile);
});

// UPDATE profile
app.put("/profile/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;

  const updated = await prisma.profile.update({
    where: { id },
    data,
  });

  res.json(updated);
});

// =====================
// QUERY ENDPOINTS
// =====================

// Get all projects OR filter by skill
app.get("/projects", async (req, res) => {
  const skill = req.query.skill ? req.query.skill.trim() : null;

  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Fetch all projects first
  const projects = await prisma.project.findMany();

  // If skill filter exists → filter manually
  let filteredProjects = projects;

  if (skill) {
    filteredProjects = projects.filter((p) =>
      p.skillsUsed.some((s) => s.toLowerCase() === skill.toLowerCase()),
    );
  }

  // Apply pagination AFTER filtering
  const paginated = filteredProjects.slice(skip, skip + limit);

  res.json(paginated);
});


// Get top skills
app.get("/skills/top", async (req, res) => {
  const skills = await prisma.skill.groupBy({
    by: ["name"],
    _count: { name: true },
    orderBy: { _count: { name: "desc" } },
  });

  res.json(skills);
});

// Search projects by keyword or skill (case-insensitive)
app.get("/search", async (req, res) => {
  const q = req.query.q ? req.query.q.trim() : ""

  if (!q) {
    const allProjects = await prisma.project.findMany()
    return res.json(allProjects)
  }

  const projects = await prisma.project.findMany()

  const filtered = projects.filter(p => {
    const textMatch =
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.description.toLowerCase().includes(q.toLowerCase())

    const skillMatch =
      p.skillsUsed?.some(s =>
        s.toLowerCase().includes(q.toLowerCase())
      )

    return textMatch || skillMatch
  })

  res.json(filtered)
});

// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

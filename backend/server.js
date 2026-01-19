import express from "express";
import cors from "cors";
import "dotenv/config";
import basicAuth from "basic-auth"; 
import rateLimit from "express-rate-limit";

// Static data instead of database
const staticData = {
  profile: {
    id: 1,
    name: "Anurag Kumar",
    email: "231220014@nitdelhi.ac.in",
    education: "B.Tech in Electronics & Communication Engineering, NIT Delhi (CGPA: 7.60)",
    github: "https://github.com/Anurag47-ak",
    linkedin: "https://www.linkedin.com/in/anurag-kumar-307204260/",
    portfolio: ""
  },
  projects: [
    {
      id: 1,
      title: "Arithmetic Logic Unit (ALU) Design",
      description: "Complete digital design and implementation of an Arithmetic Logic Unit capable of performing various arithmetic and logical operations with optimized circuit design.",
      link: "https://github.com/Anurag47-ak/ARITHMETIC-LOGIC-UNIT-ALU-",
      skillsUsed: "Verilog, Digital Design, MATLAB, Circuit Design"
    },
    {
      id: 2,
      title: "RAM Design",
      description: "Random Access Memory design project implementing memory architecture with read/write operations, address decoding, and memory management systems.",
      link: "https://github.com/Anurag47-ak/RAM-DESIGN",
      skillsUsed: "Verilog, Digital Design, Memory Architecture, MATLAB"
    },
    {
      id: 3,
      title: "Digital Filter Design",
      description: "Implementation of digital signal processing filters including FIR and IIR filters with frequency response analysis and filter optimization techniques.",
      link: "https://github.com/Anurag47-ak/DIGITAL-FILTER-DESIGN",
      skillsUsed: "MATLAB, Signal Processing, Filter Design, DSP"
    },
    {
      id: 4,
      title: "Pipeline Processor Design",
      description: "Advanced pipelined processor architecture implementation with hazard detection, forwarding units, and performance optimization for enhanced throughput.",
      link: "https://github.com/Anurag47-ak/PIPELINE-PROCESSOR-DESIGN",
      skillsUsed: "Verilog, Computer Architecture, Pipeline Design, MATLAB"
    },
    {
      id: 5,
      title: "Personal Portfolio",
      description: "Professional portfolio website showcasing projects, skills, and achievements with responsive design and modern web technologies.",
      link: "https://github.com/Anurag47-ak/portfolio",
      skillsUsed: "HTML, CSS, JavaScript, Web Design"
    }
  ],
  skills: [
    "C", "C++", "Python", "JavaScript", "HTML", "CSS", "Verilog", "VHDL",
    "React.js", "Node.js", "Express.js", "REST APIs", "Digital Design",
    "Computer Architecture", "VLSI Design", "Circuit Design", "Memory Architecture",
    "Pipeline Design", "MATLAB", "Signal Processing", "Filter Design", "DSP",
    "Git", "GitHub", "Web Design"
  ],
  work: [
    {
      id: 1,
      company: "NIT Delhi",
      role: "Electronics & Communication Engineering Student",
      duration: "2022 - 2026"
    },
    {
      id: 2,
      company: "GitHub",
      role: "Open Source Contributor", 
      duration: "2023 - Present"
    }
  ]
};

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
app.get("/", (req, res) => {
  res.json({ 
    message: "Portfolio API is running! ✅", 
    endpoints: [
      "GET /profile - Get profile data",
      "GET /projects - Get all projects", 
      "GET /skills - Get all skills",
      "GET /work - Get work experience",
      "GET /search?q=term - Search projects"
    ]
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// =====================
// PROFILE API ENDPOINTS
// =====================

// GET /profile - Get profile data
app.get("/profile", (req, res) => {
  try {
    res.json(staticData.profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// GET /projects - Get all projects
app.get("/projects", (req, res) => {
  try {
    res.json(staticData.projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET /skills - Get all skills
app.get("/skills", (req, res) => {
  try {
    res.json(staticData.skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// GET /work - Get work experience
app.get("/work", (req, res) => {
  try {
    res.json(staticData.work);
  } catch (error) {
    console.error("Error fetching work experience:", error);
    res.status(500).json({ error: "Failed to fetch work experience" });
  }
});

// GET /search - Search projects by skill
app.get("/search", (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json(staticData.projects);
    }
    
    const filteredProjects = staticData.projects.filter(project => 
      project.skillsUsed.toLowerCase().includes(query.toLowerCase()) ||
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json(filteredProjects);
  } catch (error) {
    console.error("Error searching projects:", error);
    res.status(500).json({ error: "Failed to search projects" });
  }
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
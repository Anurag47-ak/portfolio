import express from "express";
import cors from "cors";
import "dotenv/config";
import basicAuth from "basic-auth"; 
import rateLimit from "express-rate-limit";

// Static data - Anurag Kumar's Portfolio
const staticData = {
  profile: {
    id: 1,
    name: "Anurag Kumar",
    email: "231220014@nitdelhi.ac.in",
    education: "B.Tech in Electronics & Communication Engineering, NIT Delhi (CGPA: 7.60)",
    github: "https://github.com/Anurag47-ak",
    linkedin: "https://www.linkedin.com/in/anurag-kumar-307204260/",
    portfolio: "",
    skills: [
      { id: 1, name: "C" },
      { id: 2, name: "C++" },
      { id: 3, name: "Python" },
      { id: 4, name: "JavaScript" },
      { id: 5, name: "HTML" },
      { id: 6, name: "CSS" },
      { id: 7, name: "Verilog" },
      { id: 8, name: "VHDL" },
      { id: 9, name: "React.js" },
      { id: 10, name: "Node.js" },
      { id: 11, name: "Express.js" },
      { id: 12, name: "REST APIs" },
      { id: 13, name: "Digital Design" },
      { id: 14, name: "Computer Architecture" },
      { id: 15, name: "VLSI Design" },
      { id: 16, name: "Circuit Design" },
      { id: 17, name: "Memory Architecture" },
      { id: 18, name: "Pipeline Design" },
      { id: 19, name: "MATLAB" },
      { id: 20, name: "Signal Processing" },
      { id: 21, name: "Filter Design" },
      { id: 22, name: "DSP" },
      { id: 23, name: "Git" },
      { id: 24, name: "GitHub" },
      { id: 25, name: "Web Design" }
    ],
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

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'https://portfolio-5-p431.onrender.com',
    /\.onrender\.com$/
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Request Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});
app.use(limiter);

// Basic Auth
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

// API Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Anurag Kumar's Portfolio API ✅", 
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

app.get("/profile", (req, res) => {
  res.json(staticData.profile);
});

app.get("/projects", (req, res) => {
  res.json(staticData.projects);
});

app.get("/skills", (req, res) => {
  res.json(staticData.skills);
});

app.get("/work", (req, res) => {
  res.json(staticData.work);
});

app.get("/search", (req, res) => {
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
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Anurag's Portfolio API running on http://localhost:${PORT}`);
});

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.skill.deleteMany()
  await prisma.project.deleteMany()
  await prisma.work.deleteMany()
  await prisma.profile.deleteMany()

  await prisma.profile.create({
    data: {
      name: "Srijan Kumar",
      email: "231220062@nitdelhi.ac.in",
      education:
        "B.Tech in Electronics & Communication Engineering, NIT Delhi (CGPA: 7.97) | Minor in AI & ML",

      github: "https://github.com/skksrijan",
      linkedin: "https://www.linkedin.com/in/srijan-kumar-9112a4291/",
      portfolio: "",

      skills: {
        create: [
          // Languages
          { name: "C" },
          { name: "C++" },
          { name: "Python" },
          { name: "JavaScript" },
          { name: "HTML" },
          { name: "CSS" },
          { name: "SQL" },

          // Web
          { name: "React.js" },
          { name: "Node.js" },
          { name: "Express.js" },
          { name: "MongoDB" },
          { name: "REST APIs" },

          // ML / Data
          { name: "Machine Learning" },
          { name: "Deep Learning" },
          { name: "TensorFlow" },
          { name: "Pandas" },
          { name: "NumPy" },
          { name: "Scikit-Learn" },
          { name: "Data Visualization" },
          { name: "ETL" },
          { name: "Statistics" },

          // Tools
          { name: "Git" },
          { name: "GitHub" },
          { name: "MATLAB" },
          //{ name: "Figma" },
        ],
      },

      projects: {
        create: [
          {
            title: "Smart Blood Banking System",
            description:
              "Full-stack MERN platform connecting donors, recipients and hospitals in real-time with automated hospital assignment, real-time notifications, hospital dashboard, and ML-based demand forecasting.",
            link: "https://github.com/skksrijan/BloodBridge-A-Smart-Blood-Banking-System",
            skillsUsed: [
              "React.js",
              "Node.js",
              "Express.js",
              "MongoDB",
              "Machine Learning",
            ],
          },
          {
            title: "SmartKhet – Agriculture Intelligence Platform",
            description:
              "ML & Deep Learning based agriculture decision-support system with CNN plant disease detection, crop & fertilizer recommendation using real-time weather data.",
            link: "https://github.com/skksrijan/SmartKhet-Smart-Farming-Assistant",
            skillsUsed: [
              "Python",
              "Machine Learning",
              "Deep Learning",
              "TensorFlow",
            ],
          },
          {
            title: "Personal Expense Tracker",
            description:
              "Python CLI application to log and view daily expenses with CSV-based persistent storage and clean terminal UI.",
            link: "https://github.com/skksrijan/expense-tracker",
            skillsUsed: ["Python", "CLI"],
          },
        ],
      },

      work: {
        create: [
          {
            company: "Amazon HackOn 2025",
            role: "Qualified Online Assessment Round",
            duration: "2025",
          },
          {
            company: "SIH 2024",
            role: "Team Lead – Virtual Tourism Solution",
            duration: "2024",
          },
        ],
      },
    },
  });

  console.log("Database seeded with updated resume data")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

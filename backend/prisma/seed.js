import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.skill.deleteMany()
  await prisma.project.deleteMany()
  await prisma.work.deleteMany()
  await prisma.profile.deleteMany()

  await prisma.profile.create({
    data: {
      name: "Anurag Kumar",
      email: "231220014@nitdelhi.ac.in",
      education:
        "B.Tech in Electronics & Communication Engineering, NIT Delhi (CGPA: 7.60) ",

      github: "https://github.com/Anurag47-ak",
      linkedin: "https://www.linkedin.com/in/anurag-kumar-307204260/",
      portfolio: "",

      skills: {
        create: [
          // Programming Languages
          { name: "C" },
          { name: "C++" },
          { name: "Python" },
          { name: "JavaScript" },
          { name: "HTML" },
          { name: "CSS" },
          { name: "Verilog" },
          { name: "VHDL" },

          // Web Technologies
          { name: "React.js" },
          { name: "Node.js" },
          { name: "Express.js" },
          { name: "REST APIs" },

          // Digital Design & Hardware
          { name: "Digital Design" },
          { name: "Computer Architecture" },
          { name: "VLSI Design" },
          { name: "Circuit Design" },
          { name: "Memory Architecture" },
          { name: "Pipeline Design" },

          // Signal Processing & Tools
          { name: "MATLAB" },
          { name: "Signal Processing" },
          { name: "Filter Design" },
          { name: "DSP" },

          // Development Tools
          { name: "Git" },
          { name: "GitHub" },
          { name: "Web Design" },
        ],
      },

      projects: {
        create: [
          {
            title: "Arithmetic Logic Unit (ALU) Design",
            description:
              "Complete digital design and implementation of an Arithmetic Logic Unit capable of performing various arithmetic and logical operations with optimized circuit design.",
            link: "https://github.com/Anurag47-ak/ARITHMETIC-LOGIC-UNIT-ALU-",
            skillsUsed: "Verilog, Digital Design, MATLAB, Circuit Design",
          },
          {
            title: "RAM Design",
            description:
              "Random Access Memory design project implementing memory architecture with read/write operations, address decoding, and memory management systems.",
            link: "https://github.com/Anurag47-ak/RAM-DESIGN",
            skillsUsed: "Verilog, Digital Design, Memory Architecture, MATLAB",
          },
          {
            title: "Digital Filter Design",
            description:
              "Implementation of digital signal processing filters including FIR and IIR filters with frequency response analysis and filter optimization techniques.",
            link: "https://github.com/Anurag47-ak/DIGITAL-FILTER-DESIGN",
            skillsUsed: "MATLAB, Signal Processing, Filter Design, DSP",
          },
          {
            title: "Pipeline Processor Design",
            description:
              "Advanced pipelined processor architecture implementation with hazard detection, forwarding units, and performance optimization for enhanced throughput.",
            link: "https://github.com/Anurag47-ak/PIPELINE-PROCESSOR-DESIGN",
            skillsUsed: "Verilog, Computer Architecture, Pipeline Design, MATLAB",
          },
          {
            title: "Personal Portfolio",
            description:
              "Professional portfolio website showcasing projects, skills, and achievements with responsive design and modern web technologies.",
            link: "https://github.com/Anurag47-ak/portfolio",
            skillsUsed: "HTML, CSS, JavaScript, Web Design",
          },
        ],
      },

      work: {
        create: [
          {
            company: "NIT Delhi",
            role: "Electronics & Communication Engineering Student",
            duration: "2022 - 2026",
          },
          {
            company: "GitHub",
            role: "Open Source Contributor",
            duration: "2023 - Present",
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

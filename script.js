// Project data
const projects = [
    {
        id: 1,
        title: "Arithmetic Logic Unit (ALU) Design",
        description: "Comprehensive 32-bit ALU implementation supporting arithmetic, logical, and shift operations. Designed using Verilog HDL with optimized critical path analysis and comprehensive testbench validation.",
        technologies: ["Verilog", "Digital Design", "FPGA", "Hardware Verification", "Computer Architecture"],
        github: "https://github.com/Anurag47-ak/ALU-Design",
        demo: null,
        category: "Hardware Design"
    },
    {
        id: 2,
        title: "Random Access Memory (RAM) Design",
        description: "Custom RAM module design with configurable word width and depth parameters. Features synchronous read/write operations, address decoding logic, and memory initialization capabilities for FPGA implementation.",
        technologies: ["Verilog", "Memory Design", "FPGA", "Digital Systems", "Hardware Modeling"],
        github: "https://github.com/Anurag47-ak/RAM-Design",
        demo: null,
        category: "Memory Systems"
    },
    {
        id: 3,
        title: "Digital Filter Design & Implementation",
        description: "Advanced digital signal processing project implementing FIR and IIR filters using MATLAB. Includes frequency response analysis, filter coefficient optimization, and real-time signal processing capabilities.",
        technologies: ["MATLAB", "Signal Processing", "Digital Filters", "DSP", "Algorithm Design"],
        github: "https://github.com/Anurag47-ak/Digital-Filter-Design",
        demo: null,
        category: "Signal Processing"
    },
    {
        id: 4,
        title: "Pipeline Processor Architecture",
        description: "Five-stage pipelined MIPS processor implementation with hazard detection and forwarding mechanisms. Features instruction fetch, decode, execute, memory access, and write-back stages with performance optimization.",
        technologies: ["Verilog", "Computer Architecture", "Pipeline Design", "MIPS Assembly", "Performance Analysis"],
        github: "https://github.com/Anurag47-ak/Pipeline-Processor",
        demo: null,
        category: "Processor Design"
    },
    {
        id: 5,
        title: "Personal Portfolio Website",
        description: "Modern, responsive portfolio website showcasing academic projects and technical skills. Built with clean architecture, professional design, and optimized for performance and accessibility.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Web Development"],
        github: "https://github.com/Anurag47-ak/portfolio",
        demo: "https://portfolio-5-p431.onrender.com",
        category: "Web Development"
    }
];

let currentProjects = [...projects];
let currentSearchQuery = '';

// DOM elements
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const projectsGrid = document.getElementById('projectsGrid');
const projectCount = document.getElementById('projectCount');
const searchResults = document.getElementById('searchResults');
const noResults = document.getElementById('noResults');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProjects(currentProjects);
    
    // Add search input listener
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query) {
            clearBtn.style.display = 'block';
        } else {
            clearBtn.style.display = 'none';
        }
    });
    
    // Add enter key support for search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
});

// Render projects
function renderProjects(projectsToRender) {
    if (projectsToRender.length === 0) {
        projectsGrid.style.display = 'none';
        noResults.style.display = 'block';
        projectCount.textContent = '0';
        return;
    }
    
    projectsGrid.style.display = 'grid';
    noResults.style.display = 'none';
    projectCount.textContent = projectsToRender.length;
    
    projectsGrid.innerHTML = projectsToRender.map(project => `
        <div class="project-card">
            <div class="project-header">
                <h4 class="project-title">${project.title}</h4>
            </div>
            
            <p class="project-description">${project.description}</p>
            
            <div class="project-tech">
                ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
            
            <div class="project-links">
                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link github">
                    <span>GitHub</span>
                </a>
                ${project.demo ? `
                    <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link demo">
                        <span>Live Demo</span>
                    </a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Search functionality
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    currentSearchQuery = query;
    
    if (!query) {
        showAllProjects();
        return;
    }
    
    const filteredProjects = projects.filter(project => {
        const searchString = `
            ${project.title} 
            ${project.description} 
            ${project.technologies.join(' ')} 
            ${project.category}
        `.toLowerCase();
        
        return searchString.includes(query);
    });
    
    currentProjects = filteredProjects;
    renderProjects(currentProjects);
    
    // Update search results text
    if (filteredProjects.length > 0) {
        searchResults.style.display = 'block';
        searchResults.textContent = `Showing ${filteredProjects.length} result${filteredProjects.length === 1 ? '' : 's'} for "${query}"`;
    } else {
        searchResults.style.display = 'none';
    }
}

// Search by skill tag
function searchBySkill(skill) {
    searchInput.value = skill;
    clearBtn.style.display = 'block';
    handleSearch();
    
    // Smooth scroll to projects section
    document.querySelector('.projects-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Clear search
function clearSearch() {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    currentSearchQuery = '';
    showAllProjects();
}

// Show all projects
function showAllProjects() {
    currentProjects = [...projects];
    renderProjects(currentProjects);
    searchResults.style.display = 'none';
    searchInput.value = '';
    clearBtn.style.display = 'none';
}

// Smooth scrolling for navigation
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effect to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key clears search
    if (e.key === 'Escape' && searchInput.value) {
        clearSearch();
        searchInput.blur();
    }
    
    // Ctrl+K or Cmd+K focuses search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add loading animation
function showLoading() {
    projectsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
            <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #666;">Loading projects...</p>
        </div>
    `;
}

// Add CSS for loading spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Add performance monitoring
function trackSearchPerformance(query, resultCount, duration) {
    console.log(`Search for "${query}" returned ${resultCount} results in ${duration}ms`);
}

// Enhanced search with performance tracking
function performSearch(query) {
    const startTime = performance.now();
    
    const filteredProjects = projects.filter(project => {
        const searchString = `
            ${project.title} 
            ${project.description} 
            ${project.technologies.join(' ')} 
            ${project.category}
        `.toLowerCase();
        
        return searchString.includes(query.toLowerCase());
    });
    
    const endTime = performance.now();
    trackSearchPerformance(query, filteredProjects.length, Math.round(endTime - startTime));
    
    return filteredProjects;
}
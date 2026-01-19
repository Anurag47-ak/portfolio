import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          axios.get(API + "/profile"),
          axios.get(API + "/projects")
        ]);
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
        setAllProjects(projectsRes.data);
        
        // Extract unique skills from projects
        const uniqueSkills = [...new Set(
          projectsRes.data.flatMap(p => 
            p.skillsUsed ? p.skillsUsed.split(", ").map(s => s.trim()) : []
          )
        )];
        setSkills(uniqueSkills);
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleSearch() {
    if (!query.trim()) {
      setProjects(allProjects);
      return;
    }
    try {
      const res = await axios.get(API + "/search?q=" + query);
      setProjects(res.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  function clearSearch() {
    setQuery("");
    setProjects(allProjects);
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1 className="logo">Portfolio Dashboard</h1>
          <p className="subtitle">Professional Profile & Project Showcase</p>
        </div>
      </header>

      <div className="container">
        {/* Profile Section */}
        {profile && (
          <section className="profile-section">
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar">
                  <span>{profile.name.charAt(0)}</span>
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{profile.name}</h2>
                  <p className="profile-email">{profile.email}</p>
                  <p className="profile-education">{profile.education}</p>
                </div>
              </div>
              
              <div className="profile-links">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="profile-link github">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link linkedin">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Search Section */}
        <section className="search-section">
          <div className="search-header">
            <h3>Explore Projects</h3>
            <p>Search projects by technology or skill</p>
          </div>
          
          <div className="search-container">
            <div className="search-bar">
              <svg className="search-icon" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM9.625,16.5A6.875,6.875,0,1,1,16.5,9.625,6.883,6.883,0,0,1,9.625,16.5Z"/>
              </svg>
              <input
                type="text"
                placeholder="Search by technology (e.g., React, Python, Machine Learning)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="search-input"
              />
              {query && (
                <button onClick={clearSearch} className="clear-btn">
                  ×
                </button>
              )}
            </div>
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>

          {/* Popular Skills */}
          <div className="popular-skills">
            <span className="skills-label">Popular Skills:</span>
            {skills.slice(0, 6).map((skill, index) => (
              <button
                key={index}
                className="skill-tag"
                onClick={() => {
                  setQuery(skill);
                  setTimeout(handleSearch, 100);
                }}
              >
                {skill}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects-section">
          <div className="section-header">
            <h3>Projects ({projects.length})</h3>
            {query && (
              <p className="search-results">Showing results for "{query}"</p>
            )}
          </div>

          {projects.length === 0 ? (
            <div className="no-results">
              <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7"/>
              </svg>
              <h4>No projects found</h4>
              <p>Try searching with different keywords or clear the search to see all projects.</p>
              <button onClick={clearSearch} className="clear-search-btn">Show All Projects</button>
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <h4 className="project-title">{project.title}</h4>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        title="View Project"
                      >
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  {project.skillsUsed && (
                    <div className="project-skills">
                      {project.skillsUsed.split(", ").map((skill, index) => (
                        <span key={index} className="skill-badge">{skill.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Portfolio Dashboard. Built with React & Express.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

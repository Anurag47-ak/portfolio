import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000";

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      const profileRes = await axios.get(API + "/profile");
      const projectsRes = await axios.get(API + "/projects");
      setProfile(profileRes.data);
      setProjects(projectsRes.data);
    }
    loadData();
  }, []);

  async function handleSearch() {
    const res = await axios.get(API + "/search?q=" + query);
    setProjects(res.data);
  }

  return (
    <div className="container">
      <h1>Candidate Profile Playground</h1>
      <hr />

      {profile && (
        <div className="profile">
          <h2>{profile.name}</h2>
          <p>{profile.education}</p>
          <p>
            <a href={profile.github} target="_blank">
              GitHub
            </a>{" "}
            |{" "}
            <a href={profile.linkedin} target="_blank">
              LinkedIn
            </a>
          </p>
        </div>
      )}

      <h2>Search Projects by Skill</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Type a skill (e.g. Python, React, ML)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>Projects</h2>

      {projects.map((p) => (
        <div key={p.id} className="project">
          <b>{p.title}</b>
          <p>{p.description}</p>
          {p.link && (
            <a href={p.link} target="_blank">
              Project Link
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;

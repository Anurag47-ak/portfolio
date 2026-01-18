# Candidate Profile Playground

A full-stack playground application that stores a candidate profile in a database, exposes it via REST APIs, and provides a minimal frontend to view the profile and search projects by skill.

Built as part of a backend-focused internship assessment.

---

## Live URLs

Frontend (Netlify): https://stately-sfogliatella-a31907.netlify.app
Backend (Render): https://profile-playground.onrender.com
Health check: https://profile-playground.onrender.com/health  

Resume: https://drive.google.com/file/d/1bTrL0hMzixCOxy1WFt8A0YoHK4m29rkZ/view?usp=sharing
---

## Tech Stack

**Frontend**
- React (Vite)
- Axios

**Backend**
- Node.js
- Express.js
- Prisma ORM

**Database**
- PostgreSQL (Neon)

**Hosting**
- Backend: Render
- Frontend: Netlify

---

## Architecture

Browser (React) -> HTTPS (REST API) -> Express Backend (Render) -> PostgreSQL Database (Neon)
- Frontend fetches profile and projects from backend APIs.
- Backend handles CRUD operations and queries using Prisma.
- Database stores profile, skills, projects, and work experience.

---

## API Endpoints

### Health
GET/health

### Profile CRUD
GET /profile
POST /profile (Basic Auth protected)
PUT /profile/:id (Basic Auth protected)

### Query Endpoints
GET /projects?page=&limit=
GET /projects?skill=Python
GET /skills/top
GET /search?q=python

## Authentication for Write Operations

Write endpoints are protected using **Basic Auth**.

Credentials (demo):
Username: admin
Password: nitdelhi


Example:
curl -u admin:nitdelhi -X PUT https://profile-playground.onrender.com/profile/1 \
  -H "Content-Type: application/json" \
  -d '{"education":"Updated education"}'

## Pagination Example
GET /projects?page=1&limit=2

## Search example
GET /search?q=python

Search is case-insensitive and matches:
-project title
-project description
-project skills

## Database Schema
Defined in : backend/prisma/schema.prisma

Main models:
-Profile
-Skill
-Project 
-Work

Prisma migrations are included in: backend/prisma/migrations

## Local Setup
### 1. Clone repository
git clone https://github.com/YOUR_USERNAME/profile-playground.git
cd profile-playground

### 2. Backend setup
cd backend
npm install

*create .env*
DATABASE_URL=your_postgres_database_url
ADMIN_USER=admin
ADMIN_PASS=nitdelhi

*Run migrations and seed:*
npx prisma migrate dev
node prisma/seed.js

*Start backend:*
node index.js

*Backend runs at:*
http://localhost:5000

### 3. Frontend setup
cd ../frontend
npm install
npm run dev

*Frontend runs at:*
http://localhost:5173

## Optional Enhancements Implemented

-Basic Authentication for write operations
-Request logging middleware
-Rate limiting (60 requests/min)
-Pagination for projects endpoint

## Known Limitations

-Single profile stored (assessment scope)
-No UI to edit profile (API-only write ops)
-No automated tests included
-Simple keyword-based search (no full-text indexing)

## Author

Srijan Kumar
B.Tech Electronics & Communication Engineering, NIT Delhi
Resume: https://drive.google.com/file/d/1bTrL0hMzixCOxy1WFt8A0YoHK4m29rkZ/view?usp=sharing


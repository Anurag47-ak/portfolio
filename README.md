# Candidate Profile Playground

A full-stack playground application that stores a candidate profile in a database, exposes it via REST APIs, and provides a minimal frontend to view the profile and search projects by skill.

Built as part of a backend-focused internship assessment.

---

## 🌐 Live URLs

| Service | URL |
| :--- | :--- |
| **Frontend (Netlify)** | [stately-sfogliatella-a31907.netlify.app](https://stately-sfogliatella-a31907.netlify.app) |
| **Backend (Render)** | [profile-playground.onrender.com](https://profile-playground.onrender.com) |
| **Health Check** | [Check Status](https://profile-playground.onrender.com/health) |
| **Resume** | [View PDF](https://drive.google.com/file/d/1bTrL0hMzixCOxy1WFt8A0YoHK4m29rkZ/view?usp=sharing) |

---

## 🛠 Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Axios |
| **Backend** | Node.js, Express.js, Prisma ORM |
| **Database** | PostgreSQL (Neon) |
| **Hosting** | Render (Backend), Netlify (Frontend) |

---

## 🏗 Architecture

**Flow:** `Browser (React)` → `HTTPS (REST API)` → `Express Backend (Render)` → `PostgreSQL Database (Neon)`

* **Frontend:** Fetches profile and projects from backend APIs.
* **Backend:** Handles CRUD operations and queries using Prisma.
* **Database:** Stores profile, skills, projects, and work experience.

---

## 🔌 API Endpoints

### Core Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check |
| `GET` | `/profile` | Fetch candidate profile |
| `POST` | `/profile` | Create profile (**Auth Required**) |
| `PUT` | `/profile/:id` | Update profile (**Auth Required**) |

### Query & Search

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/projects?page=&limit=` | Fetch projects with pagination |
| `GET` | `/projects?skill=Python` | Filter projects by skill |
| `GET` | `/skills/top` | Retrieve top skills |
| `GET` | `/search?q=python` | Search projects (Case-insensitive) |

---

## 🔐 Authentication

Write operations (`POST`, `PUT`) are protected using **Basic Auth**.

**Demo Credentials:**
* **Username:** `admin`
* **Password:** `nitdelhi`

### Example Request
```bash
curl -u admin:nitdelhi -X PUT https://profile-playground.onrender.com/profile/1 \
  -H "Content-Type: application/json" \
  -d '{"education":"Updated education"}'
# If authentication fails, API returns 401 Unauthorized.
```

---

## 🔎 Search & Pagination

**Pagination Example:**
```http
GET /projects?page=1&limit=2
```

**Search Example:**
```http
GET /search?q=python
```
*Search matches against: Project Title, Description, and Skills.*

---

## 💾 Database Schema

Defined in: `backend/prisma/schema.prisma`

**Main Models:**
* `Profile`
* `Skill`
* `Project`
* `Work`

Migrations are located in: `backend/prisma/migrations`

---

## ⚙️ Local Setup

### 1. Clone Repository
```bash
git clone [https://github.com/skksrijan/Profile-Playground.git](https://github.com/skksrijan/Profile-Playground.git)
cd profile-playground
```

### 2. Backend Setup
```bash
cd backend
npm install
```

**Create `.env` file:**
```env
DATABASE_URL=your_postgres_database_url
ADMIN_USER=admin
ADMIN_PASS=nitdelhi
```

**Run migrations and seed:**
```bash
npx prisma migrate dev
node prisma/seed.js
```

**Start backend:**
```bash
node index.js
# Backend runs at http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

---

## ✨ Optional Enhancements Implemented
* ✅ Basic Authentication for write operations
* ✅ Request logging middleware
* ✅ Rate limiting (60 requests/min)
* ✅ Pagination for projects endpoint

## ⚠️ Known Limitations
* Single profile stored (assessment scope)
* No UI to edit profile (API-only write ops)
* No automated tests included
* Simple keyword-based search (no full-text indexing)

---

## 👤 Author

**Srijan Kumar**
* B.Tech Electronics & Communication Engineering, NIT Delhi
* [View Resume](https://drive.google.com/file/d/1bTrL0hMzixCOxy1WFt8A0YoHK4m29rkZ/view?usp=sharing)

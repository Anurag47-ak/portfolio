# Portfolio Dashboard

A professional portfolio website built with React and Node.js, showcasing projects, skills, and achievements with a modern, responsive design.

## 🚀 Features

- **Professional Design**: Modern gradient UI with responsive layout
- **Interactive Search**: Search projects by technology/skills
- **Real-time Data**: Dynamic content management via REST API
- **Skill Showcase**: Visual skill tags and project categorization
- **Modern Tech Stack**: React, Node.js, Express, Prisma, SQLite

## 🛠️ Technologies Used

### Frontend
- React 19.2.0
- Vite (build tool)
- Axios (API calls)
- Modern CSS with gradients and animations

### Backend
- Node.js with Express 5.2.1
- Prisma ORM 6.19.2
- SQLite database
- CORS enabled
- Rate limiting

## 🎯 Project Structure

```
Profile-Playground/
├── backend/           # Express API server
│   ├── index.js      # Main server file
│   ├── prisma/       # Database schema and seed
│   └── package.json
├── frontend/          # React application
│   ├── src/
│   │   ├── App.jsx   # Main component
│   │   └── App.css   # Styling
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Anurag47-ak/portfolio.git
cd portfolio
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up the database
```bash
cd ../backend
npx prisma generate
npx prisma db push
node prisma/seed.js
```

5. Start the development servers

Backend (Terminal 1):
```bash
cd backend
node index.js
```

Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 📊 Featured Projects

- **Arithmetic Logic Unit (ALU) Design** - Digital circuit design with Verilog
- **RAM Design** - Memory architecture implementation
- **Digital Filter Design** - DSP filters with MATLAB  
- **Pipeline Processor Design** - Advanced computer architecture
- **Personal Portfolio** - This website itself!

## 🎨 Design Features

- Gradient backgrounds and modern color scheme
- Interactive hover effects and animations
- Professional profile cards
- Responsive grid layouts
- Search functionality with skill filters
- Loading states and error handling

## 🔧 API Endpoints

- `GET /profile` - Get profile information
- `GET /projects` - Get all projects
- `GET /search?q=skill` - Search projects by skill
- `GET /health` - Health check

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 👨‍💻 About

This portfolio showcases the work of **Anurag Kumar**, a B.Tech student in Electronics & Communication Engineering at NIT Delhi, specializing in digital design, computer architecture, and web development.

## 📧 Contact

- **Email**: 231220014@nitdelhi.ac.in
- **GitHub**: [Anurag47-ak](https://github.com/Anurag47-ak)
- **LinkedIn**: [Anurag Kumar](https://www.linkedin.com/in/anurag-kumar-307204260/)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ Don't forget to give this repo a star if you found it helpful!

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

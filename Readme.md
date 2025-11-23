# School Management System REST API

A full-stack RESTful API application for managing school data including students, teachers, classes, schedules, and grades. Built with Node.js, Express, and MySQL, containerized with Docker for easy deployment.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication & Authorization](#authentication--authorization)
- [Usage Examples](#usage-examples)
- [Docker Deployment](#docker-deployment)
- [Contributing](#contributing)

## ✨ Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (Admin/User)
- **Complete CRUD Operations** for:
  - 👨‍🎓 Students (Murid)
  - 👨‍🏫 Teachers (Guru)
  - 🏫 Classes (Kelas)
  - 📅 Schedules (Jadwal Pelajaran)
  - 📊 Grades (Nilai)
- **Dashboard Statistics**: Get overview of total students, teachers, classes, and average grades
- **Role-Based Access**: Regular users can view data, only admins can create/update/delete
- **Docker Support**: Fully containerized application with docker-compose
- **RESTful Architecture**: Follows REST API best practices with MVC pattern

## 🛠 Tech Stack

**Backend:**

- Node.js
- Express.js
- MySQL 8.0
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- CORS

**Frontend:**

- HTML5
- CSS3
- Bootstrap 5.3.3
- JavaScript (Vanilla)
- Bootstrap Icons

**DevOps:**

- Docker & Docker Compose
- MySQL Container with persistent volumes

## 📁 Project Structure

```
code/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection config
│   ├── controllers/
│   │   ├── authController.js    # Login & Register
│   │   ├── dashboardController.js
│   │   ├── guruController.js
│   │   ├── jadwalController.js
│   │   ├── kelasController.js
│   │   ├── muridController.js
│   │   └── nilaiController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── roleMiddleware.js    # Role-based access
│   ├── models/
│   │   ├── guruModel.js
│   │   ├── jadwalModel.js
│   │   ├── kelasModel.js
│   │   ├── muridModel.js
│   │   ├── nilaiModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── apiRoutes.js         # Protected API routes
│   │   └── authRoutes.js        # Auth routes
│   ├── Dockerfile
│   ├── index.js                 # Main entry point
│   └── package.json
├── database/
│   └── init.sql                 # Database initialization script
├── frontend/
│   └── user/
│       ├── beranda.html         # Homepage
│       ├── kelas.html           # Classes page
│       ├── jadwal.html          # Schedule page
│       ├── profilguru.html      # Teachers profile page
│       ├── profilsiswa.html     # Students profile page
│       ├── style-jadwal.css     # Schedule page styles
│       └── logo.png             # School logo
├── docker-compose.yml
└── Readme.md
```

## 📦 Prerequisites

Before running this project, make sure you have:

- [Docker](https://www.docker.com/get-started) (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29+)
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/haikal23095/Rest-Full-API-Sister.git
cd Rest-Full-API-Sister/code
```

### 2. Start with Docker Compose

```bash
docker-compose up -d
```

This will:

- Create and start MySQL database container (Node 3)
- Create and start Backend API container (Node 2)
- Initialize database with tables and sample data
- Expose Backend API on port **4000**
- Expose MySQL on port **3307**

### 3. Verify Installation

Check if containers are running:

```bash
docker ps
```

You should see:

- `node3_database` (MySQL)
- `node2_backend` (Backend API)

### 4. Test the API

```bash
curl http://localhost:4000
```

Expected response: `Backend Server Sister-Project (MVC Version) Running!`

## 🔐 Environment Variables

The following environment variables are configured in `docker-compose.yml`:

**Database (Node 3):**

- `MYSQL_ROOT_PASSWORD`: rootpassword123
- `MYSQL_DATABASE`: sekolah_db
- `MYSQL_USER`: user_aplikasi
- `MYSQL_PASSWORD`: userpassword123

**Backend (Node 2):**

- `DB_HOST`: database_node
- `DB_USER`: user_aplikasi
- `DB_PASSWORD`: userpassword123
- `DB_NAME`: sekolah_db
- `JWT_SECRET`: rahasia_super_aman_sister_project_2024

> **⚠️ Security Note**: Change these default credentials before deploying to production!

## 📡 API Endpoints

### Authentication (Public)

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/auth/register` | Register new user       |
| POST   | `/auth/login`    | Login and get JWT token |

### Protected Routes (Require Authentication)

#### Dashboard

| Method | Endpoint               | Description              | Access      |
| ------ | ---------------------- | ------------------------ | ----------- |
| GET    | `/api/dashboard-stats` | Get dashboard statistics | User, Admin |

#### Jadwal Pelajaran (Schedules)

| Method | Endpoint          | Description         | Access      |
| ------ | ----------------- | ------------------- | ----------- |
| GET    | `/api/jadwal`     | Get all schedules   | User, Admin |
| GET    | `/api/jadwal/:id` | Get schedule by ID  | User, Admin |
| POST   | `/api/jadwal`     | Create new schedule | Admin only  |
| PUT    | `/api/jadwal/:id` | Update schedule     | Admin only  |
| DELETE | `/api/jadwal/:id` | Delete schedule     | Admin only  |

#### Kelas (Classes)

| Method | Endpoint         | Description      | Access      |
| ------ | ---------------- | ---------------- | ----------- |
| GET    | `/api/kelas`     | Get all classes  | User, Admin |
| GET    | `/api/kelas/:id` | Get class by ID  | User, Admin |
| POST   | `/api/kelas`     | Create new class | Admin only  |
| PUT    | `/api/kelas/:id` | Update class     | Admin only  |
| DELETE | `/api/kelas/:id` | Delete class     | Admin only  |

#### Guru (Teachers)

| Method | Endpoint        | Description        | Access      |
| ------ | --------------- | ------------------ | ----------- |
| GET    | `/api/guru`     | Get all teachers   | User, Admin |
| GET    | `/api/guru/:id` | Get teacher by ID  | User, Admin |
| POST   | `/api/guru`     | Create new teacher | Admin only  |
| PUT    | `/api/guru/:id` | Update teacher     | Admin only  |
| DELETE | `/api/guru/:id` | Delete teacher     | Admin only  |

#### Murid (Students)

| Method | Endpoint         | Description        | Access      |
| ------ | ---------------- | ------------------ | ----------- |
| GET    | `/api/murid`     | Get all students   | User, Admin |
| GET    | `/api/murid/:id` | Get student by ID  | User, Admin |
| POST   | `/api/murid`     | Create new student | Admin only  |
| PUT    | `/api/murid/:id` | Update student     | Admin only  |
| DELETE | `/api/murid/:id` | Delete student     | Admin only  |

#### Nilai (Grades)

| Method | Endpoint         | Description      | Access      |
| ------ | ---------------- | ---------------- | ----------- |
| GET    | `/api/nilai`     | Get all grades   | User, Admin |
| GET    | `/api/nilai/:id` | Get grade by ID  | User, Admin |
| POST   | `/api/nilai`     | Create new grade | Admin only  |
| PUT    | `/api/nilai/:id` | Update grade     | Admin only  |
| DELETE | `/api/nilai/:id` | Delete grade     | Admin only  |

## 🗄 Database Schema

The database consists of 6 main tables with the following relationships:

### Tables:

1. **users** - Authentication and user management

   - `user_id` (PK)
   - `username`, `password`, `role`

2. **kelas** - Classes information

   - `kelas_id` (PK)
   - `nama_kelas`, `grade_level`

3. **guru** - Teachers information

   - `guru_id` (PK)
   - `nama_guru`, `nip`, `subject`, `kelas_id` (FK)

4. **murid** - Students information

   - `murid_id` (PK)
   - `nama_murid`, `nis`, `alamat`, `kelas_id` (FK)

5. **jadwal_pelajaran** - Class schedules

   - `pelajaran_id` (PK)
   - `hari`, `waktu`, `kelas_id` (FK), `guru_id` (FK)

6. **nilai** - Student grades
   - `nilai_id` (PK)
   - `murid_id` (FK), `subject`, `nilai`, `guru_id` (FK)

### Relationships:

- A class can have many students (1:N)
- A class can have many schedules (1:N)
- A teacher can have one homeroom class (1:1)
- A teacher can teach many schedules (1:N)
- A student can have many grades (1:N)
- A teacher can grade many students (1:N)

## 🔒 Authentication & Authorization

### Authentication Flow

1. **Register**: Create a new user account

   ```json
   POST /auth/register
   {
     "username": "john_doe",
     "password": "securepassword",
     "role": "user"
   }
   ```

2. **Login**: Get JWT token

   ```json
   POST /auth/login
   {
     "username": "john_doe",
     "password": "securepassword"
   }
   ```

3. **Use Token**: Include token in Authorization header
   ```
   Authorization: Bearer <your_jwt_token>
   ```

### User Roles

- **user**: Can view all data (GET requests)
- **admin**: Full access (GET, POST, PUT, DELETE)

## 💡 Usage Examples

### 1. Register a New User

```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "role": "admin"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

Response:

```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Get Dashboard Stats (Protected)

```bash
curl http://localhost:4000/api/dashboard-stats \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Create New Student (Admin Only)

```bash
curl -X POST http://localhost:4000/api/murid \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_murid": "Budi Santoso",
    "nis": "2024001",
    "alamat": "Jl. Merdeka No. 123",
    "kelas_id": 1
  }'
```

### 5. Get All Teachers

```bash
curl http://localhost:4000/api/guru \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🐳 Docker Deployment

### Starting the Application

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend_node
```

### Stopping the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes database data)
docker-compose down -v
```

### Rebuilding After Changes

```bash
# Rebuild backend after code changes
docker-compose up -d --build backend_node

# Rebuild all services
docker-compose up -d --build
```

### Accessing MySQL Database

```bash
# Connect to MySQL container
docker exec -it node3_database mysql -u user_aplikasi -p

# Or from host machine
mysql -h 127.0.0.1 -P 3307 -u user_aplikasi -p
```

## 🔧 Development

### Running Without Docker

1. Install dependencies:

```bash
cd backend
npm install
```

2. Set up environment variables or modify `config/database.js`

3. Start the server:

```bash
npm start
```

Server will run on port 3000.

## 📝 API Response Format

### Success Response

```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error Response

```json
{
  "message": "Error message"
}
```

## 🎨 Frontend Pages

The project includes a complete frontend interface for users to interact with the system:

### Available Pages

1. **Beranda (Homepage)** - `beranda.html`

   - School information and introduction
   - Navigation to all sections

2. **Profil Guru (Teachers Profile)** - `profilguru.html`

   - List of all teachers
   - Teacher details with search functionality
   - Display: Name, NIS, Gender, Birth date, Year joined

3. **Profil Siswa (Students Profile)** - `profilsiswa.html`

   - List of all students
   - Student details with search functionality
   - Display: Name, NIS, Gender, Birth date, Year joined

4. **Kelas (Classes)** - `kelas.html`

   - Class information by grade and major
   - Homeroom teacher (Wali Kelas) details
   - Filter by class and major/subject

5. **Jadwal (Schedule)** - `jadwal.html`
   - Weekly class schedule
   - Filter by class
   - Shows subjects for each day (Monday-Friday)

### Frontend Features

- **Responsive Design**: Built with Bootstrap 5.3.3 for mobile-friendly layouts
- **Consistent Navigation**: All pages share the same header and menu bar
- **Interactive Dropdowns**: Profile menu with Guru and Siswa options
- **Search Functionality**: Search and filter features on relevant pages
- **Clean UI**: Professional design with school branding (logo and colors)

### Accessing the Frontend

To view the frontend, simply open any HTML file in a web browser:

```bash
# Navigate to frontend directory
cd frontend/user

# Open in default browser (Windows)
start beranda.html

# Or open directly in your browser
```

> **Note**: The frontend currently uses static data. To connect with the backend API, JavaScript fetch calls need to be implemented to retrieve data from the endpoints listed in the API Endpoints section.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of a Sister Project.

## 👥 Authors

- **Haikal** - [haikal23095](https://github.com/haikal23095)

## 📞 Support

If you have any questions or issues, please open an issue in the GitHub repository.

---

**Built with ❤️ for Sister Project - School Management System**

# Dockerized Full-Stack Bookstore Application

A standard, modern full-stack web application for browsing books, filtering by genre, searching titles, and managing a stateful shopping cart.

## 🚀 Tech Stack

- **Backend:** Spring Boot (Java 17), Spring Data JPA, REST Controllers, Gradle.
- **Frontend:** Angular 17 (Standalone Components), Tailwind CSS, RxJS.
- **Database:** MySQL 8.0 with volume persistence (`mysql_data`).
- **Containerization:** Multi-stage Dockerfiles for frontend and backend orchestrated with Docker Compose.

---

## 📁 Repository Architecture

```text
.
├── docker-compose.yml          # Multi-container service configuration
├── init.sql                    # Initial MySQL database seed script
├── backend/                    # Spring Boot REST API Service
│   ├── Dockerfile              # Multi-stage Docker build (Gradle -> Eclipse Temurin JRE)
│   ├── build.gradle.kts
│   └── src/                    # Spring Boot application source code
└── frontend/                   # Angular Standalone Single Page Application
    ├── Dockerfile              # Multi-stage Docker build (Node -> Nginx)
    ├── nginx.conf              # Nginx server configuration with API reverse proxy
    └── src/                    # Angular source code & components
```

---

## ⚡ Quick Start

Run the full application stack with a single command:

```bash
docker compose up --build -d
```

### Accessing Services

- **Angular Frontend:** [http://localhost](http://localhost)
- **Spring Boot API Health Check:** [http://localhost:8080/api/health](http://localhost:8080/api/health)
- **Spring Boot Books API:** [http://localhost:8080/api/books](http://localhost:8080/api/books)
- **MySQL Database:** `localhost:3306`
  - **Database:** `bookstore_db`
  - **User:** `root`
  - **Password:** `rootpassword`

---

## 🎯 Key Features

1. **Catalog Browsing:**
   - Real-time search by title or author.
   - Genre filter pills dynamically populated from database genres.
2. **Stateful Shopping Cart:**
   - Add/remove items and update quantities locally.
   - Live badge notification counter on header.
   - Interactive slide-over drawer showing item totals and free shipping calculation.
   - Simulated checkout experience.
3. **Container Health Checking:**
   - Spring Boot container automatically waits for MySQL connection readiness before booting.

---

## 🛑 Stopping Application

To stop and remove running containers:

```bash
docker compose down
```

To stop containers and reset database volume data:

```bash
docker compose down -v
```

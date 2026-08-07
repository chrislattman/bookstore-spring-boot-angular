# Project Rules & Context: Dockerized Bookstore

## Tech Stack Requirements
*   **Backend:** Spring Boot (Java 17+), Maven, MySQL 8.0 (Containerized).
*   **Frontend:** Angular (Latest stable standalone components), Tailwind CSS.
*   **Infrastructure:** Docker, Multi-stage Dockerfiles, Docker Compose.

## Core App Features
1.  **Catalog System:** REST endpoints matching a `books` schema inside MySQL. Allows fetching all books, searching by title, and filtering by genre.
2.  **Cart Management:** Stateful Angular shopping cart handling add, remove, and quantity updates locally before checkout simulation.

## Docker & Containerization Rules
*   **Database:** Use the official `mysql:8.0` image. Persist data using a named volume (`mysql_data`) so books aren't wiped on restart.
*   **Spring Boot Dockerfile:** Use a multi-stage build (Stage 1: Maven build, Stage 2: `eclipse-temurin` runtime to keep the image slim).
*   **Angular Dockerfile:** Use a multi-stage build (Stage 1: Node to build production files, Stage 2: `nginx` to serve the static assets).
*   **Docker Compose:** Create a `docker-compose.yml` in the root mapping all three services. Configure Spring Boot to use a `depends_on` healthcheck condition on MySQL so it waits until the database is fully accepting connections before starting.

## Configuration Rules
*   Spring Boot must read database credentials from standard environment variables (`SPRING_DATASOURCE_URL`, etc.) passed down by Docker Compose.

## Definition of Done Checklist
*   [ ] Multi-stage Dockerfiles exist for both frontend and backend.
*   [ ] `docker-compose.yml` successfully coordinates `mysql`, `backend`, and `frontend`.
*   [ ] App boots and connects cleanly via a single `docker compose up --build` command.

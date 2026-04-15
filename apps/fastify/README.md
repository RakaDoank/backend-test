# Fastify Backend App

This is the main backend service of the monorepo, built with **Fastify**, **PostgreSQL**, and **Drizzle ORM**.

It provides a simple CRUD implementation and serves as a practical template for building scalable backend applications.

---

## 🚀 Getting Started

### 1. Install Dependencies

From the root of the monorepo:

```bash
pnpm install
```

---

### 2. Environment Setup

Create a `.env` file in this directory:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=backend_db
DATABASE_USER=backend
DATABASE_PASSWORD=password

FASTIFY_PORT=4000
```

You can also see the environment variables template in the `.env.example`.

---

### 3. Setup Database

This project uses **Drizzle ORM** for schema management.

Run:

```bash
npm run database:push
```

This command will:

* Create tables
* Apply schema changes to your PostgreSQL database

---

### 4. Run Development Server

```bash
npm run dev
```

* Uses **tsx** (TypeScript execution runtime, not React JSX)
* Intended for local development

Server will run at:

👉 http://localhost:4000

---

## 📖 API Documentation

This Fastify app also serves an interactive API documentation powered by Scalar API Reference.

Once the server is running, open:

👉 http://localhost:4000

This makes it easy to explore and test the API directly from your browser.

### Generate OpenAPI Specification File

If you wish to get the OpenAPI file, you can generate OpenAPI Specification file in this directory

Run
```
npm run generate-openapi
```

It will creates `openapi.json` file in this directory after (same level tree as this README.md).

Or, run
```
npm run generate-openapi:yaml
```

to get the YAML version.

## 🏗️ Build for Production

The Fastify app is written in TypeScript, so it needs to be compiled before running in production.

### Build

```bash
npm run build
```

### Start

```bash
npm run start
```

* Runs compiled JavaScript output
* Suitable for production environments

---

## Tests

I provide two test suites for this app. Check at the `./src/__tests__` directory.

To run the test suites, [build](#build) the app first, and execute
```
npm run test
```

---

## 🧱 Tech Stack

* Fastify
* PostgreSQL
* Drizzle ORM
* TypeScript

---

## 📦 Project Structure (Simplified)

```
.
├── src/
│   ├── routes/
│   ├── database/
│   └── modules/
```

---

## 📌 Notes

* Ensure PostgreSQL is running before starting the app
* Always run `database:push` before using the API for the first time
* `dev` mode is for development only — use `build` + `start` for production

---

## 🤝 Extending This Project

You can extend this backend by:

* Adding authentication (JWT, OAuth, etc.)
* Creating additional modules/services
* Integrating third-party APIs
* Adding testing (unit/integration)

---

## 📄 License

MIT

# backend-test

A simple **PNPM monorepo** showcasing a backend architecture using **Fastify**, **PostgreSQL**, **Drizzle ORM**, and **Scalar API Reference**.

This repository is intended as a learning template and starting point for building scalable backend applications with a clean modular structure.

---

## 📦 Monorepo Structure

This project uses a monorepo structure managed with **PNPM workspaces**.

```
.
├── apps/
│   ├── fastify/           # Main backend application
│   └── scalar-api-docs/   # API documentation frontend (Next.js)
├── modules/
│   └── model-type/        # Shared TypeScript types
```

### Apps

#### `apps/fastify`

* Main backend service
* Built with **Fastify**
* Uses **PostgreSQL** + **Drizzle ORM**
* Provides a simple CRUD example
* Displays API documentation using **Scalar API Reference**

#### `apps/scalar-api-docs`

* Next.js app
* Displays API documentation using **Scalar API Reference** by using the `Fastify` generated OpenAPI schema
* Demonstrates monorepo integration

### Modules

#### `modules/model-type`

* Shared TypeScript definitions
* Used across apps to keep types consistent

---

## 🚀 Getting Started

### Prerequisites

* Node.js (>= 24)
* PNPM (>= 10.30)
* PostgreSQL database (local or remote)

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

---

### 2. Setup Fastify Backend

Navigate to the Fastify app:

```bash
cd apps/fastify
```

#### Create `.env`

Provide your PostgreSQL connection details:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
```

#### Push Database Schema

This project uses **Drizzle ORM**. Run:

```bash
npm run database:push
```

This will:

* Create tables
* Apply schema changes

#### Run Fastify Server

```bash
npm run dev
```

Server will be available at:

👉 [http://localhost:4000](http://localhost:4000)

---

Open in browser:

👉 [http://localhost:4000](http://localhost:4000)

### 3. Run API Docs (Next.js)

Make sure Fastify is running first.

Then:

```bash
cd apps/scalar-api-docs
npm run dev
```

Open in browser:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🧩 Features

* Monorepo architecture with PNPM
* Fastify backend with clean structure
* PostgreSQL integration using Drizzle ORM
* Shared TypeScript models
* API documentation via Scalar

---

## Tests

I provide an main test in the GitHub Actions as a template to run TypeScript & ESLint check, run the `@apps/fastify` test suite, and run the `@apps/scalar-api-docs` test build, but the workflow will be failed at the `test-fastify` stage, because no connections to the Postgres database at all.

To run those tests locally on your local machine, do this instead
1. Make sure this project directory has been installed with `pnpm install`
2. Run the TypeScript & ESLint check with `npm run code-check` in the project directory
3. To run the Fastify test, go the `/apps/fastify` directory, and run `npm run test`
4. To test the `@apps/scalar-api-docs` build, go the `/apps/scalar-api-docs` directory, and run `npm run build`

## 🧪 Code Quality & Linting

### TypeScript & ESLint Check

You can validate the entire monorepo by running:

```bash
npm run code-check
```

This command ensures:

* No TypeScript errors
* No ESLint errors
* No ESLint warnings

This is especially useful for CI/CD pipelines (e.g. GitHub Actions) to maintain code quality on every push or pull request.

---

### ESLint Setup

This project uses a **single root ESLint configuration**.

* All apps and modules are linted from the root
* Each package still respects its own rules and structure
* Improves performance by avoiding duplicated ESLint setups

Please follow the established **code style guidelines** when contributing.

---

## 📚 Purpose

This repository is designed to:

* Serve as a **starter template** for Fastify projects
* Demonstrate **monorepo best practices**
* Showcase integration between backend and documentation UI

---

## 🤝 Contributing

Feel free to fork this repository and adapt it to your needs.

If you find improvements or issues, contributions are welcome.

---

## 📄 License

MIT License

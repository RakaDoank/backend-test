# Fastify System Design

This document describes the system design of the Fastify application using **Mermaid diagrams**.

---

## 🧭 Entry Point Overview

The main entry of the application is located at:

```
/apps/fastify/src/App.ts
```

This file is responsible for:
- Initializing Fastify
- Registering plugins
- Registering routes
- Starting the server

---

## ⚙️ Application Initialization Flow

```mermaid
flowchart TD
    A[Start App.ts] --> B[Load Environment Variables]
    B --> C[Enable CORS]
    C --> D[Connect to PostgreSQL]
    D --> E[Setup Swagger/OpenAPI]
    E --> F[Register Routes]
    F --> G[Set Global Error Handler]
    G --> H[Serve Scalar API Docs Homepage]
    H --> I[Expose OpenAPI JSON Endpoint]
    I --> J[Server Ready]
```

---

## 🔌 Plugin Registration Order

The order of plugin registration is important in Fastify.

```mermaid
sequenceDiagram
    participant App
    participant Env
    participant CORS
    participant Postgres
    participant Swagger
    participant Routes
    participant ErrorHandler

    App->>Env: Register @fastify/env
    App->>CORS: Register @fastify/cors
    App->>Postgres: Register @fastify/postgres
    App->>Swagger: Register @fastify/swagger
    App->>Routes: Register /api/news & /api/topic
    App->>ErrorHandler: setErrorHandler()
```

---

## 🌐 Routing Structure

```mermaid
flowchart LR
    Client -->|HTTP Request| Server

    Server --> News["/api/news"]
    Server --> Topic["/api/topic"]
    Server --> Docs["/ (Scalar API Docs)"]
    Server --> OpenAPI["/.well-known/openapi.json"]

    News --> DB[(PostgreSQL)]
    Topic --> DB
```

---

## 🗄️ Database Interaction

```mermaid
flowchart TD
    A[API Request] --> B[Route Handler]
    B --> C[Drizzle ORM]
    C --> D[(PostgreSQL)]
    D --> C
    C --> B
    B --> E[HTTP Response]
```

---

## 📖 API Documentation Flow

```mermaid
flowchart TD
    A[Fastify Server] --> B[Swagger Plugin]
    B --> C[Generate OpenAPI JSON]
    C --> D["/.well-known/openapi.json"]

    E[Scalar API Docs UI] -->|Fetch| D
    D --> E
```

---

## 🧱 Error Handling Flow

```mermaid
flowchart TD
    A[Request] --> B[Route Handler]
    B -->|Error Occurs| C[Global Error Handler]
    C --> D[Standardized JSON Response]
```

---

## 🧩 Key Notes

- All plugins are registered before the server starts listening
- OpenAPI JSON is exposed for external consumers (e.g. API docs app)
- Scalar API docs are served directly from the Fastify root (`/`)
- Database access is handled via Drizzle ORM
- Global error handler ensures consistent API responses

---

## 🔗 External Integration

```mermaid
flowchart LR
    Fastify -->|Provides OpenAPI| ScalarDocsApp
    ScalarDocsApp -->|Fetch| OpenAPIEndpoint["/.well-known/openapi.json"]
```

- `/apps/scalar-api-docs` consumes the OpenAPI spec from Fastify
- Default URL: http://localhost:4000/.well-known/openapi.json

---

## 🧱 C4 Model (High-Level Architecture)

### Level 1: System Context

```mermaid
C4Context
    title System Context Diagram

    Person(user, "User", "Developer or API consumer")
    System(fastify, "Fastify Backend", "API + OpenAPI + Scalar Docs")
    System_Ext(scalarDocs, "Scalar Docs App", "Next.js frontend")
    System_Ext(postgres, "PostgreSQL", "Database")

    Rel(user, fastify, "Makes API requests")
    Rel(fastify, postgres, "Reads/Writes data")
    Rel(scalarDocs, fastify, "Fetches OpenAPI JSON")
```

---

### Level 2: Container Diagram

```mermaid
C4Container
    title Container Diagram

    Person(user, "User")

    System_Boundary(fastify_system, "Fastify System") {
        Container(api, "Fastify App", "Node.js + Fastify", "Handles API, plugins, routes")
        ContainerDb(db, "PostgreSQL", "Database", "Stores news & topics")
    }

    System_Ext(scalarDocs, "Scalar Docs App", "Next.js")

    Rel(user, api, "HTTP Requests")
    Rel(api, db, "SQL via Drizzle ORM")
    Rel(scalarDocs, api, "Fetch /.well-known/openapi.json")
```

---

### Level 3: Component Diagram (Fastify App)

```mermaid
C4Component
    title Fastify Internal Components

    Container(api, "Fastify App", "Node.js")
        Component(env, "Env Plugin", "@fastify/env", "Loads environment variables")
        Component(cors, "CORS Plugin", "@fastify/cors", "Handles cross-origin requests")
        Component(db, "Postgres Plugin", "@fastify/postgres", "Database connection")
        Component(swagger, "Swagger Plugin", "@fastify/swagger", "Generates OpenAPI spec")
        Component(routes, "Routes", "Fastify Routes", "/api/news & /api/topic")
        Component(error, "Error Handler", "Fastify", "Standardizes error responses")
        Component(docs, "Scalar Docs", "UI", "Serves API documentation UI")

    Rel(env, cors, "Init order")
    Rel(cors, db, "Init order")
    Rel(db, swagger, "Init order")
    Rel(swagger, routes, "Init order")
    Rel(routes, error, "Uses")
    Rel(swagger, docs, "Provides OpenAPI JSON")
```

---

## ✅ Summary

The Fastify app acts as:
- Backend API server
- OpenAPI provider
- API documentation server (Scalar UI)

All responsibilities are centralized but cleanly separated via plugins and routes.


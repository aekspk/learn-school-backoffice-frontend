# Learn School Backoffice — Frontend

A school back-office management system built with React 19, TypeScript, Vite, and Tailwind CSS v4.

---

## Prerequisites

| Tool | Recommended Version |
|------|-------------------|
| Node.js | >= 18.x |
| npm | >= 9.x |

Verify your versions:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd learn-school-backoffice-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the project root:

```bash
cp .env.example .env
```

Or create one manually:

```env
VITE_API_URL=http://localhost:9191
```

> `VITE_API_URL` is the base URL of the backend API. Defaults to `http://localhost:9191` if not set.

---

## Available Scripts

### Start development server

```bash
npm run dev
```

Starts Vite with Hot Module Replacement (HMR). Open `http://localhost:5173` in your browser.

### Build for production

```bash
npm run build
```

Runs TypeScript type checking (`tsc -b`) then bundles the app into `dist/`.

### Preview production build

```bash
npm run preview
```

Serves the `dist/` folder locally. Run `npm run build` first.

### Lint

```bash
npm run lint
```

Runs ESLint static analysis across the codebase.

---

## Project Structure

```
src/
├── assets/                  # Static assets (images, etc.)
├── components/
│   ├── layout/              # AppShell, Sidebar, Navbar
│   ├── shared/              # Shared components (e.g. DeleteConfirmDialog)
│   └── ui/                  # shadcn/ui components
├── features/                # Domain feature modules
│   ├── auth/                # Login
│   ├── students/            # Student management
│   ├── class-management/    # Class session management
│   ├── compensations/       # Compensation management
│   ├── bookings/
│   ├── branches/
│   ├── courses/
│   └── credit-packages/
├── lib/
│   ├── api/api.ts           # Axios instance with request/response interceptors
│   └── utils.ts             # cn() utility helper
├── providers/               # React Query provider
├── router/                  # React Router configuration
├── services/api/            # Raw Axios API functions per domain
└── types/api.ts             # Shared TypeScript interfaces and enums
```

---

## Pages & Routes

| Path | Page |
|------|------|
| `/login` | Login |
| `/student-management` | Student list |
| `/student-management/:id` | Student detail |
| `/class-management` | Class session list |
| `/class-management/:id` | Class session detail |
| `/compensations` | Compensations |

> Other routes (bookings, credit-packages, branches, courses) are under development.

---

## Authentication

- On login, `accessToken` is stored in `localStorage`.
- Every request automatically attaches `Authorization: Bearer <token>`.
- On a 401 response, the client queues pending requests, calls `POST /auth/refresh-token`, then retries them.
- If refresh fails, storage is cleared and the user is redirected to `/login`.
- All authenticated routes are wrapped in `ProtectedRoute`.

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | v4 | Styling |
| shadcn/ui | — | UI component library |
| TanStack React Query | v5 | Server state management |
| React Router | v7 | Client-side routing |
| React Hook Form | v7 | Form state management |
| Zod | v4 | Schema validation |
| Axios | — | HTTP client |
| Lucide React | — | Icons |
| Sonner | — | Toast notifications |

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev        # Start Vite dev server

# Build
npm run build      # TypeScript check (tsc -b) then Vite build

# Lint
npm run lint       # ESLint static analysis

# Preview
npm run preview    # Preview production build
```

No test suite is configured.

## Environment

Copy `.env` or set `VITE_API_URL` to the backend base URL (default: `http://localhost:9191`).

## Architecture

This is a school backoffice SPA built with React 19, TypeScript 6, Vite 8, Tailwind CSS v4, and shadcn/ui components.

### Feature Module Pattern

Every domain follows this four-layer structure under `src/`:

```
services/api/<domain>/      ← raw Axios API functions
features/<domain>/
  hooks/api.ts              ← React Query useQuery / useMutation wrappers
  schema.ts                 ← Zod validation schemas
  <Domain>Page.tsx          ← page-level container (imports only; no inline components)
  <Domain>DetailPage.tsx    ← detail page if the domain has one
  components/               ← one file per component; no components defined inline in page files
```

**Component file rule:** Every named component must live in its own file under `components/`. Page files (`*Page.tsx`) are containers only — they import and compose components but never define them inline. If a component is needed, create a new file for it first, then import it.

**Props interface rule:** Every component that accepts props must declare a named `interface <ComponentName>Props` above the function. Inline type annotation (`{ prop: type }`) on the function parameter is not allowed. All components that render a dialog or modal must include a `className?: string` prop passed to the outermost content element.

Domains: `auth`, `bookings`, `students`, `courses`, `class-sessions`, `credit-packages`, `compensations`, `branches`.

### Routing & Auth

- Router configured in `src/router/index.tsx` using React Router v7 (browser router).
- `ProtectedRoute` checks `localStorage.accessToken`; redirects to `/login` on missing token.
- All authenticated routes render inside `AppShell` (`src/components/layout/AppShell.tsx`).

### HTTP Client & Token Refresh

`src/lib/api/api.ts` exports a single Axios instance:

- Request interceptor attaches `Authorization: Bearer <accessToken>` from localStorage.
- Response interceptor catches 401s, queues concurrent requests, calls `POST /auth/refresh-token`, retries originals, or clears storage and redirects to `/login` on failure.

### Server State

TanStack React Query v5 (`src/providers/QueryProvider.tsx`):

- Global defaults: `staleTime: 30_000`, `retry: 1`.
- Query key factories live in each domain's `hooks/api.ts` (e.g., `bookingKeys`).
- Mutations call `queryClient.invalidateQueries` on success to keep lists fresh.

### Forms

React Hook Form v7 + Zod v4 via `@hookform/resolvers/zod`. Schemas are in `features/<domain>/schema.ts`. Form state is local to dialog components; no global form state.

### Styling & Components

- Tailwind CSS v4 (utility classes in JSX; global theme in `src/index.css`).
- shadcn/ui components live in `src/components/ui/` — these are copied source files, not package imports.
- `cn()` helper (`src/lib/utils.ts`) merges `clsx` + `tailwind-merge`.
- Shared non-UI components (e.g., `DeleteConfirmDialog`) live in `src/components/shared/`.

### Central Types

`src/types/api.ts` holds all entity interfaces (`User`, `Student`, `Booking`, `CreditPackage`, etc.) and string-union enums (`BookingStatus`, `CompensationType`, …). Import types from here; do not redefine them in feature files.

### Path Alias

`@` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

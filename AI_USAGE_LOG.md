# AI Usage Log — Learn School Backoffice Frontend

---

## Entry 1 — Project Planning & Phase 1 Setup

- **What I asked:** Build the entire frontend application from scratch for the Learn School Backoffice system. Strict tech stack: React (Vite) + TypeScript, Tailwind CSS, shadcn/ui only for components, react-hook-form + zod for forms, @tanstack/react-query v5 for data fetching, axios for the API client, and react-router-dom for routing. The UI should be brutally minimal — functionality and state management are the priorities. Follow a phased execution plan: Phase 1 is project setup only. Acknowledge the plan, summarize the backend domains, and give me the exact commands and folder structure.

- **What AI produced:**
  Backend domain summary across 7 resources: Auth, Branches, Courses, Students, Credit Packages, Class Sessions, Bookings, and Compensations — with key endpoints, role restrictions, and business rules noted per domain.

  Phase 1 commands:
  1. `npm create vite@latest` with `--template react-ts`
  2. Full dependency install — `react-router-dom`, `@tanstack/react-query`, `axios`, `react-hook-form`, `@hookform/resolvers`, `zod`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`
  3. Dev dependencies — `tailwindcss`, `@tailwindcss/vite`, `@types/node`
  4. `vite.config.ts` updated with Tailwind v4 Vite plugin and `@` path alias
  5. `src/index.css` replaced with `@import "tailwindcss"`
  6. `tsconfig.app.json` updated with `baseUrl` and `paths` for `@/*`
  7. `npx shadcn@latest init` with Default style, Slate base color, CSS variables enabled

  Proposed folder structure separating `services/api/`, `features/`, `components/`, `providers/`, `router/`, and `types/`.

- **What I changed or rejected — and why:** Accepted as-is. This established the full architectural skeleton before any code was written.

---

## Entry 2 — Code Organization Pattern

- **What I asked:** For each feature that fetches from the API, keep TanStack Query hooks in `features/{domain}/hooks/api.ts` and raw fetch functions in a `services/api/{domain}/{domain}.service.ts` folder. Showed an exact example of both files from another project.

- **What AI produced:**
  Confirmed the two-layer pattern and applied it throughout all subsequent phases:
  - `services/api/{domain}/{domain}.service.ts` — plain async functions using the axios instance, returning typed data directly
  - `features/{domain}/hooks/api.ts` — `useQuery` / `useMutation` wrappers that import from the service layer, with `queryKey` factories and `invalidateQueries` on every mutation success

- **What I changed or rejected — and why:** This was a deliberate architectural constraint I imposed before Phase 2 began. The separation keeps query logic out of service functions and keeps service functions free of React dependencies — making both independently testable.

---

## Entry 3 — Phase 2: Core Auth Setup

- **What I asked:** Phase 2 done — proceed.

- **What AI produced:**
  Six files forming the auth and infrastructure layer:

  1. **`src/lib/api/api.ts`** — Axios instance with base URL from `VITE_API_URL`. Request interceptor attaches `accessToken` from localStorage as Bearer. Response interceptor catches 401s: queues concurrent failed requests, exchanges `refreshToken` via `POST /auth/refresh-token`, retries all queued requests with the new token, and redirects to `/login` on refresh failure.
  2. **`src/services/api/auth/auth.service.ts`** — `loginApi`, `getProfileApi`, `logoutApi`
  3. **`src/features/auth/hooks/api.ts`** — `useLogin`, `useGetProfile`, `useLogout`
  4. **`src/features/auth/schema.ts`** — Zod schema for login form (email + min-8 password)
  5. **`src/features/auth/LoginPage.tsx`** — shadcn Card + Form + react-hook-form. On success stores both tokens to localStorage and navigates to `/`
  6. **`src/providers/QueryProvider.tsx`** — `QueryClient` with `staleTime: 30_000` and `retry: 1`
  7. **`src/router/index.tsx`** — `ProtectedRoute` reads `accessToken` from localStorage; unauthenticated users redirect to `/login`
  8. **`src/main.tsx`** — entry point wiring `QueryProvider` → `RouterProvider`

  shadcn components installed: `button card form input label`

- **What I changed or rejected — and why:** Accepted as-is. The refresh token queue pattern (using a `failedQueue` array and `isRefreshing` flag) correctly handles concurrent 401s without triggering multiple refresh calls.

---

## Entry 4 — Phase 3: Core Business Domain

- **What I asked:** Phase 3 done — proceed.

- **What AI produced:**
  The two core business domains — Bookings and Credit Packages — plus shared infrastructure:

  1. **`AppShell`** — sidebar layout with nav links to all 7 sections and a logout button that calls `DELETE /auth/logout` then clears localStorage
  2. **`src/services/api/bookings/bookings.service.ts`** — `getBookingsApi`, `createBookingApi`, `markAttendanceApi` (`PATCH /bookings/:id/attendance`), `cancelBookingApi` (`DELETE /bookings/:id`)
  3. **`src/services/api/credit-packages/credit-packages.service.ts`** — `getCreditPackagesApi`, `createCreditPackageApi`, `updateCreditPackageApi`, `deleteCreditPackageApi`
  4. **`src/services/api/students/students.service.ts`** and **`src/services/api/class-sessions/class-sessions.service.ts`** — stubs needed for Select dropdowns in booking/package creation dialogs
  5. **Query key factories** — `bookingKeys`, `creditPackageKeys`, `studentKeys`, `classSessionKeys` with structured key arrays for targeted invalidation
  6. **`BookingsPage`** — table with status badges color-coded per `BookingStatus`, Attendance dialog that guards terminal states (ATTENDED/SKIPPED/ABSENT cannot be re-marked), Cancel button visible only on `BOOKED` status
  7. **`CreditPackagesPage`** — table showing remaining vs total credits, package status badge, Global vs course-scoped label
  8. **`CreateBookingDialog`** — student + session selects; note that `packageId` is optional (server auto-selects best package)
  9. **`AttendanceDialog`** — status select with terminal state guard message
  10. **`CreateCreditPackageDialog`** — student select, credits input, datetime-local expiry

  shadcn components installed: `table dialog select badge separator dropdown-menu`

- **What I changed or rejected — and why:** Accepted as-is. The terminal state guard in `AttendanceDialog` mirrors the backend's state machine rule (ATTENDED, SKIPPED, ABSENT are irreversible) — surfacing it in the UI prevents pointless API calls.

---

## Entry 5 — Phase 4: Supporting CRUD Pages

- **What I asked:** Phase 3 done — proceed to Phase 4.

- **What AI produced:**
  Five remaining domain pages plus shared utilities:

  1. **`src/components/shared/DeleteConfirmDialog.tsx`** — reusable `AlertDialog` wrapper used across all delete actions; requires explicit confirmation before firing the mutation
  2. **`BranchesPage`** — table with inline Edit (dialog) and Delete (confirm dialog); `BranchFormDialog` reused for both create and edit by passing an optional `branch` prop
  3. **`CoursesPage`** — same pattern as Branches; form has name + totalSessions fields
  4. **`StudentsPage`** — create/edit dialog with name, email, phone fields; soft-delete via the confirm dialog
  5. **`ClassSessionsPage`** — create dialog with Branch select, Course select, datetime-local, duration, and seats fields; table shows `bookedSeats / totalSeats`
  6. **`CompensationsPage`** — status filter Select (`ALL / PENDING / RESOLVED / REJECTED`) drives the `useGetCompensations` query params; `ResolveDialog` with RESOLVED/REJECTED decision + optional note; Resolve button only visible on `PENDING` records
  7. **Router updated** — all 7 pages registered under the `ProtectedRoute → AppShell` layout

  shadcn components installed: `textarea alert-dialog`

- **What I changed or rejected — and why:** Accepted as-is. The `BranchFormDialog` / `CourseFormDialog` / `StudentFormDialog` dual-mode pattern (create vs edit via optional prop) avoids duplicating form markup while keeping each page self-contained.

---

## Entry 6 — Scaffold Full Project

- **What I asked:** Please create the full frontend project for me at `/Users/aekachai.s/Documents/work-space/repo/learn-school-backoffice-frontend` — run all the setup commands and write all the source files.

- **What AI produced:**
  A fully scaffolded and running project:
  - All npm dependencies installed
  - `vite.config.ts`, `tsconfig.app.json`, `src/index.css`, `.env` configured
  - `npx shadcn@latest init -d` run; all required UI components added
  - `form.tsx` written manually (shadcn v4 CLI quirk — not emitted automatically)
  - 50+ source files written across `lib/`, `services/`, `features/`, `components/`, `providers/`, `router/`
  - `npx tsc --noEmit` passed with zero type errors
  - `npm run dev` started cleanly on `http://localhost:5173`

- **What I changed or rejected — and why:** No changes needed. The agent handled the `form.tsx` shadcn omission automatically by writing it manually — correct behaviour given the known shadcn v4 CLI quirk.

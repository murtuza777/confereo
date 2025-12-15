## Confereo – Zoom‑style Video Conferencing App

Confereo is a Zoom‑like video conferencing clone built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Clerk** for authentication, and **Stream Video** for real‑time audio/video calls, recordings, and meeting management.

### Features

- **Auth & security**: Sign up / sign in with Clerk, protected routes via `middleware.ts`.
- **Instant meetings**: Start and join video calls powered by `@stream-io/video-react-sdk`.
- **Personal room**: Always‑available personal meeting room (`/personal-room`).
- **Meeting scheduling**: Schedule upcoming meetings with date/time picker.
- **Recordings & history**:
  - **Upcoming** meetings – `/upcoming`
  - **Previous** meetings – `/previous`
  - **Recordings** – `/recordings`
- **Responsive UI**: Modern layout with sidebar, navbar, and mobile navigation.

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript, React 18
- **Styling**: Tailwind CSS 4, custom UI components
- **Auth**: Clerk (`@clerk/nextjs`)
- **Video / Realtime**: Stream (`@stream-io/node-sdk`, `@stream-io/video-react-sdk`)
- **Icons & UI utilities**: `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`

---

## Getting Started

### 1. Prerequisites

- **Node.js** ≥ 18
- **npm**, **pnpm**, or **yarn**
- Accounts & API keys for:
  - **Clerk** (authentication)
  - **Stream Video** (video calls)

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Environment variables

Create a `.env.local` file in the project root and configure the required keys.

At minimum you’ll need:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Stream Video
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

> Make sure **API Secret values are never committed** to version control.

### 4. Run the development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Then open `http://localhost:3000` in your browser.

---

## Project Structure (high level)

- `app/` – Next.js App Router pages and layouts
  - `(root)/(home)/` – main authenticated experience (home, upcoming, previous, recordings, personal room, meeting pages)
  - `(auth)/` – sign‑in and sign‑up routes
- `components/` – shared UI components (meeting cards, meeting room, sidebar, navbar, dialogs, etc.)
- `actions/` – server actions such as `stream.actions.ts` (Stream token generation)
- `hooks/` – React hooks for fetching calls and call details
- `provider/` – Stream client provider
- `constants/` – app‑wide constants and configuration

---

## Scripts

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – start the production server
- `npm run lint` – run ESLint

---

## Deployment

Confereo is a standard Next.js App Router project and can be deployed to platforms like **Vercel**, **Netlify**, or any Node‑compatible host.

Make sure you configure the same environment variables (`.env`) in your hosting provider’s dashboard (Clerk + Stream keys) before deploying.


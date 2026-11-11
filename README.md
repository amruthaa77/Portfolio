# Amrutha M — Personal Portfolio

> A distinctive, high-performance, award-quality portfolio website for **Amrutha M**, full-stack developer and MCA student at St. Joseph's University, Bengaluru.

Built with **React 18, TypeScript, Tailwind CSS, Framer Motion, Lenis, and React Three Fiber**.

---

## ⚡ Tech Stack & Architecture

- **Frontend Framework:** React 18 + Vite + TypeScript
- **Styling & Design System:** Tailwind CSS with custom Obsidian (`#07090E`) & Electric Lime (`#CEFF00`) palette
- **Motion & Smooth Scroll:** Framer Motion (staggered entrances, 3D card perspective tilt, modal springs) + Lenis smooth inertial scrolling
- **3D Hero Graphic:** React Three Fiber (`@react-three/fiber` & `@react-three/drei`) featuring an interactive wireframe concurrency orb with orbiting satellite nodes. Lazy-loaded via dynamic imports with an accessible SVG fallback for devices with `prefers-reduced-motion` or disabled WebGL
- **Command Palette:** `Cmd+K` / `Ctrl+K` keyboard-first fuzzy search and navigation
- **Deployment Platform:** Vercel (configured via `vercel.json` for SPA rewrites and immutable asset caching)

---

## 📁 Single Source of Truth: `src/data/content.ts`

All personal info, project specifications, architecture pipelines, metrics, experience, education, and links live exclusively in:

```
src/data/content.ts
```

### How to update content without touching components:
1. **Add or Edit Projects:** Modify the `projects` array. Each project accepts:
   - `title`, `subtitle`, `tagline`, `period`, `stack`
   - `problem`, `built`, `keyDecisions` (with rationale and outcomes)
   - `concurrencyOrTestMetric`
   - `architecture.steps` (renders the interactive SVG architecture flow automatically!)
   - `liveUrl` & `githubUrl` (if omitted or marked undefined, renders a disabled button with a `"Coming soon"` tooltip)
2. **Update Contact Info & Formspree Endpoint:** Update `contact.formspreeEndpoint`, `contact.email`, `contact.github`, and `contact.linkedin`.
3. **Replace Resume:** Drop your updated PDF at `/public/resume.pdf` (or edit `personal.resumePdfPath`).
4. **Update Experience or Achievements:** Edit the `experience` and `achievements` arrays in `src/data/content.ts`.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js `v18.x` or higher
- npm `v9.x` or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/amruthaa77/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be live at `http://localhost:5173`.

---

## 🛠️ Production Build & Verification

```bash
# Typecheck & build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Vercel Deployment Guide

### Option 1: Vercel Git Integration (Recommended)
1. Push this repository to your GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Amrutha M portfolio"
   git branch -M main
   git remote add origin https://github.com/amruthaa77/Portfolio.git
   git push -u origin main
   ```
2. Log into [vercel.com](https://vercel.com).
3. Click **Add New Project** and select `amruthaa77/Portfolio`.
4. Framework Preset: **Vite** (auto-detected).
5. Root Directory: `./` (leave default).
6. Click **Deploy**. `vercel.json` will automatically configure client-side SPA routing and security headers.

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🧪 Verified Breakpoints & Performance
- **360px** (Mobile): Single-column, $\ge 44\text{px}$ touch targets, zero horizontal scroll, safe-area bottom padding.
- **768px** (Tablet): Responsive 2-column grids and balanced typography.
- **1280px** (Desktop): Full 3D canvas, magnetic cursor, 3D card tilt.
- **1920px** (Ultra-wide): Clean constrained container (`max-w-7xl`) preventing content stretching.

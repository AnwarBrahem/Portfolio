# Anwar Brahem — Portfolio

Futuristic sci-fi portfolio built with **Next.js 14**, **Supabase**, and deployed on **Vercel**.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom sci-fi tokens |
| Animation | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage (project images) |
| Deploy | Vercel |

---

## Quick Start

### 1. Clone & install

```bash
git clone https://github.com/HLSnipey/portfolio.git
cd portfolio
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste the contents of `supabase-schema.sql` → Run
3. Copy your project URL and keys from **Settings → API**

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase dashboard
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the `anon` public key
- `SUPABASE_SERVICE_ROLE_KEY` — the `service_role` secret key
- `ADMIN_PASSWORD` — your own secret password for `/admin`

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. In **Environment Variables**, add all four variables from `.env.local`
4. Deploy ✓

---

## Admin Panel

Navigate to `/admin` — you'll see a password prompt.  
Enter your `ADMIN_PASSWORD`. No public login, no other users.

From the admin panel you can:
- Add projects (title, description, tags, category, links, image URL)
- Delete projects
- Upload images to Supabase Storage and paste the public URL

---

## Project structure

```
app/
  layout.tsx          — Root layout
  page.tsx            — Home (Hero + About + Skills + Projects + Contact)
  globals.css         — Sci-fi design system
  admin/page.tsx      — Admin panel (password-gated)
  api/
    auth/route.ts     — Login / logout cookie management
    projects/route.ts — GET (public) · POST (admin)
    projects/[id]/    — DELETE · PATCH (admin)

components/
  Navbar.tsx          — Sticky nav with glitch effect
  Hero.tsx            — Typewriter + terminal boot sequence
  AboutSection.tsx    — Timeline + stats
  SkillsSection.tsx   — Tech stack + languages
  ProjectsSection.tsx — Filterable grid fetched from Supabase
  ProjectCard.tsx     — Hover glow card
  ProjectModal.tsx    — Full detail overlay
  ContactSection.tsx  — Links + status board

lib/
  supabase.ts         — Browser client (anon key)
  supabase-admin.ts   — Server client (service role)
  types.ts            — TypeScript types
```

---

## Customisation

All personal data lives in the component files — search for your name or contact info to update it. No config file needed.

| What to change | Where |
|---|---|
| Name & bio | `components/Hero.tsx`, `components/AboutSection.tsx` |
| Skills | `components/SkillsSection.tsx` |
| Contact links | `components/ContactSection.tsx` |
| Projects | `/admin` panel or `supabase-schema.sql` seed |
| Colours | `tailwind.config.ts` + `app/globals.css` |

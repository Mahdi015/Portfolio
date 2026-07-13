# Mahdi Feriani — Portfolio

Modern portfolio built with **Next.js 15**, **React 19**, **TypeScript**, and the App Router.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Contact Form

The contact form uses [Web3Forms](https://web3forms.com) (client-side, free plan).

Add to `.env.local`:

```
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

## Content Updates

Portfolio content lives in `data/portfolio.ts` — update experience, projects, skills, and bio there.

## Deploy to Netlify

1. Push your changes to GitHub (`main` or your deploy branch).
2. In Netlify, open your site → **Site configuration** → **Build & deploy**.
3. Confirm settings:
   - **Build command:** `npm run build`
   - **Publish directory:** leave empty (Netlify auto-detects Next.js)
   - **Node version:** 20+ (set in **Environment variables** as `NODE_VERSION=20` if needed)
4. Add **Environment variables:**
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` = your Web3Forms key
5. Trigger **Deploy site** (or wait for auto-deploy after push).
6. After deploy, verify:
   - `https://mahdiferiani.netlify.app/`
   - `https://mahdiferiani.netlify.app/projects/msafer`
   - `https://mahdiferiani.netlify.app/projects/ilias-shop`
   - Contact form submission

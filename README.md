# Luddite Lodge

A Vite React single-page concept site for Luddite Lodge.

Use Node 18.18+ for the current Vite toolchain.

## Local Development

```sh
npm install
npm run dev
```

## Production Build

```sh
npm run build
npm run preview
```

## Waitlist Form Setup

The waitlist forms use [Formspree](https://formspree.io) to collect emails (free, no backend needed).

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form — copy the form ID from the endpoint URL (the part after `/f/`)
3. Copy `.env.example` to `.env.local` and paste your form ID:
   ```
   VITE_FORMSPREE_ID=your_form_id_here
   ```
4. In Vercel, add `VITE_FORMSPREE_ID` as an Environment Variable under **Project Settings → Environment Variables**

Without the env variable, form submissions fall back to opening a mailto link.

## Deploying On Vercel

Import this repository in Vercel and use the default Vite settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_FORMSPREE_ID` under Environment Variables (see above)

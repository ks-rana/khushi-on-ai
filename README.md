# Khushi on AI — an interactive essay

A standalone interactive essay on artificial intelligence, seen through a
psychology lens. Five provocative questions, plus a live experiment where a
machine decides how "human" you sound — built around my own Turing-test study,
in which an AI was judged *more human than me*.

Built with **Next.js (App Router) + React + TypeScript**, deployable to **Vercel**.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → **Import** this repo.
3. Framework preset auto-detects **Next.js**. Leave the defaults.
4. Click **Deploy**. Done — you get a live URL.

The site works fully with **no API keys and no database**. The live judge is a
free, transparent, server-side heuristic (no paid model calls).

### Optional: turn on the growing "crowd" data

By default, visitor results are kept in memory and reset on each serverless cold
start. To make them persist and accumulate across everyone:

1. In your Vercel project: **Storage → Create Database → KV** (Upstash — free tier).
2. Vercel automatically adds the `KV_REST_API_URL` and `KV_REST_API_TOKEN`
   environment variables.
3. Redeploy. The graphs now persist and grow with every visitor. No code change.

## A note on honesty

Where parts of this work were AI-assisted, the site says so. The arguments, the
study design, and the conclusions are mine. The on-page "judge" is my own
rule-based recreation of the cues the GPT judge in my study admitted to using —
not a paid model.

— Khushi Suresh Rana

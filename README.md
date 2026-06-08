# Is it smart, or does it just sound like us?

**An interactive essay on artificial intelligence, seen through a psychology lens.**

🔗 **Live:** [khushi-on-ai.vercel.app](https://khushi-on-ai.vercel.app)

---

## What this is

This is a standalone interactive essay — not a portfolio, not a single tool, but
one continuous piece of thinking about AI, written from the point of view of a
psychology student. It walks through **five questions I actually investigated**
during my AI-psychology coursework, and ends each one with my own honest take
rather than a tidy answer.

It's built in the tradition of "explorable explanations" (think *The Pudding* or
*Distill*): the writing leads, and interaction shows up only where it earns its
place — most of all in the centerpiece, a **live experiment you can play with
yourself.**

## The five questions

1. **Is it actually smart?** — Why "smart" falls apart as a question until you
   ask *smart at what?*, and why intelligence is better measured domain by domain.
2. **Can it pass as human?** — The centerpiece (see below).
3. **Can we even measure it?** — Why AI benchmark problems are really old
   measurement problems from psychology, and why *who runs the test* matters.
4. **Can it be wise, not just smart?** — On metacognition, and the tension
   between wanting AI to reason independently *and* stay aligned with us.
5. **Is it reasoning, or just trained?** — On how hard it is to tell a model's
   reasoning apart from its training.

## The centerpiece: my Turing-test study

Question 2 is built around a small study I ran myself. I told Claude to "sound
human," answered the same questions as myself (the real human), and had a second
model (ChatGPT) act as judge, scoring each answer on a human-likeness scale
across ten counterbalanced trials.

**The result: the AI scored a perfect 150/150. I, an actual human, scored 101.**
The machine was judged *more human than the human* — in every single round. When
I looked at *why*, the judge had rewarded a narrow stereotype of "human" (casual
filler, tidy little details) and marked down my real, messier answers.

The site lets visitors experience this directly:

- **Be judged** — answer as yourself and watch a machine score how "human" you
  sound, with its reasoning shown.
- **Be the judge** — read real answers from my study and try to spot the human.
  Can you beat the AI judge? (It almost never picked the real person.)
- **The results** — live graphs comparing AI-as-judge vs. human-as-judge, your
  own result, and the "caricature" of a human the machine rewards, built up from
  everyone who takes part (with consent, anonymously).

## Features

- Five-section interactive essay with a sticky question index and reading
  experience built for long-form text
- A live, **transparent** human-likeness judge (no paid AI model — see below)
- A guess-the-human game using real study transcripts
- Anonymous, consent-first data collection feeding live result graphs
- Citations as margin sidenotes, light/dark theme, full keyboard support,
  reduced-motion support, responsive layout

## Tech

Next.js (App Router) · React · TypeScript · CSS Modules · deployed on Vercel.
No API keys or database required to run — the live judge is a free, rule-based
function that runs server-side. (Optional: a free Vercel KV database makes the
crowd graph persist; see below.)

## Run it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy

Push to GitHub, then import the repo at [vercel.com](https://vercel.com) → it
auto-detects Next.js → Deploy. No configuration needed.

**Optional — persist the crowd data:** in your Vercel project, go to
**Storage → Create Database → KV** (free tier). Vercel adds the environment
variables automatically; redeploy, and the result graphs will accumulate across
visitors with no code change.

---

## Credits & honesty

This project matters to me, so I want to be precise about it.

**Everything that makes this *this* is mine.** The concept, the five questions,
the research and reading, the Turing-test study (its design, the
counterbalancing, the human-likeness scale, running all ten trials, and being
the human reference myself), the arguments, the interpretations, and all of the
writing and ideas — those are my own work, from my AI-psychology coursework.

**AI assistance was used for the code.** I used Claude to help build the website
itself — the Next.js implementation, the styling, and the interactive components
— turning my concept, content, and study into a working site. Where individual
sections of the writing were tightened with AI help, the site says so inline.

The on-page "judge" is deliberately *not* a paid AI model. It's a transparent,
rule-based recreation of the surface cues the real GPT judge in my study admitted
to using — which is also the point I'm making with it.

---

**By Khushi Suresh Rana.**

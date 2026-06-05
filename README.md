# Curiosa

A growing collection of free, browser-based learning games for curious adults.
Everything is plain HTML / CSS / JavaScript — no build step, no framework, no server,
no tracking. That keeps it fast, free to host forever, and easy to extend.

## What's inside

```
/
├── index.html              ← the homepage / hub ("The Halls")
├── games/
│   ├── trivia.html          ← The Trivia Expedition (math · geography · history)
│   ├── arithmetic.html      ← Mental Arithmetic Drills (60-second math sprint)
│   ├── atlas.html           ← Atlas Showdown (larger/smaller country duel)
│   ├── timeline.html        ← The Timeline Challenge (order historical events)
│   └── vocabulary.html      ← The Vocabulary Vault (rare words & etymology)
└── README.md
```

Five halls are live. The homepage also lists four more as "in development"
(The Logic Gauntlet, The Science Lab, The Daily Challenge, Literature & Lore) —
ready to be turned on as you build them.

---

## Deploy it (free) — Cloudflare Pages + GitHub

Recommended because it's free, has unlimited bandwidth, free SSL, supports a free
custom domain, and auto-redeploys on every `git push`.

1. **Create the repo and push**
   ```bash
   git init
   git add .
   git commit -m "Curiosa: initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/curiosa.git
   git push -u origin main
   ```

2. **Connect Cloudflare Pages** (one time)
   - dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
   - Select your repo
   - Build settings: **Framework preset = None**, **Build command = (blank)**,
     **Build output directory = `/`** (it's a static site — nothing to build)
   - Save and Deploy → live at `curiosa.pages.dev` in under a minute

3. **Every future update** is just:
   ```bash
   git add . && git commit -m "your change" && git push
   ```
   The site redeploys itself automatically.

### Alternative: GitHub Pages (also free)
Repo → Settings → Pages → Source = "Deploy from a branch" → Branch = `main` / `root`.
Lives at `https://YOUR_USERNAME.github.io/curiosa/`.

### Custom domain (optional, ~$10–15/year)
Buy a domain, then add it under your Cloudflare Pages project → Custom domains.
Hosting stays free — the domain is the only cost.

---

## How to add a new game (turn a "coming soon" hall live)

1. Copy any game file (e.g. `cp games/vocabulary.html games/logic.html`) and build
   your game inside it. Keep the shared look: parchment background, Cinzel + EB Garamond
   fonts, and the oxblood / verdigris / gold palette. The "Return to Curiosa" link
   at the bottom should point to `../index.html`.

2. In `index.html`, find the matching `<div class="hall soon ...">` card and turn it
   into a live link:
   ```html
   <a class="hall live logic" href="games/logic.html">
     <span class="badge open">Open</span>
     ... keep the icon, title, and description ...
     <span class="enter">Enter the hall →</span>
   </a>
   ```

3. Commit and push. The new hall is live.

---

## Renaming the site
The name "Curiosa" appears in `index.html` and as the back-link text in each game.
To rename everything at once from the project root:
```bash
grep -rl "Curiosa" . | xargs sed -i 's/Curiosa/YourName/g'
```
(Other names considered: The Lyceum, The Athenaeum, Quadrivium.)

---

## A note on what static hosting can and can't do
All current games run entirely in the browser and need no backend, so they cost nothing
to host. Features that remember data *between visits or between people* — saved high
scores across sessions, accounts, a global leaderboard — would need a small free
database layer (e.g. Cloudflare KV, or Supabase) added later. Still free at this scale,
just not part of a pure static site. Everything you have now works with zero backend.

## Future hall ideas
- The Logic Gauntlet — riddles & lateral-thinking puzzles
- The Science Lab — physics, chemistry, biology, the cosmos
- The Daily Challenge — one fresh mixed round per day
- Literature & Lore — authors, opening lines, myths, masterpieces
- Difficulty tiers, streak history, and a two-player pass-and-play mode

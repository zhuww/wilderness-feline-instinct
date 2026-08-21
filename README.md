# 🐱 Wilderness Feline Instinct: Siamese Cat Survival

A complete, single-page **2D top-down wilderness survival game** built with **vanilla HTML5 Canvas** — no game engine, no frameworks, no image assets. Every sprite, tile, weather effect and particle is drawn procedurally in code. Fully self-contained: works offline by double-clicking `index.html`.

**[▶ Play it online](https://zhuww.github.io/wilderness-feline-instinct/)** (GitHub Pages)

---

## ✨ Highlights

- **8 languages** — 中文 / English / Français / Español / Deutsch / 日本語 / 한국어 / Русский, switchable live with the 🌐 button (English is the default, Chinese is the fallback). Your choice is saved.
- **4 explorable zones** — Wild Meadow → City District → Dry Wasteland → Dark Forest, connected by portals (no level gates — travel freely).
- **Final boss: the King Cobra** 🐍 — spits a green venom beam (telegraphed by coiling), delivers a long-range pounce (30 dmg + poison 5 HP / 2 s), and bites with venom. Large, intimidating, and it **revives 4 minutes after defeat** so you can farm it again.
- **5-branch skill tree** — 🎯 Hunting, 🛡️ Survival, 🐈 Companion, 💨 Dodge, 🔨 Crafting. Repeatable skills (Hunter, Leap, Thick Fur, Vitality, Dodge, Craftsman) go up to Lv 3–5; skill points only come from leveling, so builds matter.
- **Dynamic difficulty** — monsters, bosses and challenges scale with your level (each zone has a base difficulty: Meadow < City < Wasteland < Forest). Enemies respawn gradually, so there is always something to hunt.
- **Deep survival systems** — hunger / thirst / stamina / mood / fur wetness (rain soaks you over ~3 minutes, faster in the dark forest; full soak drains mood). Sleep in cave beds, city alleys or forest tree-holes.
- **Gems & advanced gear** — collect rubies/sapphires/jade from volcanoes and the forest to craft Flame Ruby Pendant (+40% dmg), Sapphire Star (crit +12%), Jade Charm (−6 dmg), Vine Armor (waterproof, −7 dmg), Stone Claw (+8 dmg) and Dragon's Blood Potion (+60 HP).
- **Pet companions** — find stray cats, feed them to 60 ♥ friendship and adopt them. They follow you, warn of danger, assist in hunting, and can be **summoned into battle** (R).
- **Periodic challenges** — 9 random events: rival cats, dog chases, thunderstorm, salmon run, viper swarm, wolf pack, boar stampede, hawk dive, dense fog.
- **Dynamic weather & day/night** — 12-minute day cycle, rain (rarer in the wasteland, more common in the forest), mist, stars, fireflies, wind-blown leaves, bokeh depth-of-field.
- **Full game flow** — leveling, XP, permanent stat growth, dynamic loot, auto-save, and a 🆕 **New Game** button that truly wipes everything (level, skills, inventory, companions, zone progress) and starts a fresh world.

## 🎮 Controls

| Key | Action |
| --- | --- |
| `WASD` / Arrows | Move |
| `Shift` | Sneak (hide in tall grass, shrink detection range) |
| `Space` | Pounce (leap attack; with the **Leap** skill, jump much farther) |
| `E` | Sniff (wind-guided scent streams) |
| `Q` | Groom (+Mood) |
| `F` | Interact (gather / drink / fish / pet strays / enter cave / sleep / craft) |
| `R` | Summon your companion cat |
| `I` / `B` / `G` | Inventory & Crafting / Cat Friends / Survival Guide |
| `Esc` | Close sheets |
| 🌐 | Cycle language (English → 中文 → Français → Español → Deutsch → 日本語 → 한국어 → Русский) |
| 🆕 | Start a new game (full reset) |

Touch devices get an on-screen virtual joystick + action buttons automatically.

## 🧭 Scent Instinct

Press `E` to read the wind: colored particle streams flow from whatever is near.

- 🩵 **Cyan** — clean water springs
- 🟡 **Gold** — prey (mice, river salmon, grasshoppers)
- 💗 **Pink** — friendly stray cats
- ❤️ **Crimson** — predators (boars, vipers, foxes, monkeys, crocodiles)

The **Instinct compass** in the HUD always points at the nearest source of each scent.

## 🏞️ Zones & Bosses

| Zone | Description | Boss (bottom-right, guards next portal) |
| --- | --- | --- |
| Wild Meadow | Starting area: rivers, caves, berries, catnip | Giant Boar (charge) |
| City District | Linear street with 4 architectural styles (NYC / Sydney / Kunming / Beijing), trash cans, stray dogs, alley shelters | Slingshot Kid (ranged stones) |
| Dry Wasteland | Volcano craters with impassable lava, cacti, dragon herbs, gems; scarce water, almost no rain | Dire Wolf (fast) |
| Dark Forest | A long road walled by impassable trees; monkeys & crocodiles, rain-prone, reishi, vine, tree-hole shelters | **King Cobra** (venom beam + long pounce) |

## 🖥️ How to run

- **Play online**: https://zhuww.github.io/wilderness-feline-instinct/
- **Locally**: double-click `index.html` (works from `file://`, fully offline — Tailwind CSS is bundled locally, zero CDN dependencies), or
  ```bash
  node server.js        # serves at http://127.0.0.1:8080 (no-cache for development)
  ```

## 📦 Deploy to any static host

The game is a pure static site — upload the contents of the `dist/` folder (or `wilderness-cat-website.zip`) to GitHub Pages, Netlify, Vercel, nginx, or any static file server. No backend required.

## 🛠️ Tech stack

| Layer | Technology |
| --- | --- |
| Rendering | HTML5 Canvas 2D (procedural art, offscreen chunk caching) |
| UI / HUD | DOM + Tailwind CSS (bundled locally as `js/tailwind.js`) |
| Localization | Hand-rolled i18n: `js/i18n.js` + 8 dictionaries in `js/lang/` |
| Persistence | `localStorage` (save key `wfissave`, language key `wfi_lang`) |
| Runtime | Vanilla JS on `window.Game` — 17 scripts, no build step, no dependencies |

## 📁 Project structure

```
index.html            page shell, HUD, modals, touch UI, bundled styles
js/
  tailwind.js         Tailwind CSS runtime (local, offline-capable)
  utils.js            math, seeded RNG, value-noise / fBm
  i18n.js             multi-language framework (t/setLang/cycleLang/applyPage)
  lang/               zh en fr es de ja ko ru dictionaries (496 keys each)
  world.js            procedural world generator (4 zones, gates, features)
  particles.js        scent streams, sparkles, leaves, mist, bokeh
  entities.js         player, prey, predators, bosses, companions, items, skills
  render.js           canvas renderer: tiles, cat art, day/night, effects
  ui.js               HUD, compass, action log, modals, touch controls
  challenges.js       periodic challenge events
  main.js             game loop, input, weather, camera, cave, save/new game
```

## 💾 Save & New Game

- Progress auto-saves to `localStorage` (key `wfissave`).
- The 🆕 button opens a confirmation dialog, then **fully resets** the game: level, skills, inventory, equipment, companions, zone progress, time — a brand-new world from level 1 (language preference is kept).

## 📜 License

All art, code and audio (procedurally generated) are original — no external assets, no copyright risk.

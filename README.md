# 🐱 Wilderness Feline Instinct: Siamese Cat Survival

A complete, single-page 2D top-down wilderness survival game — HTML5 Canvas
rendering with a Tailwind-styled HUD. No build step, no dependencies:
open **`index.html`** in any modern browser (Chrome / Edge / Firefox) and play.

> Tailwind CSS loads from the CDN when online; an embedded fallback stylesheet
> keeps the full UI usable offline.

## How to run

- **Double-click `index.html`** (works from `file://`), or
- serve the folder, e.g. `npx serve .` or `python -m http.server 8080`.

## Controls

| Key | Action |
| --- | --- |
| `WASD` / Arrows | Move |
| `Shift` | Sneak (crouch — hides you in tall grass, shrinks predator detection) |
| `Space` | Pounce (leap attack to catch prey or strike predators) |
| `E` | Sniff (wind-guided scent streams) |
| `Q` | Groom (+Mood, sparkles) |
| `F` | Interact (gather / drink / fish / pet strays / enter cave / cook / sleep) |
| `I` / `B` / `G` | Inventory & Crafting / Cat Friends / Survival Guide |
| `Esc` | Close sheets |

Touch devices get an on-screen virtual joystick + action buttons automatically.

## Scent instinct

Press `E` to read the wind: colored particle streams flow from whatever is near.

- 🩵 **Cyan** — clean water springs
- 🟡 **Gold** — prey (mice, river salmon, grasshoppers)
- 💗 **Pink** — friendly stray cats
- ❤️ **Crimson** — predators (wild boars, vipers, foxes)

The **Instinct compass** in the HUD always points at the nearest source of each
scent.

## Systems

- **Vitals** — HP, Satiety, Hydration, Stamina, Mood, Fur Wetness. Rain soaks
  your fur and slows stamina regen; wear a *Leaf Rain Hat* or dry off by the
  cave campfire.
- **Day / night & weather** — a 12-minute day cycle, dusk/dawn glow, stars,
  fireflies, rain streaks, drifting mist, and wind-blown leaves.
- **Hunting & combat** — sneak through tall grass, pounce with claws out,
  catch mice/salmon/grasshoppers, fight boars, foxes and vipers. A pounce can
  leap **across narrow streams** (but landing in deep water soaks you).
- **Cave shelter** — campfire cooking & drying, a straw bed that heals you
  through the night.
- **Crafting** — Leaf Rain Hat, Fishbone Collar, Dried Catnip, Herb Salve.
- **Summon companion** — after adopting a cat, press **R** to summon your best
  friend into battle: it hunts nearby predators for 25 seconds and boosts your
  damage. Cooldown: **5 minutes** (shown in the HUD).
- **Pet companions** — find stray cats (pink scent), pet them with `F` or use
  the floating cat action menu to **Feed** them (salmon / mouse, +22 ♥) until
  friendship hits **60 ♥**, then **Adopt** them as your pet: red collar, they
  follow you everywhere, and unlock perks — mood aura → danger warnings (70 ♥)
  → hunt assist (90 ♥) — plus they bring you small gifts. See progress in the
  Cat Friends sheet (pets / strays sections).
- **Periodic challenges** — every 60–120 seconds the wilderness throws a
  random event at you (watch the banner):
  - 🐈‍⬛ **Territory invasion** — rival cats claim your land; pounce them twice
    each to chase them off, or they steal your food and sour your mood.
  - 🐕 **Dog chase** — a wild dog hunts you; you run faster on adrenaline, but
    it's quicker — sneak in tall grass to lose it, stun it with a pounce, or
    escape into a cave. Two bites and the dog wins.
  - ⛈️ **Thunderstorm** — lightning warns with a glowing circle before it
    strikes; get out of the blast radius or hide in the cave.
  - 🐟 **Salmon run** — every cast at the stream catches a salmon.
  - 🐍 **Viper swarm** — six vipers surround you; crush them with pounces.
  - 🐺 **Wolf pack** — 2–3 wolves hunt you; fight them off (two pounces each)
    or flee into a cave. Three bites and you lose.
  - 🐗 **Boar stampede** — charging boars tear across the land; dodge them!
  - 🦅 **Hawk dive** — a hawk circles overhead and dives at its shadow — move!
  - 🌫️ **Dense fog** — visibility drops and predators sniff you out; reach the
    glowing beacon (cave or spring) before time runs out.
  Winning challenges grants XP, mood/stamina rewards and a chance at skill books.
- **Growth & skills** — every action earns XP (catching prey, fishing,
  gathering, petting cats, winning challenges); level up to raise max HP,
  Stamina and Mood. **Skill points** (from level-ups, challenge wins and boss
  kills) are spent freely in the 📈 **Growth** panel across **three branches**:
  🎯 Hunting, 🛡️ Survival and 🐈 Companion — your build is your choice.
- **Zones & bosses** — portals at the map edges lead to new regions with level
  gates: **City District** (Lv 5, boss: slingshot kid with ranged stones),
  **Dry Wasteland** (Lv 10, boss: fast dire wolf) and **Dark Forest** (Lv 15,
  boss: pouncing great serpent). The starting meadow hides a charging giant
  boar. Each defeated boss grants big XP + 3 skill points; progress is saved.
- **Auto-save** — progress persists in `localStorage` (↻ button for a new game).

## Files

```
index.html          page shell, HUD, modals, touch UI, fallback styles
js/utils.js         math, seeded RNG, value-noise / fBm
js/world.js         procedural wilderness generator
js/particles.js     scent streams, sparkles, leaves, mist, bokeh
js/entities.js      player cat, prey, predators, companions, inventory, crafting
js/render.js        canvas renderer: tiles, Siamese cat art, day/night, DOF
js/ui.js            HUD, compass, action log, modals, touch controls, SFX
js/main.js          game loop, input, weather, camera, cave, save/load
```

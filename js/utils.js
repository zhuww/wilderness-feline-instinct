/* ==========================================================================
   Wilderness Feline Instinct: Siamese Cat Survival — utils.js
   Math helpers, seeded RNG, value noise + fBm
   ========================================================================== */
(function () {
  'use strict';
  const Game = (window.Game = window.Game || {});
  const TAU = Math.PI * 2;

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const dist2 = (ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay; return dx * dx + dy * dy; };
  const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
  const randRange = (a, b) => a + Math.random() * (b - a);
  const randInt = (a, b) => Math.floor(randRange(a, b + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const angleTo = (ax, ay, bx, by) => Math.atan2(by - ay, bx - ax);

  function angleLerp(a, b, t) {
    let d = (b - a) % TAU;
    if (d > Math.PI) d -= TAU;
    if (d < -Math.PI) d += TAU;
    return a + d * t;
  }

  /* Deterministic PRNG (mulberry32) */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Value noise + fractal Brownian motion */
  function makeNoise(seed) {
    const rand = mulberry32(seed);
    const p = new Uint8Array(512);
    const perm = new Uint8Array(256);
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const t = perm[i]; perm[i] = perm[j]; perm[j] = t;
    }
    for (let i = 0; i < 512; i++) p[i] = perm[i & 255];
    const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
    function grad(hash, x, y) {
      switch (hash & 3) {
        case 0: return x + y;
        case 1: return -x + y;
        case 2: return x - y;
        default: return -x - y;
      }
    }
    function noise2(x, y) {
      const xi = Math.floor(x), yi = Math.floor(y);
      const X = xi & 255, Y = yi & 255;
      const xf = x - xi, yf = y - yi;
      const u = fade(xf), v = fade(yf);
      const aa = p[p[X] + Y], ab = p[p[X] + Y + 1];
      const ba = p[p[X + 1] + Y], bb = p[p[X + 1] + Y + 1];
      const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
      const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);
      return (lerp(x1, x2, v) + 1) * 0.5;
    }
    function fbm(x, y, oct) {
      let amp = 0.5, f = 1, sum = 0, norm = 0;
      for (let i = 0; i < oct; i++) {
        sum += noise2(x * f, y * f) * amp;
        norm += amp;
        amp *= 0.5;
        f *= 2;
      }
      return sum / norm;
    }
    return { noise2, fbm };
  }

  /* Cheap integer hash → 0..1, used for tile variation */
  function hash2(x, y) {
    let h = (x * 374761393 + y * 668265263) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  Game.utils = {
    TAU, clamp, lerp, dist2, dist, randRange, randInt, pick,
    angleTo, angleLerp, mulberry32, makeNoise, hash2,
  };
})();

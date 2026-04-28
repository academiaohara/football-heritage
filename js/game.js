/**
 * game.js – Game state and core logic
 *
 * Exports:
 *   G              – live game-state object
 *   DRAG           – drag/swipe transient state
 *   setRenderCallback – register the UI render function (avoids circular imports)
 *   clamp, shieldSVG, catColor, catLabel – shared helpers
 *   pickCard, choose, applyFx, log, checkEnd
 *   handleLegacyEnd, endGame, selectPres, startGame, restart
 *   checkAchievements, showAchToast, assignMote
 *   saveState, loadState
 */

import { CARDS, SHIELDS, SHIELD_COLORS, CATS, ACHIEVEMENTS, MOTES, PRES_TYPES } from './data.js';

/* ─────────────── Render callback (breaks ui.js ↔ game.js cycle) ─────────────── */

/** @type {() => void} */
let _render = () => {};

/** @param {() => void} fn  The render function from ui.js */
export function setRenderCallback(fn) {
  _render = fn;
}

/* ─────────────── Game state ─────────────── */

/** @type {Object} G – mutable game state singleton */
export let G = {
  clubSetup: false,
  club: '',
  shield: { design: 0, color: 0 },
  setupDesign: 0,
  setupColor: 0,
  reign: 1, year: 2010, turns: 0,
  stats: { money: 55, press: 55, vest: 55, power: 55 },
  pres: null, history: [], titles: [], inherited: null,
  bombs: [], gameOver: false, endType: null,
  seen: new Set(), currentCard: null,
  achievements: [],
  motes: [],
  track: {
    totalTurns: 0,
    corruptAccepted: 0, corruptRejected: 0,
    bestPressDelta: 0,
    // per-legacy counters
    legCorruptAccepted: 0, legCorruptRejected: 0,
    legPressFriendly: 0,   legVestFriendly: 0,
    legVestSanctions: 0,   legPowerChoices: 0
  }
};

/* ─────────────── Drag/swipe transient state ─────────────── */

/** @type {{ active: boolean, startX: number, currentX: number, threshold: number, locked: boolean }} */
export let DRAG = {
  active: false, startX: 0, currentX: 0, threshold: 75, locked: false
};

/** Timer reference for the achievement toast (private to this module) */
let toastTimer = null;

/* ─────────────── localStorage persistence ─────────────── */

const STORAGE_KEY = 'football-heritage-state';

/** Persist current game state to localStorage (best-effort). */
export function saveState() {
  try {
    const state = { ...G, seen: [...G.seen] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) { /* storage unavailable – silently ignore */ }
}

/** Restore game state from localStorage (best-effort). */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    Object.assign(G, saved);
    G.seen = new Set(saved.seen || []);
  } catch (_) { /* corrupt or missing – start fresh */ }
}

/* ─────────────── Pure helpers ─────────────── */

/**
 * Clamp a value between 0 and 100.
 * @param {number} v
 * @returns {number}
 */
export function clamp(v) { return Math.max(0, Math.min(100, v)); }

/**
 * Generate an SVG shield string.
 * @param {number} dIdx  Shield design index
 * @param {number} cIdx  Colour scheme index
 * @param {number} size  Width/height in px
 * @returns {string}
 */
export function shieldSVG(dIdx, cIdx, size) {
  const d = SHIELDS[dIdx];
  const c = SHIELD_COLORS[cIdx];
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="${d.path}" fill="${c.p}" stroke="${c.s}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M 50,18 L 82,28 L 82,55 Q 77,72 50,82 Q 23,72 18,55 L 18,28 Z" fill="none" stroke="${c.s}" stroke-width="1.5" opacity="0.4"/>
  </svg>`;
}

/** Return the display colour for a card category id. */
export function catColor(id) { return (CATS.find(c => c.id === id) || { color: '#888' }).color; }

/** Return the display label for a card category id. */
export function catLabel(id) { return (CATS.find(c => c.id === id) || { label: id }).label; }

/* ─────────────── Setup helpers ─────────────── */

/**
 * Select a shield design during club setup.
 * @param {number} i  Design index
 */
export function pickDesign(i) {
  G.setupDesign = i;
}

/**
 * Select a shield colour during club setup.
 * @param {number} i  Colour index
 */
export function pickColor(i) {
  G.setupColor = i;
}

/**
 * Confirm club setup and begin the first legacy.
 * Reads the club-name input if available.
 */
export function startGame() {
  const input = document.getElementById('club-name-input');
  const name = (input ? input.value.trim() : '') || 'Mi Club FC';
  G.club = name;
  G.shield = { design: G.setupDesign, color: G.setupColor };
  G.clubSetup = true;
  saveState();
  _render();
}

/* ─────────────── Card picking ─────────────── */

/**
 * Pick the next card from the available pool.
 * Scheduled bombs take priority over random picks.
 * @returns {Object} A card definition object
 */
export function pickCard() {
  let pool = CARDS.filter(c => !G.seen.has(c.id));
  if (pool.length === 0) { G.seen.clear(); pool = CARDS.filter(c => c.id !== 'c100'); }

  const s = G.stats;
  if (s.money > 60 && s.press > 60 && G.turns > 10) {
    const f = CARDS.find(c => c.id === 'c100');
    if (f) pool.push(f);
  }

  if (G.bombs.length > 0 && G.turns >= G.bombs[0].at) {
    const b = G.bombs.shift();
    return b.card;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

/* ─────────────── Choices ─────────────── */

/**
 * Process a player's card choice.
 * @param {number} idx  0 = option A (right swipe), 1 = option B (left swipe)
 */
export function choose(idx) {
  if (DRAG.locked) return;
  const card = G.currentCard;
  const ch    = idx === 0 ? card.a : card.b;
  const other = idx === 0 ? card.b : card.a;
  if (!ch) return;

  try {
    // Track corrupt choices
    if (ch.bomb) {
      G.track.corruptAccepted++;
      G.track.legCorruptAccepted++;
    } else if (other && other.bomb) {
      G.track.corruptRejected++;
      G.track.legCorruptRejected++;
    }

    // Track behaviour signals from fx
    const fx = ch.fx;
    if (fx.press > 0) G.track.legPressFriendly++;
    if (fx.vest  > 0) G.track.legVestFriendly++;
    if (fx.vest  < 0) G.track.legVestSanctions++;
    if (fx.power > 0) G.track.legPowerChoices++;
    if (fx.press > G.track.bestPressDelta) G.track.bestPressDelta = fx.press;

    if (ch.win) {
      G.titles.push('UEFA Champions League ' + G.year);
      applyFx(ch.fx);
      log(card.title + ' → ' + ch.label + ' ★ CAMPEONES');
      checkAchievements();
      endGame('legend');
      return;
    }

    applyFx(ch.fx);

    if (ch.bomb) {
      const pool = CARDS.filter(c => c.id !== card.id && !c.win);
      const bc = pool[Math.floor(Math.random() * pool.length)];
      G.bombs.push({ at: G.turns + 3 + Math.floor(Math.random() * 4), card: bc });
    }

    G.seen.add(card.id);
    G.turns++;
    G.track.totalTurns++;
    if (G.turns % 8 === 0) G.year++;
    log(card.title + ' → ' + ch.label);

    checkAchievements();

    const end = checkEnd();
    if (end) { handleLegacyEnd(end); return; }
    G.currentCard = pickCard();
    saveState();
    _render();
  } finally {
    DRAG.locked = false;
  }
}

/**
 * Apply card effects to game stats.
 * @param {Object} fx  Map of stat keys to delta values
 */
export function applyFx(fx) {
  Object.keys(fx).forEach(k => { G.stats[k] = clamp((G.stats[k] || 0) + fx[k]); });
}

/**
 * Append an entry to the history log.
 * @param {string} txt  Description of what happened
 */
export function log(txt) {
  G.history.push({ reign: G.reign, year: G.year, pres: G.pres ? G.pres.name : '', txt });
}

/**
 * Check whether a game-ending condition has been met.
 * @returns {string|null}  Reason string or null if game continues
 */
export function checkEnd() {
  const s = G.stats;
  if (s.power <= 0)                    return 'resign';
  if (s.vest <= 0  && s.press <= 5)    return 'fired';
  if (s.money <= 0 && s.press <= 10)   return 'bankrupt';
  return null;
}

/* ─────────────── Legacy end ─────────────── */

/**
 * Handle the end of a legacy (president tenure).
 * Resets per-legacy state and either transitions to a new legacy or ends the game.
 * @param {string} reason  'resign' | 'fired' | 'bankrupt'
 */
export function handleLegacyEnd(reason) {
  const msgs = {
    resign:   'Perdiste todo el poder político',
    fired:    'El vestuario y la prensa te destruyeron',
    bankrupt: 'El club está en quiebra técnica'
  };
  log(msgs[reason]);

  // Assign a nickname mote for this legacy
  const mote = assignMote();
  if (mote) {
    G.motes.push({ reign: G.reign, name: mote.name, pres: G.pres ? G.pres.name : '?' });
  }

  if (G.stats.money <= 0 && G.stats.press <= 5 && G.stats.power <= 0) {
    endGame('collapse'); return;
  }

  G.inherited = { msg: msgs[reason] };
  G.reign++;
  G.pres   = null;
  G.stats.money = clamp(G.stats.money - 5);
  G.stats.press = clamp(G.stats.press - 10);
  G.stats.vest  = clamp(40 + Math.floor(Math.random() * 20));
  G.stats.power = clamp(40 + Math.floor(Math.random() * 20));
  G.turns = 0;
  G.currentCard = null;

  // Reset per-legacy tracking counters
  G.track.legCorruptAccepted = 0; G.track.legCorruptRejected = 0;
  G.track.legPressFriendly   = 0; G.track.legVestFriendly   = 0;
  G.track.legVestSanctions   = 0; G.track.legPowerChoices   = 0;

  checkAchievements();
  saveState();
  _render();
}

/**
 * Trigger a definitive game-over screen.
 * @param {string} type  'legend' | 'collapse' | 'fired' | 'bankrupt'
 */
export function endGame(type) {
  G.gameOver = true;
  G.endType  = type;
  saveState();
  _render();
}

/**
 * Select a president/manager type for the new legacy.
 * Applies the president's stat bonus and picks the first card.
 * @param {number} i  Index into PRES_TYPES
 */
export function selectPres(i) {
  G.pres = PRES_TYPES[i];
  G.inherited = null;
  G.stats[G.pres.bonus] = clamp(G.stats[G.pres.bonus] + 15);
  G.currentCard = pickCard();
  saveState();
  _render();
}

/**
 * Reset all game state and start a new game from the setup screen.
 * Properties are mutated in-place (Object.assign) so that the exported `G`
 * reference remains valid in every importing module.
 */
export function restart() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  Object.assign(G, {
    clubSetup: false, club: '', shield: { design: 0, color: 0 },
    setupDesign: 0, setupColor: 0,
    reign: 1, year: 2010, turns: 0,
    stats: { money: 55, press: 55, vest: 55, power: 55 },
    pres: null, history: [], titles: [], inherited: null,
    bombs: [], gameOver: false, endType: null,
    currentCard: null,
    achievements: [], motes: [],
    track: {
      totalTurns: 0,      corruptAccepted: 0, corruptRejected: 0,
      bestPressDelta: 0,
      legCorruptAccepted: 0, legCorruptRejected: 0,
      legPressFriendly: 0,   legVestFriendly: 0,
      legVestSanctions: 0,   legPowerChoices: 0
    }
  });
  G.seen = new Set();
  _render();
}

/* ─────────────── Achievements & Motes ─────────────── */

/**
 * Check all achievements and unlock any that are newly met.
 * Shows a toast notification for each newly unlocked achievement.
 */
export function checkAchievements() {
  ACHIEVEMENTS.forEach(a => {
    if (!G.achievements.includes(a.id) && a.check(G)) {
      G.achievements.push(a.id);
      showAchToast(a.icon + ' Logro: ' + a.name);
    }
  });
}

/**
 * Show a transient achievement unlock toast.
 * @param {string} msg  Message to display
 */
export function showAchToast(msg) {
  let toast = document.getElementById('ach-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'ach-toast';
    toast.className = 'ach-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/**
 * Determine and return the earned mote (nickname) for the current legacy.
 * @returns {Object|null}  A MOTES entry or null if none applies
 */
export function assignMote() {
  for (const m of MOTES) {
    if (m.id !== 'impresentable' && m.check(G)) return m;
  }
  // Fallback: catastrophic reign
  if (G.stats.money < 20 && G.stats.press < 20) return MOTES.find(m => m.id === 'impresentable');
  return null;
}

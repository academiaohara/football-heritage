/**
 * ui.js – Rendering and UI interaction
 *
 * Exports:
 *   render            – main render dispatcher (called by main.js + game.js callback)
 *   pickDesign        – update shield design preview (exposed to window via main.js)
 *   pickColor         – update shield colour preview (exposed to window via main.js)
 */

import { SHIELDS, SHIELD_COLORS, PRES_TYPES, ACHIEVEMENTS } from './data.js';
import {
  G, shieldSVG, catColor, catLabel,
  pickDesign as _pickDesign, pickColor as _pickColor
} from './game.js';
import { attachSwipeListeners } from './swipe.js';

/* ─────────────── Main render dispatcher ─────────────── */

/**
 * Decide which screen to display and inject its HTML into #ui.
 * After setting innerHTML, user-controlled strings are applied via textContent
 * to ensure no HTML injection can occur.
 */
export function render() {
  const el = document.getElementById('ui');
  if (!el) return;
  if (G.gameOver)    { el.innerHTML = renderEnd();        _applyUserText(el); return; }
  if (!G.clubSetup)  { el.innerHTML = renderSetup();      _applyUserText(el); attachSetupListeners(); return; }
  if (!G.pres)       { el.innerHTML = renderPresSelect(); _applyUserText(el); return; }
  el.innerHTML = renderGame();
  _applyUserText(el);
  attachSwipeListeners();
}

/**
 * Replace placeholder elements (data-club-name) with user-controlled text
 * via textContent, which is immune to HTML injection.
 * @param {Element} root  The container element to search within
 */
function _applyUserText(root) {
  root.querySelectorAll('[data-club-name]').forEach(el => {
    el.textContent = G.club;
  });
  const input = root.querySelector('#club-name-input');
  if (input) input.value = G.club;
}

/* ─────────────── Setup screen ─────────────── */

/**
 * Render the club-setup screen HTML string.
 * @returns {string}
 */
function renderSetup() {
  const designBtns = SHIELDS.map((sh, i) =>
    `<div class="design-item${i === G.setupDesign ? ' selected' : ''}" onclick="pickDesign(${i})">
      ${shieldSVG(i, G.setupColor, 44)}
      <div class="design-item-lbl">${sh.label}</div>
    </div>`
  ).join('');

  const colorSwatches = SHIELD_COLORS.map((c, i) =>
    `<div class="color-swatch${i === G.setupColor ? ' selected' : ''}" title="${c.name}"
      style="background:${c.p};border-color:${i === G.setupColor ? '#378ADD' : 'transparent'}"
      onclick="pickColor(${i})"></div>`
  ).join('');

  return `<div class="setup-screen">
    <div class="setup-title">⚽ Football Heritage</div>
    <div class="setup-sub">Funda tu club, elige tus colores y construye un legado.</div>

    <div class="setup-lbl">Nombre del club</div>
    <input id="club-name-input" class="setup-input" type="text" maxlength="30"
      placeholder="Ej: FC Villamora" />

    <div class="setup-lbl">Escudo — diseño</div>
    <div class="design-grid">${designBtns}</div>

    <div class="setup-lbl">Color del escudo</div>
    <div class="color-grid">${colorSwatches}</div>

    <div class="shield-preview-wrap">
      <div id="shield-preview">${shieldSVG(G.setupDesign, G.setupColor, 80)}</div>
    </div>

    <button class="start-btn" onclick="startGame()">Empezar legado →</button>
  </div>`;
}

/** Attach keyboard listener to the club-name input (Enter → start). */
function attachSetupListeners() {
  const input = document.getElementById('club-name-input');
  if (input) {
    input.addEventListener('keydown', e => { if (e.key === 'Enter') window.startGame(); });
  }
}

/**
 * Update only the shield preview and selection highlights without a full re-render.
 * Called by pickDesign / pickColor wrappers below.
 */
function renderSetupPreview() {
  const el = document.getElementById('shield-preview');
  if (el) el.innerHTML = shieldSVG(G.setupDesign, G.setupColor, 80);
  document.querySelectorAll('.design-item').forEach((el, i) =>
    el.classList.toggle('selected', i === G.setupDesign)
  );
  document.querySelectorAll('.color-swatch').forEach((el, i) =>
    el.classList.toggle('selected', i === G.setupColor)
  );
}

/* ─────────────── Setup interaction (exposed to window) ─────────────── */

/**
 * Handle shield design selection during club setup.
 * @param {number} i  Design index
 */
export function pickDesign(i) {
  _pickDesign(i);
  renderSetupPreview();
}

/**
 * Handle shield colour selection during club setup.
 * @param {number} i  Colour index
 */
export function pickColor(i) {
  _pickColor(i);
  renderSetupPreview();
}

/* ─────────────── Stats bar ─────────────── */

/**
 * Render the four-stat bar HTML string.
 * @returns {string}
 */
function renderStats() {
  const meta = [
    { k:'money', lbl:'👥 Afición',            fc:'f-money', nc:'n-money', tip:'Apoyo de socios y aficionados. Baja si pierdes derbis o subes precios.' },
    { k:'press', lbl:'📰 Relaciones Públicas', fc:'f-press', nc:'n-press', tip:'Imagen ante la prensa y la junta directiva.' },
    { k:'vest',  lbl:'⚽ Poder Deportivo',     fc:'f-vest',  nc:'n-vest',  tip:'Estado de la plantilla y resultados del equipo.' },
    { k:'power', lbl:'💰 Finanzas',            fc:'f-power', nc:'n-power', tip:'Dinero en caja del club.' }
  ];
  return `<div class="stats">${meta.map(m => {
    const v = G.stats[m.k];
    const danger = v < 20;
    const warn   = v < 40 && !danger;
    return `<div class="stat${danger ? ' stat-danger' : warn ? ' stat-warn' : ''}" title="${m.tip}">
      <div class="stat-lbl">${m.lbl}</div>
      <div class="stat-track"><div class="stat-fill ${m.fc}" style="width:${v}%"></div></div>
      <div class="stat-n ${m.nc}">${v}</div>
    </div>`;
  }).join('')}</div>`;
}

/* ─────────────── President selection screen ─────────────── */

/**
 * Render the president/manager selection screen HTML string.
 * @returns {string}
 */
function renderPresSelect() {
  return `<div class="top-bar">
    <div class="club-name-wrap">
      ${shieldSVG(G.shield.design, G.shield.color, 28)}
      <div class="club-name" data-club-name></div>
    </div>
    <div class="reign-info">Legado ${G.reign} · ${G.year}</div>
  </div>
  ${G.inherited ? `<div class="alert alert-warn">${G.inherited.msg}. El club sobrevive, pero las heridas pesan.</div>` : ''}
  ${renderStats()}
  ${G.motes.length ? `<div class="ach-bar">${G.motes.map(m =>
    `<span class="mote-badge">Legado ${m.reign}: ${m.pres} ${m.name}</span>`
  ).join('')}</div>` : ''}
  <div class="pres-pick">
    <div class="section-lbl">Elige tu nuevo técnico</div>
    <div class="pres-grid">${PRES_TYPES.map((p, i) =>
      `<button class="pres-btn" onclick="selectPres(${i})">
        <div class="pres-name">${p.name}</div>
        <div class="pres-desc">${p.desc}</div>
      </button>`
    ).join('')}</div>
  </div>`;
}

/* ─────────────── Main game screen ─────────────── */

/**
 * Render the main gameplay screen HTML string.
 * @returns {string}
 */
function renderGame() {
  const card = G.currentCard;
  const s    = G.stats;
  const alerts = [];
  if (s.money < 15) alerts.push({ cls:'alert-danger', msg:'👥 La afición te da la espalda. El estadio se vacía.' });
  if (s.press < 15) alerts.push({ cls:'alert-danger', msg:'📰 Las relaciones públicas están destrozadas.' });
  if (s.vest  < 15) alerts.push({ cls:'alert-warn',   msg:'⚽ El poder deportivo está en caída libre.' });
  if (s.power < 15) alerts.push({ cls:'alert-warn',   msg:'💰 Las finanzas del club están al límite.' });
  if (G.bombs.length > 0) alerts.push({ cls:'alert-info', msg:'⚠️ Alguna decisión pasada puede volver a golpearte...' });

  // Blatter progress hints
  const blatReqs = [
    G.titles.length >= 2 ? null : `${G.titles.length}/2 títulos europeos`,
    G.reign >= 3 ? null : `Legado ${G.reign}/3`,
    s.power > 55 ? null : `💰 Finanzas ${s.power}/55`,
    s.money > 45 ? null : `👥 Afición ${s.money}/45`
  ].filter(Boolean);
  if (blatReqs.length > 0) {
    alerts.push({ cls:'alert-info', msg:'⚔️ Para enfrentar a Blatter necesitas: ' + blatReqs.join(' · ') });
  }

  // Leyenda del Club progress
  const highTurns = G.highStatTurns || 0;
  if (highTurns > 0 && highTurns < 5) {
    alerts.push({ cls:'alert-info', msg:`🏆 ¡Todos los indicadores al máximo! ${highTurns}/5 turnos consecutivos para la Leyenda del Club.` });
  }

  const achUnlocked = ACHIEVEMENTS.filter(a => G.achievements.includes(a.id));

  return `<div class="top-bar">
    <div class="club-name-wrap">
      ${shieldSVG(G.shield.design, G.shield.color, 28)}
      <div class="club-name" data-club-name></div>
    </div>
    <div class="reign-info">Semana ${G.turns + 1} · Legado ${G.reign} · ${G.year}</div>
  </div>
  <div class="game-layout">
    <div class="game-left">
      ${card ? `
      <div class="card-swipe-outer">
        <div id="card-swipe-wrap" class="card-swipe-wrap">
          <div class="swipe-hint swipe-hint-left"  id="hint-left">← ${card.b.label}</div>
          <div class="swipe-hint swipe-hint-right" id="hint-right">${card.a.label} →</div>
          <div class="ev-card" id="ev-card-inner">
            <div class="card-cat" style="color:${catColor(card.cat)}">${catLabel(card.cat)}</div>
            <div class="card-title">${card.title}</div>
            <div class="card-desc">${card.desc}</div>
            <div class="card-fx-preview">
              <div class="card-fx-option">${renderFxPreview(card.b.fx, '←')}</div>
              <div class="card-fx-option card-fx-right">${renderFxPreview(card.a.fx, '→')}</div>
            </div>
            <div class="card-meta"><span>${G.year}</span><span>Legado ${G.reign} · ${G.pres.name}</span></div>
          </div>
        </div>
      </div>
      <div class="swipe-actions">
        <div class="sw-hint">
          <div class="sw-arrow">← Desliza izquierda</div>
          <div class="sw-label">${card.b.label}</div>
        </div>
        <div class="sw-hint sw-hint-right">
          <div class="sw-arrow">Desliza derecha →</div>
          <div class="sw-label">${card.a.label}</div>
        </div>
      </div>` : ''}
    </div>
    <div class="game-right">
      ${G.titles.length ? `<div class="titles">${G.titles.map(t => `<span class="t-badge">🏆 ${t}</span>`).join('')}</div>` : ''}
      ${achUnlocked.length ? `<div class="ach-bar">${achUnlocked.map(a => `<span class="ach-badge">${a.icon} ${a.name}</span>`).join('')}</div>` : ''}
      ${renderStats()}
      ${alerts.map(a => `<div class="alert ${a.cls}">${a.msg}</div>`).join('')}
      <div class="counter">Turno ${G.turns + 1} · Legado ${G.reign} · ${G.pres.name}</div>
    </div>
  </div>`;
}

/* ─────────────── Card effect preview ─────────────── */

/**
 * Render a compact preview row showing how a card option affects each stat.
 * @param {Object} fx   Effect map {money, press, vest, power}
 * @param {string} dir  Direction label ('←' or '→')
 * @returns {string}
 */
function renderFxPreview(fx, dir) {
  const items = [
    { k:'money', emoji:'👥' },
    { k:'press', emoji:'📰' },
    { k:'vest',  emoji:'⚽' },
    { k:'power', emoji:'💰' }
  ];
  const tags = items
    .filter(i => fx[i.k] !== undefined && fx[i.k] !== 0)
    .map(i => {
      const v = fx[i.k];
      const cls = v > 0 ? 'fx-up' : 'fx-down';
      const sign = v > 0 ? '+' : '';
      return `<span class="${cls}">${i.emoji}${sign}${v}</span>`;
    });
  if (tags.length === 0) return '';
  return `<span class="fx-dir">${dir}</span> ${tags.join(' ')}`;
}

/* ─────────────── End screen ─────────────── */

/**
 * Render the game-over / end screen HTML string.
 * @returns {string}
 */
function renderEnd() {
  const types = {
    legend:    { emoji:'🏆', title:'¡Leyenda del Club! Los cuatro indicadores en máximo nivel durante 5 turnos' },
    blatter:   { emoji:'⚔️', title:'¡Blatter ha caído! El fútbol es libre' },
    collapse:  { emoji:'🪦', title:'El club ha desaparecido para siempre' },
    fans:      { emoji:'👥', title:'Moción de censura – el estadio vacío te expulsó' },
    scandal:   { emoji:'📰', title:'Escándalo mediático insostenible' },
    relegated: { emoji:'⚽', title:'Descenso deportivo – el equipo fue desmantelado' },
    bankrupt:  { emoji:'💸', title:'Quiebra del club – administración judicial' },
    // legacy compat
    fired:     { emoji:'📉', title:'Destituido sin remisión' },
    resign:    { emoji:'📉', title:'Destituido sin remisión' }
  };
  const t = types[G.endType] || types.fired;
  const rows = G.history.slice(-10).map(h =>
    `<div class="hist-row">Legado ${h.reign} (${h.year}) · ${h.pres} · ${h.txt}</div>`
  ).join('');

  const achUnlocked = ACHIEVEMENTS.filter(a => G.achievements.includes(a.id));

  return `<div class="end-scr">
    ${shieldSVG(G.shield.design, G.shield.color, 64)}
    <div class="end-emoji">${t.emoji}</div>
    <div class="end-title">${t.title}</div>
    <div class="end-sub"><span data-club-name></span> · ${G.year}<br>${G.reign} legados · ${G.titles.length ? G.titles.join(', ') : 'Ningún título europeo'}</div>

    ${G.motes.length ? `
    <div class="end-section-lbl">Apodos ganados</div>
    <div style="margin-bottom:0.75rem;text-align:left">${G.motes.map(m =>
      `<span class="mote-badge">Legado ${m.reign}: ${m.pres} ${m.name}</span>`
    ).join('')}</div>` : ''}

    ${achUnlocked.length ? `
    <div class="end-section-lbl">Logros desbloqueados</div>
    <div style="margin-bottom:0.75rem;text-align:left">${achUnlocked.map(a =>
      `<span class="ach-badge">${a.icon} ${a.name}</span>`
    ).join(' ')}</div>` : ''}

    <div class="end-section-lbl">Últimas decisiones</div>
    <div class="hist-box">${rows}</div>
    <button class="rst-btn" onclick="restart()">Nueva dinastía</button>
  </div>`;
}

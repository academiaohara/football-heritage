/**
 * main.js – Entry point and orchestration
 *
 * Responsibilities:
 *  1. Register the render callback so game.js can trigger re-renders without
 *     importing ui.js (avoids a circular dependency).
 *  2. Expose interactive functions to the global window object so that the
 *     inline onclick handlers in HTML templates can reach them.
 *  3. Restore any saved game state, then kick off the first render.
 */

import { render, pickDesign, pickColor } from './ui.js';
import {
  setRenderCallback,
  loadState,
  choose, restart, selectPres, startGame
} from './game.js';

/* ── 1. Wire render callback ── */
setRenderCallback(render);

/* ── 2. Expose interactive functions to the global scope ──
   Required because template strings use plain onclick="fnName(...)" attributes
   which look up names on window, not in module scope. */
window.choose      = choose;
window.restart     = restart;
window.selectPres  = selectPres;
window.startGame   = startGame;
window.pickDesign  = pickDesign;
window.pickColor   = pickColor;

/* ── 3. Restore saved state (if any) and render ── */
loadState();
render();

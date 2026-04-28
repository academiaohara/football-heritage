/**
 * swipe.js – Touch/pointer drag-and-swipe card interactions
 *
 * Exports:
 *   attachSwipeListeners – attach pointer events to the current card element
 */

import { DRAG, choose } from './game.js';

/* ─────────────── Listener attachment ─────────────── */

/**
 * Attach pointer-event listeners to the #card-swipe-wrap element.
 * Safe to call every time a new card is rendered.
 */
export function attachSwipeListeners() {
  const wrap = document.getElementById('card-swipe-wrap');
  if (!wrap) return;

  wrap.addEventListener('pointerdown',   onDragStart,  { passive: false });
  wrap.addEventListener('pointermove',   onDragMove,   { passive: false });
  wrap.addEventListener('pointerup',     onDragEnd,    { passive: false });
  wrap.addEventListener('pointercancel', onDragCancel);
}

/* ─────────────── Pointer event handlers ─────────────── */

/**
 * Handle the start of a drag interaction.
 * @param {PointerEvent} e
 */
function onDragStart(e) {
  if (DRAG.locked) return;
  e.preventDefault();
  DRAG.active   = true;
  DRAG.startX   = e.clientX;
  DRAG.currentX = e.clientX;

  const wrap = document.getElementById('card-swipe-wrap');
  if (wrap) {
    try {
      wrap.setPointerCapture(e.pointerId);
    } catch (_) {
      DRAG.active = false;
      return;
    }
    wrap.classList.add('is-dragging');
    const card = document.getElementById('ev-card-inner');
    if (card) card.style.transition = 'none';
  }
}

/**
 * Handle pointer movement during a drag.
 * @param {PointerEvent} e
 */
function onDragMove(e) {
  if (!DRAG.active) return;
  e.preventDefault();
  DRAG.currentX = e.clientX;
  updateCardDrag();
}

/**
 * Handle the end of a drag; decide whether to commit or snap back.
 * @param {PointerEvent} e
 */
function onDragEnd(e) {
  if (!DRAG.active) return;
  DRAG.active = false;
  const dx   = DRAG.currentX - DRAG.startX;
  const wrap = document.getElementById('card-swipe-wrap');
  if (wrap) wrap.classList.remove('is-dragging');

  if (Math.abs(dx) >= DRAG.threshold) {
    DRAG.locked = true;
    const goRight = dx > 0;
    animateCardOut(goRight ? 'right' : 'left', goRight ? 0 : 1);
  } else {
    snapBack();
  }
}

/** Cancel the drag and snap the card back to its resting position. */
function onDragCancel() {
  DRAG.active = false;
  snapBack();
}

/* ─────────────── Visual helpers ─────────────── */

/** Apply transform and hint-opacity based on current drag offset. */
function updateCardDrag() {
  const card  = document.getElementById('ev-card-inner');
  const hintR = document.getElementById('hint-right');
  const hintL = document.getElementById('hint-left');
  if (!card) return;

  const dx  = DRAG.currentX - DRAG.startX;
  const rot = dx * 0.08;
  card.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;

  const pct = Math.min(Math.abs(dx) / DRAG.threshold, 1);
  if (hintR) hintR.style.opacity = dx > 0 ? pct : 0;
  if (hintL) hintL.style.opacity = dx < 0 ? pct : 0;
}

/** Animate the card back to its neutral position. */
function snapBack() {
  const wrap  = document.getElementById('card-swipe-wrap');
  const card  = document.getElementById('ev-card-inner');
  const hintR = document.getElementById('hint-right');
  const hintL = document.getElementById('hint-left');

  if (wrap) wrap.classList.add('snap-back');
  if (card) {
    card.style.transition = 'transform 0.35s cubic-bezier(.25,.8,.25,1)';
    card.style.transform  = '';
  }
  if (hintR) hintR.style.opacity = 0;
  if (hintL) hintL.style.opacity = 0;
  setTimeout(() => { if (wrap) wrap.classList.remove('snap-back'); }, 400);
}

/**
 * Animate the card flying off-screen, then commit the choice.
 * @param {'left'|'right'} dir    Direction of the swipe
 * @param {number}         choiceIdx  0 = option A, 1 = option B
 */
function animateCardOut(dir, choiceIdx) {
  const card = document.getElementById('ev-card-inner');
  if (card) {
    card.style.transition = 'transform 0.3s ease-in, opacity 0.3s ease-in';
    const tx = dir === 'right' ? 340 : -340;
    card.style.transform  = `translateX(${tx}px) rotate(${dir === 'right' ? 18 : -18}deg)`;
    card.style.opacity    = '0';
  }
  setTimeout(() => {
    DRAG.locked = false;
    choose(choiceIdx);
  }, 300);
}

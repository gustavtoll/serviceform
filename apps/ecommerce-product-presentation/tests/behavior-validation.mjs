import assert from 'node:assert/strict';

function createElement() {
  const listeners = new Map();
  return {
    hidden: false,
    disabled: false,
    attributes: new Map(),
    classList: { toggle() {} },
    style: {},
    addEventListener(type, listener) { listeners.set(type, listener); },
    click() { listeners.get('click')?.(); },
    focus() { globalThis.document.activeElement = this; },
    setAttribute(name, value) { this.attributes.set(name, value); },
    getAttribute(name) { return this.attributes.get(name); },
  };
}

const slides = Array.from({ length: 9 }, createElement);
const previous = createElement();
const next = createElement();
previous.tagName = 'BUTTON';
next.tagName = 'BUTTON';
const counter = createElement();
const progress = createElement();
let keydown;

globalThis.document = {
  activeElement: null,
  querySelectorAll(selector) { return selector === '.slide' ? slides : []; },
  querySelector(selector) {
    return { '#previous': previous, '#next': next, '#counter': counter, '#progress': progress }[selector] ?? null;
  },
  addEventListener(type, listener) { if (type === 'keydown') keydown = listener; },
};

await import(`../src/main.js?behavior-test=${Date.now()}`);

function visibleIndices() {
  return slides.flatMap((slide, index) => (slide.hidden ? [] : [index]));
}

function assertActiveSlide(index) {
  assert.deepEqual(visibleIndices(), [index]);
  assert.equal(slides[index].getAttribute('aria-hidden'), 'false');
  assert.equal(globalThis.document.activeElement, slides[index]);
}

function keyEvent(key, target) {
  let prevented = false;
  keydown({ key, target, preventDefault() { prevented = true; } });
  return prevented;
}

assertActiveSlide(0);
next.click();
assertActiveSlide(1);
assert.equal(keyEvent(' ', previous), false, 'Space on a focused button must retain native button behavior');
previous.click();
assertActiveSlide(0);
assert.equal(keyEvent('ArrowRight', slides[0]), true);
assertActiveSlide(1);
assert.equal(keyEvent('End', slides[1]), true);
assertActiveSlide(8);
assert.equal(keyEvent('Home', slides[8]), true);
assertActiveSlide(0);

console.log('e-commerce product presentation behavior validation passed');

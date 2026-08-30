import { createLocalSignupEnvelope } from './integration.js';

const form = document.querySelector('#partner-form');
const email = document.querySelector('#email');
const confirmation = document.querySelector('#confirmation');
const error = document.querySelector('#form-error');
const signupCard = document.querySelector('.signup-card');
const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'referral_code', 'parent_sales_partner_id'];
const params = new URLSearchParams(location.search);
const attribution = Object.fromEntries(attributionKeys.map((key) => [key, params.get(key) || '']));

function setError(message = '') {
  error.textContent = message;
  email.setAttribute('aria-invalid', message ? 'true' : 'false');
}

email.addEventListener('input', () => {
  if (email.validity.valid) setError();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  setError();

  if (email.validity.valueMissing) {
    setError('Enter your email address to continue.');
    email.focus();
    return;
  }
  if (email.validity.typeMismatch) {
    setError('Enter a complete email address, such as you@yourcompany.com.');
    email.focus();
    return;
  }

  const envelope = createLocalSignupEnvelope(email.value, attribution);
  const reference = `SP-${Date.now().toString(36).toUpperCase()}`;
  localStorage.setItem('serviceform_sales_partner_signup_preview', JSON.stringify({ reference, ...envelope }));
  document.querySelector('#reference').textContent = reference;
  signupCard.hidden = true;
  confirmation.hidden = false;
  confirmation.focus();
});

document.querySelector('#reset-form').addEventListener('click', () => {
  form.reset();
  setError();
  confirmation.hidden = true;
  signupCard.hidden = false;
  email.focus();
});

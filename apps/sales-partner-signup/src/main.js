import { createPilotPayload, submitPilotApplication } from './integration.js';

const form = document.querySelector('#partner-form');
const email = document.querySelector('#email');
const consent = document.querySelector('#terms-consent');
const website = form.elements.website;
const confirmation = document.querySelector('#confirmation');
const error = document.querySelector('#form-error');
const signupCard = document.querySelector('.signup-card');
const submitButton = document.querySelector('#submit-button');

function setError(message = '') {
  error.textContent = message;
  email.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function setSubmitting(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.setAttribute('aria-busy', String(isSubmitting));
  if (isSubmitting) submitButton.textContent = 'Submitting your pilot application…';
  else submitButton.innerHTML = 'Create my Sales Partner account <span aria-hidden="true">→</span>';
}

email.addEventListener('input', () => {
  if (email.validity.valid) setError();
});

form.addEventListener('submit', async (event) => {
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
  if (!consent.checked) {
    setError('Confirm consent so Serviceform can process this pilot application.');
    consent.focus();
    return;
  }

  setSubmitting(true);
  try {
    const result = await submitPilotApplication(createPilotPayload({ email: email.value, termsConsent: consent.checked, website: website.value }));
    document.querySelector('#reference').textContent = result.requestId;
    signupCard.hidden = true;
    confirmation.hidden = false;
    confirmation.focus();
  } catch (submissionError) {
    setError(submissionError.message || 'We could not submit the pilot application. Please try again later.');
  } finally {
    setSubmitting(false);
  }
});

document.querySelector('#reset-form').addEventListener('click', () => {
  form.reset();
  setError();
  confirmation.hidden = true;
  signupCard.hidden = false;
  email.focus();
});

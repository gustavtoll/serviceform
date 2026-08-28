import { createApplicationEnvelope } from './integration.js';

const form = document.querySelector('#partner-form');
const confirmation = document.querySelector('#confirmation');
const error = document.querySelector('#form-error');
const params = new URLSearchParams(location.search);
const attributionFields = ['utm_source','utm_medium','utm_campaign','utm_content','referral_code','parent_sales_partner_id'];

const attribution = Object.fromEntries(attributionFields.map((field) => [field, params.get(field) || '']));
attributionFields.forEach((field) => { form.elements[field].value = attribution[field]; });

form.addEventListener('submit', (event) => {
  event.preventDefault(); error.textContent = '';
  if (!form.checkValidity()) {
    error.textContent = 'Please complete every required field and provide a valid email and URL.';
    form.reportValidity(); return;
  }
  const raw = Object.fromEntries(new FormData(form));
  raw.terms_consent = form.elements.terms_consent.checked;
  const applicant = Object.fromEntries(Object.entries(raw).filter(([key]) => !attributionFields.includes(key)));
  const envelope = createApplicationEnvelope(applicant, attribution);
  const reference = `SP-${Date.now().toString(36).toUpperCase()}`;
  localStorage.setItem('serviceform_sales_partner_application', JSON.stringify({ reference, ...envelope }));
  document.querySelector('#reference').textContent = reference;
  form.hidden = true; confirmation.hidden = false; confirmation.focus();
});

document.querySelector('#reset-form').addEventListener('click', () => {
  form.reset(); attributionFields.forEach((field) => { form.elements[field].value = attribution[field]; });
  confirmation.hidden = true; form.hidden = false; form.querySelector('input').focus();
});

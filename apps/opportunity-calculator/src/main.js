import { calculateScenario, normaliseScenario } from './calculator.js';

const ids = ['traffic', 'interaction', 'leadRate', 'revenue', 'closeRate'];
const inputs = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const validationSummary = document.getElementById('validation-summary');

const presets = {
  low: [400000, 7, 5, 300, 5],
  high: [400000, 10, 15, 300, 10],
};

function currentScenario() {
  return Object.fromEntries(ids.map((id) => [id, inputs[id].value]));
}

function updateValidation(invalidFields) {
  ids.forEach((id) => inputs[id].setAttribute('aria-invalid', String(invalidFields.includes(id))));

  if (invalidFields.length === 0) {
    validationSummary.textContent = '';
    return;
  }

  const labels = invalidFields.map((id) => document.querySelector(`label[for="${id}"]`).firstChild.textContent.trim());
  validationSummary.textContent = `${labels.join(', ')} ${labels.length === 1 ? 'is' : 'are'} outside the accepted range. The calculation uses zero for negative or invalid values and 100% as the maximum rate until corrected.`;
}

function calculate() {
  const scenario = currentScenario();
  const { values, invalidFields } = normaliseScenario(scenario);
  const { chats, leads, potential, opportunity } = calculateScenario(values);

  document.querySelector('#chats').textContent = integer.format(chats);
  document.querySelector('#leads').textContent = integer.format(leads);
  document.querySelector('#potential').textContent = money.format(potential);
  document.querySelector('#opportunity').textContent = money.format(opportunity);
  document.querySelector('#formula').textContent = `${integer.format(values.traffic)} × ${values.interaction}% × ${values.leadRate}% × ${money.format(values.revenue)} × ${values.closeRate}%`;
  updateValidation(invalidFields);
}

document.querySelectorAll('[data-preset]').forEach((button) => {
  button.addEventListener('click', () => {
    ids.forEach((id, index) => { inputs[id].value = presets[button.dataset.preset][index]; });
    calculate();
    inputs.traffic.focus();
  });
});

ids.forEach((id) => inputs[id].addEventListener('input', calculate));
calculate();

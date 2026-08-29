const ids = ['traffic', 'interaction', 'leadRate', 'revenue', 'closeRate'];
const inputs = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const safe = (input) => Math.max(0, Number(input.value) || 0);
function calculate() {
  const traffic = safe(inputs.traffic); const interaction = safe(inputs.interaction) / 100;
  const leadRate = safe(inputs.leadRate) / 100; const revenue = safe(inputs.revenue); const closeRate = safe(inputs.closeRate) / 100;
  const chats = traffic * interaction; const leads = chats * leadRate; const potential = leads * revenue; const opportunity = potential * closeRate;
  document.querySelector('#chats').textContent = integer.format(chats); document.querySelector('#leads').textContent = integer.format(leads);
  document.querySelector('#potential').textContent = money.format(potential); document.querySelector('#opportunity').textContent = money.format(opportunity);
  document.querySelector('#formula').textContent = `${integer.format(traffic)} × ${interaction * 100}% × ${leadRate * 100}% × ${money.format(revenue)} × ${closeRate * 100}%`;
}
const presets = { low: [400000, 7, 5, 300, 5], high: [400000, 10, 15, 300, 10] };
document.querySelectorAll('[data-preset]').forEach((button) => button.addEventListener('click', () => { ids.forEach((id, i) => { inputs[id].value = presets[button.dataset.preset][i]; }); calculate(); inputs.traffic.focus(); }));
ids.forEach((id) => inputs[id].addEventListener('input', calculate)); calculate();

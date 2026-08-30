import assert from 'node:assert/strict';
import { calculateScenario, normaliseScenario } from '../src/calculator.js';

const formattedNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const formattedMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

{
  const result = calculateScenario({
    traffic: 400000,
    interaction: 7,
    leadRate: 5,
    revenue: 300,
    closeRate: 5,
  });

  assert.deepEqual(result, {
    chats: 28000,
    leads: 1400,
    potential: 420000,
    opportunity: 21000,
  });
}

{
  const scenario = normaliseScenario({
    traffic: '-10',
    interaction: '125',
    leadRate: 'not-a-number',
    revenue: '-20',
    closeRate: '101',
  });

  assert.deepEqual(scenario.values, {
    traffic: 0,
    interaction: 100,
    leadRate: 0,
    revenue: 0,
    closeRate: 100,
  });
  assert.deepEqual(scenario.invalidFields, ['traffic', 'interaction', 'leadRate', 'revenue', 'closeRate']);
}

{
  const result = calculateScenario({
    traffic: 100,
    interaction: 100,
    leadRate: 100,
    revenue: 50,
    closeRate: 100,
  });

  assert.equal(formattedNumber.format(result.chats), '100');
  assert.equal(formattedMoney.format(result.potential), '$5,000');
  assert.equal(formattedMoney.format(result.opportunity), '$5,000');
}

console.log('calculator behavior validation passed');

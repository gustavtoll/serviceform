const percentageFields = new Set(['interaction', 'leadRate', 'closeRate']);

function numberFrom(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function normaliseScenario(scenario) {
  const invalidFields = [];
  const values = Object.fromEntries(Object.entries(scenario).map(([field, rawValue]) => {
    const parsed = Number(rawValue);
    const lowerBounded = Math.max(0, numberFrom(rawValue));
    const value = percentageFields.has(field) ? Math.min(100, lowerBounded) : lowerBounded;

    if (!Number.isFinite(parsed) || parsed < 0 || (percentageFields.has(field) && parsed > 100)) {
      invalidFields.push(field);
    }

    return [field, value];
  }));

  return { values, invalidFields };
}

const stable = (value) => Math.round((value + Number.EPSILON) * 1e10) / 1e10;

export function calculateScenario(scenario) {
  const { values } = normaliseScenario(scenario);
  const chats = stable(values.traffic * (values.interaction / 100));
  const leads = stable(chats * (values.leadRate / 100));
  const potential = stable(leads * values.revenue);
  const opportunity = stable(potential * (values.closeRate / 100));

  return { chats, leads, potential, opportunity };
}

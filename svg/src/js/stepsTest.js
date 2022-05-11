const stepsTest = function* (steps = [], job) {
  for (let i = 0, n = steps.length; i < n; i++) {
    yield job(steps[i]);
  }

  return undefined;
};

export {
  stepsTest,
}
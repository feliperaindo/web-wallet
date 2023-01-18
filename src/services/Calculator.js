export function conversor(expense, rate) {
  return Number(expense) * Number(rate);
}

export function calculatorFunction(expenses) {
  return expenses.reduce((total, expense) => {
    const { value, exchangeRates, currency } = expense;
    return total + conversor(value, exchangeRates[currency].ask);
  }, 0).toFixed(2);
}

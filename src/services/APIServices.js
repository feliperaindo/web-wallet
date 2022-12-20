const URL = 'https://economia.awesomeapi.com.br/json/all';

export async function requestCurrencies() {
  const request = await fetch(URL);
  const currencies = await request.json();
  return currencies;
}

export function filterCurrencies(currencies) {
  const getKeys = Object.keys(currencies);
  return getKeys.reduce((obj, currencyCode) => ((currencyCode !== 'USDT')
    ? { ...obj, [currencyCode]: currencies[currencyCode] }
    : obj), {});
}

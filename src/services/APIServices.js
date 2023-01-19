import { addCurrencies, addFullNameCurrencies } from '../redux/actions';

const URL = 'https://economia.awesomeapi.com.br/json/all';

export function removeUSDT(currencies) {
  const getKeys = Object.keys(currencies);
  return getKeys.reduce((obj, currencyCode) => ((currencyCode !== 'USDT')
    ? { ...obj, [currencyCode]: currencies[currencyCode] }
    : obj), {});
}

export function getFullNameCurrencies(allCurrencies, listOfCurrencies) {
  const nameCurrencies = listOfCurrencies.reduce((info, currency) => (
    { ...info, [currency]: allCurrencies[currency].name }), {});
  return nameCurrencies;
}

export async function requestCurrencies() {
  try {
    const request = await fetch(URL);
    const currencies = await request.json();
    return currencies;
  } catch (error) {
    return error;
  }
}

export async function allCurrenciesDataRequisition(dispatch) {
  const allCurrenciesFromAPI = await requestCurrencies();
  const currenciesArray = Object.keys(removeUSDT(allCurrenciesFromAPI));
  const currenciesFullNames = getFullNameCurrencies(
    allCurrenciesFromAPI,
    currenciesArray,
  );
  dispatch(addCurrencies(currenciesArray));
  dispatch(addFullNameCurrencies(currenciesFullNames));
}

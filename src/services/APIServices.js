import { addCurrencies, addFullNameCurrencies } from '../redux/actions';

const URL = 'https://economia.awesomeapi.com.br/json/all';

function removeUSDT(currencies) {
  const getKeys = Object.keys(currencies);
  return getKeys.reduce((obj, currencyCode) => ((currencyCode !== 'USDT')
    ? { ...obj, [currencyCode]: currencies[currencyCode] }
    : obj), {});
}

function getFullNameCurrencies(allCurrencies, listOfCurrencies) {
  const importantInfo = listOfCurrencies.reduce((info, currency) => (
    { ...info, currency: allCurrencies[currency].name }), {});
  return importantInfo;
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
  const allCurrencies = await requestCurrencies();
  const listOfCurrencies = removeUSDT(allCurrencies);
  const infoCurrencies = getFullNameCurrencies(allCurrencies, listOfCurrencies);
  dispatch(addCurrencies(Object.keys(listOfCurrencies)));
  dispatch(addFullNameCurrencies(infoCurrencies));
}

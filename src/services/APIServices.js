import { addCurrencies, addFullNameCurrencies, addExpense } from '../redux/actions';

const URL = 'https://economia.awesomeapi.com.br/json/all';

function removeUSDT(currencies) {
  const getKeys = Object.keys(currencies);
  return getKeys.reduce((obj, currencyCode) => ((currencyCode !== 'USDT')
    ? { ...obj, [currencyCode]: currencies[currencyCode] }
    : obj), {});
}

function getFullNameCurrencies(allCurrencies, listOfCurrencies) {
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
  const allCurrencies = await requestCurrencies();
  const listOfCurrencies = Object.keys(removeUSDT(allCurrencies));
  const infoCurrencies = getFullNameCurrencies(allCurrencies, listOfCurrencies);
  dispatch(addCurrencies(listOfCurrencies));
  dispatch(addFullNameCurrencies(infoCurrencies));
}

export const saveExpense = async (dispatch, newExpense) => {
  const actualQuotation = await requestCurrencies();
  newExpense.exchangeRates = { ...actualQuotation };
  dispatch(addExpense(newExpense));
};

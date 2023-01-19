import mockData from '../../components/mock/mockData';
import { VALUES_TO_TEST } from '../../components/mock/values';

function expenseConstructor(position, id) {
  return {
    value: VALUES_TO_TEST[position].CashValue,
    description: VALUES_TO_TEST[position],
    currency: VALUES_TO_TEST[position],
    method: VALUES_TO_TEST[position],
    tag: VALUES_TO_TEST[position],
    id,
    exchangeRates: mockData,
  };
}

export default expenseConstructor;

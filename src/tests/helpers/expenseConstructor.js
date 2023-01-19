import mockData from '../../components/mock/mockData';
import { VALUES_TO_TEST } from '../../components/mock/values';

function expenseConstructor(position, id) {
  return {
    value: VALUES_TO_TEST[position].CashValue.toString(),
    description: VALUES_TO_TEST[position].DescriptionValue,
    currency: VALUES_TO_TEST[position].CurrencyValue,
    method: VALUES_TO_TEST[position].PaymentValue,
    tag: VALUES_TO_TEST[position].TagValue,
    id,
    exchangeRates: mockData,
  };
}

export default expenseConstructor;

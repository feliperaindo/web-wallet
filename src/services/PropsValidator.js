import PropTypes from 'prop-types';

export const nameCurrencyValidator = PropTypes.shape({
  USD: PropTypes.string,
  CAD: PropTypes.string,
  EUR: PropTypes.string,
  GBP: PropTypes.string,
  ARS: PropTypes.string,
  BTC: PropTypes.string,
  LTC: PropTypes.string,
  JPY: PropTypes.string,
  CHF: PropTypes.string,
  AUD: PropTypes.string,
  CNY: PropTypes.string,
  ILS: PropTypes.string,
  ETH: PropTypes.string,
  XRP: PropTypes.string,
});

export const exchangeRates = PropTypes.shape({
  USD: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  USDT: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  CAD: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  EUR: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  GBP: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  ARS: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  BTC: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  LTC: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  JPY: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  CHF: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  AUD: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  CNY: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  ILS: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  ETH: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  XRP: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
  DOGE: PropTypes.shape({
    code: PropTypes.string,
    codein: PropTypes.string,
    name: PropTypes.string,
    high: PropTypes.string,
    low: PropTypes.string,
    varBid: PropTypes.string,
    pctChange: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    timestamp: PropTypes.string,
    create_date: PropTypes.string,
  }),
});

export const expensesValidator = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  valueInput: PropTypes.string,
  descriptionInput: PropTypes.string,
  currencyInput: PropTypes.string,
  paymentMethod: PropTypes.string,
  tag: PropTypes.string,
  exchangeRates,
}));

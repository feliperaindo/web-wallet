import { waitFor } from '@testing-library/react';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { captureWalletElements } from './helpers/captureElements';
import { fillCurrency, fillInputs } from './helpers/PagesInteractions';

import fetchMock from '../mock/fetchMock';
import { URL, VALUES_TO_TEST } from '../mock/values';
import { INITIAL_STATE, WALLET_GLOBAL_STORE, EMAIL_GLOBAL_STORE } from '../mock/mockGlobalState';

import Wallet from '../pages/Wallet';

describe('Sequência de testes relacionadas à estrutura do Redux e do Router da página `Wallet.jsx`', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a página renderiza na rota `/carteira`', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);
    expect(history.location.pathname).toBe('/carteira');
  });

  test('Verifica se a página renderiza a store correta', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);
    expect(store.getState()).toEqual(EMAIL_GLOBAL_STORE);
  });

  test('Verifica se a requisição é realizada no momento em que o componente é renderizado', async () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(URL);
    });
  });

  test('Verifica se é populado o estado global após a requisição', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    await waitFor(
      () => expect(store.getState()).toEqual(WALLET_GLOBAL_STORE),
      { timeout: 3000 },
    );
  });
});

describe('Sequência de testes relacionada à renderização de componentes da página `Wallet.jsx` ao carregar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se é renderizado o <Header /> na página <Wallet />', () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    const inputs = captureWalletElements();

    expect(inputs.Email).toBeInTheDocument();
    expect(inputs.CashValue).toBeInTheDocument();
    expect(inputs.CurrencyName).toBeInTheDocument();
    expect(inputs.Email).toHaveTextContent(WALLET_GLOBAL_STORE.user.email);
    expect(inputs.CurrencyName).toHaveTextContent('BRL');
    expect(inputs.CashValue).toHaveTextContent('0.00');
  });

  test('Verifica se é renderizado o <WalletForm /> na página <Wallet />', async () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    const inputs = captureWalletElements();

    expect(inputs.ValueInput).toBeInTheDocument();
    expect(inputs.DescriptionInput).toBeInTheDocument();
    expect(inputs.CurrencyInput).toBeInTheDocument();
    expect(inputs.PaymentInput).toBeInTheDocument();
    expect(inputs.TagInput).toBeInTheDocument();
    expect(inputs.ButtonAdd).toBeInTheDocument();

    await waitFor(() => {
      expect(inputs.CurrencyInput).toHaveValue('USD');
      expect(inputs.PaymentInput).toHaveValue('Dinheiro');
      expect(inputs.TagInput).toHaveValue('Alimentação');
    });
  });

  test('Verifica se é renderizado o <Table /> na página <Wallet />', () => {
    const columnsNames = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    const inputs = captureWalletElements();

    expect(inputs.Table).toBeInTheDocument();
    expect(inputs.Table.firstChild.tagName).toBe('THEAD');
    expect(inputs.Table.lastChild.tagName).toBe('TBODY');
    expect(inputs.Table.lastChild.childNodes).toHaveLength(0);
    expect(inputs.Table.firstChild.childNodes[0].tagName).toBe('TR');
    expect(inputs.Table.firstChild.childNodes[0].childNodes).toHaveLength(9);

    inputs.THs.forEach((eachTH, index) => {
      expect(eachTH.tagName).toBe('TH');
      expect(eachTH).toHaveTextContent(columnsNames[index]);
    });
  });

  test('Verifica se os inputs poder receber valores adicionados pelo usuário', async () => {
    const { first: { CashValue, DescriptionValue,
      CurrencyValue, PaymentValue, TagValue } } = VALUES_TO_TEST;

    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    const inputs = captureWalletElements();
    fillInputs('first', inputs);

    expect(inputs.ValueInput).toHaveValue(CashValue);
    expect(inputs.DescriptionInput).toHaveValue(DescriptionValue);
    expect(inputs.PaymentInput).toHaveValue(PaymentValue);
    expect(inputs.TagInput).toHaveValue(TagValue);

    await fillCurrency('first', inputs);
    expect(inputs.CurrencyInput).toHaveValue(CurrencyValue);
  });
});

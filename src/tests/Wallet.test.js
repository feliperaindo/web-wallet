import { screen, act, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

import fetchMock from '../components/mock/fetchMock';
import { currenciesFullNames,
  expectedEmptyGlobalStore,
  expectedFullGlobalStore } from '../components/mock/mockGlobalState';

const CAPTURE_INPUTS = {
  ValueInput: screen.getByTestId(INPUTS_IDS_NAMES.valueInput),
  DescriptionInput: screen.getByTestId(INPUTS_IDS_NAMES.descriptionInput),
  CurrencyInput: screen.getByTestId(INPUTS_IDS_NAMES.currencyInput),
  PaymentInput: screen.getByTestId(INPUTS_IDS_NAMES.paymentInput),
  TagInput: screen.getByTestId(INPUTS_IDS_NAMES.tagInput),
  Email: screen.getByTestId(INPUTS_IDS_NAMES.email),
  CurrencyName: screen.getByTestId(INPUTS_IDS_NAMES.currency),
  CashValue: screen.getByTestId(INPUTS_IDS_NAMES.cash),
  Table: screen.getByRole(INPUTS_IDS_NAMES.table),
  THs: screen.getAllByRole(INPUTS_IDS_NAMES.th),
  ButtonAdd: screen.getByRole('button', { name: /adicionar despesa/i }),
};

function fillInputs(position) {
  const { [position]: {
    CashValue,
    DescriptionValue,
    PaymentValue,
    TagValue } } = VALUES_TO_TEST;

  const captureValueInput = screen.getByTestId(INPUTS_IDS_NAMES.valueInput);
  const captureDescriptionInput = screen.getByTestId(INPUTS_IDS_NAMES.descriptionInput);
  const capturePaymentInput = screen.getByTestId(INPUTS_IDS_NAMES.paymentInput);
  const captureTagInput = screen.getByTestId(INPUTS_IDS_NAMES.tagInput);

  act(() => {
    fireEvent.change(captureValueInput, { target: { value: CashValue } });
    userEvent.type(captureDescriptionInput, DescriptionValue);
    userEvent.selectOptions(capturePaymentInput, PaymentValue);
    userEvent.selectOptions(captureTagInput, TagValue);
  });
}

async function fillCurrency(position) {
  const { [position]: { CurrencyValue } } = VALUES_TO_TEST;

  await waitFor(() => {
    const captureCurrencyInput = screen.getByTestId(INPUTS_IDS_NAMES.currencyInput);

    userEvent.selectOptions(
      captureCurrencyInput,
      screen.getByRole('option', {
        name: `${CurrencyValue} - ${currenciesFullNames[CurrencyValue]}`,
      }),
    );
  });
}

describe('Sequencia de testes relacionadas à página `Wallet.jsx`', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se a página renderiza na rota `/carteira`', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);
    const { location: { pathname } } = history;

    expect(pathname).toBe('/carteira');
  });

  test('Verifica se a página renderiza a store correta', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    expect(store.getState()).toEqual(expectedEmptyGlobalStore);
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

    await waitFor(() => {
      expect(store.getState()).toEqual(expectedFullGlobalStore);
    }, { timeout: 3000 });
  });

  test('Verifica se é renderizado o <Header /> na página <Wallet />', () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    expect(CAPTURE_INPUTS.Email).toBeInTheDocument();
    expect(CAPTURE_INPUTS.CashValue).toBeInTheDocument();
    expect(CAPTURE_INPUTS.CurrencyName).toBeInTheDocument();

    expect(CAPTURE_INPUTS.Email.textContent).toBe(expectedFullGlobalStore.user.email);
    expect(CAPTURE_INPUTS.CurrencyName.textContent).toBe('BRL');
    expect(CAPTURE_INPUTS.CashValue.textContent).toBe('0.00');
  });

  test('Verifica se é renderizado o <WalletForm /> na página <Wallet />', async () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    expect(CAPTURE_INPUTS.ValueInput).toBeInTheDocument();
    expect(CAPTURE_INPUTS.DescriptionInput).toBeInTheDocument();
    expect(CAPTURE_INPUTS.CurrencyInput).toBeInTheDocument();
    expect(CAPTURE_INPUTS.PaymentInput).toBeInTheDocument();
    expect(CAPTURE_INPUTS.TagInput).toBeInTheDocument();
    expect(CAPTURE_INPUTS.ButtonAdd).toBeInTheDocument();

    await waitFor(() => {
      expect(CAPTURE_INPUTS.CurrencyInput.value).toBe('USD');
      expect(CAPTURE_INPUTS.PaymentInput.value).toBe('Dinheiro');
      expect(CAPTURE_INPUTS.TagInput.value).toBe('Alimentação');
    });
  });

  test('Verifica se é renderizado o <Table /> na página <Wallet />', () => {
    const columnsNames = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];

    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    expect(CAPTURE_INPUTS.Table).toBeInTheDocument();
    expect(CAPTURE_INPUTS.Table.firstChild.tagName).toBe('THEAD');
    expect(CAPTURE_INPUTS.Table.lastChild.tagName).toBe('TBODY');
    expect(CAPTURE_INPUTS.Table.lastChild.childNodes.length).toBe(0);
    expect(CAPTURE_INPUTS.Table.firstChild.childNodes[0].tagName).toBe('TR');
    expect(CAPTURE_INPUTS.Table.firstChild.childNodes[0].childNodes.length).toBe(9);

    CAPTURE_INPUTS.THs.forEach((eachTH, index) => {
      expect(eachTH.tagName).toBe('TH');
      expect(eachTH.textContent).toBe(columnsNames[index]);
    });
  });

  test('Verifica se os inputs poder receber valores adicionados pelo usuário', async () => {
    const { first: {
      CashValue,
      DescriptionValue,
      CurrencyValue,
      PaymentValue,
      TagValue } } = VALUES_TO_TEST;

    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    fillInputs('first');

    expect(CAPTURE_INPUTS.ValueInput.value).toBe(CashValue.toString());
    expect(CAPTURE_INPUTS.DescriptionInput.value).toBe(DescriptionValue);
    expect(CAPTURE_INPUTS.PaymentInput.value).toBe(PaymentValue);
    expect(CAPTURE_INPUTS.TagInput.value).toBe(TagValue);

    await fillCurrency('first');
    expect(CAPTURE_INPUTS.CurrencyInput.value).toBe(CurrencyValue);
  });
});

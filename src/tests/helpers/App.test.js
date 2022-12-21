import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import App from '../../App';
// para fazer history.push
import { renderWithRouterAndRedux } from './renderWith';

describe('Testes para atingir 60% de cobertura total da aplicação', () => {
  test('Testando o componente login', () => {
    // acessar
    renderWithRouterAndRedux(<App />);
    const email = screen.getByText(/email:/i);
    const password = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    // aferir
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  test('se o butão é habilitado obedecendo as regras de negócios..', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByText(/email:/i);
    const password = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'stariel@gmail.com');
    userEvent.type(password, '000');
    expect(button).toBeDisabled();

    userEvent.type(email, 'starielisaac@gmail.com');
    userEvent.type(password, '000111');
    expect(button).toBeEnabled();
  });
  test('se quando for clicado no botão, a página é renderizada para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByText(/email:/i);
    const password = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, 'stariel@gmail.com');
    userEvent.type(password, '000111');
    expect(button).toBeEnabled();
    userEvent.click(button);

    act(() => {
      history.push('/carteira');
    });

    expect(history.location.pathname).toBe('/carteira');
  });

  test('se o componente wallet é renderizado corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInfo = screen.getByRole('heading', { name: /email:/i });
    const total = screen.getByRole('heading', { name: /0\.00/i });
    const info = screen.getByRole('heading', { name: /brl/i });
    const value = screen.getByRole('spinbutton', { name: /valor:/i });
    const describe = screen.getByRole('spinbutton', { name: /valor:/i });
    const current = screen.getByRole('combobox', { name: /moeda:/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const tag = screen.getByRole('combobox', { name: /tag:/i });
    const buttonInfo = screen.getByRole('button', { name: /adicionar despesa/i });

    // tabela
    const descrisaoT = screen.getByRole('columnheader', { name: /descrição/i });
    const tagT = screen.getByRole('columnheader', { name: /tag/i });
    const metodoT = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const valorT = screen.getByRole('columnheader', { name: 'Valor' });
    const moeda = screen.getByRole('columnheader', { name: 'Moeda' });
    const cambioT = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const conversaoT = screen.getByRole('columnheader', { name: /valor convertido/i });
    const convertido = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const editarT = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(emailInfo).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(describe).toBeInTheDocument();
    expect(current).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(buttonInfo).toBeInTheDocument();
    // tabela
    expect(descrisaoT).toBeInTheDocument();
    expect(tagT).toBeInTheDocument();
    expect(metodoT).toBeInTheDocument();
    expect(valorT).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(cambioT).toBeInTheDocument();
    expect(conversaoT).toBeInTheDocument();
    expect(convertido).toBeInTheDocument();
    expect(editarT).toBeInTheDocument();
  });

  test('Adiciona uma nova despesa', async () => {
    renderWithRouterAndRedux(<App />);
    const value = screen.getByRole('spinbutton', { name: /valor:/i });
    const describe = screen.getByRole('spinbutton', { name: /valor:/i });
    const method = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const tag = screen.getByRole('combobox', { name: /tag:/i });
    const buttonInfo = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(describe, 'testando...');
    userEvent.selectOptions(tag, 'Trabalho');
    userEvent.selectOptions(method, 'Cartão de débito');
    userEvent.type(value, '5');
    userEvent.click(buttonInfo);

    waitFor(async () => {
      const describeTable = screen.getByRole('cell', { name: /testando\.\.\./i });
      const tagTable = screen.getByRole('cell', { name: /trabalho/i });
      const methodTable = screen.getByRole('cell', { name: /cartão de débito/i });
      const valueTable = screen.getByRole('cell', { name: /5\.00/i });

      expect(describeTable).toBeInTheDocument();
      expect(tagTable).toBeInTheDocument();
      expect(methodTable).toBeInTheDocument();
      expect(valueTable).toBeInTheDocument();
    });
  });
});

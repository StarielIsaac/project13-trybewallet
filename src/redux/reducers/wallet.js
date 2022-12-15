import { ALL_KEYS, ALL_INFO } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ALL_KEYS: return {
    ...state,
    currencies: action.payload,
  };
  case ALL_INFO: return {
    ...state,
    expenses: action.payload,
  };
  default: return state;
  }
};

export default wallet;

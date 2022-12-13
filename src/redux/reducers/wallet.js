import { ALL_KEYS } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ALL_KEYS: return {
    ...state,
    currencies: action.payload,
  };
  default: return state;
  }
};

export default wallet;

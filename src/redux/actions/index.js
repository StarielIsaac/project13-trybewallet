// Coloque aqui suas actions
export const EMAIL_USER = 'EMAIL_USER';
export const ALL_KEYS = 'ALL_KEYS';
export const ALL_INFO = 'ALL_INFO';

export const actionUserEmail = (info) => ({
  type: EMAIL_USER,
  payload: info,
});

export const actionFetchKeys = (keys) => ({
  type: ALL_KEYS,
  payload: keys,
});

export const actionAllInfo = (keys) => ({
  type: ALL_INFO,
  payload: keys,
});

export const fetchApi = (state, expenses) => async (dispatch) => {
  const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  const resp = await data.json();
  // console.log(resp);
  const object = {
    ...state,
    exchangeRates: resp,
  };
  const array = [...expenses, object];
  const arrayComplet = array.map((element, index) => {
    element.id = index;
    return element;
  });
  dispatch(actionAllInfo(arrayComplet));
  // console.log(arrayComplet);
};

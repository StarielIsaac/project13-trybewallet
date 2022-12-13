// Coloque aqui suas actions
export const EMAIL_USER = 'EMAIL_USER';
export const ALL_KEYS = 'ALL_KEYS';

export const actionUserEmail = (info) => ({
  type: EMAIL_USER,
  payload: info,
});

export const actionFetchKeys = (keys) => ({
  type: ALL_KEYS,
  payload: keys,
});

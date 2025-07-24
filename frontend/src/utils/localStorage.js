export const updateLocalStorage = ({ data, type }) =>
  localStorage.setItem(type, JSON.stringify(data));

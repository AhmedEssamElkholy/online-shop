import axios from 'axios';

export const apiSaveItem = item => {
  return axios.post('/api/v1/item', item);
};

export const apiUpdateItem = item => {
  return axios.put(`/api/v1/item/${item.itemId}`, item);
};

export const apiDeleteItem = itemId => {
  return axios.delete(`/api/v1/item/${itemId}`);
};

export const apiFetchItem= () => {
  return axios.get('/api/v1/item');
};


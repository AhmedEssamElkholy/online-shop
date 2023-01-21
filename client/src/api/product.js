import axios from 'axios';

export const apiSaveProduct = product => {
  return axios.post('/api/v1/product', product);
};

export const apiUpdateProduct = product => {
  return axios.put(`/api/v1/product/${product._id}`, product);
};

export const apiDeleteProduct = productId => {
  return axios.delete(`/api/v1/product/${productId}`);
};

export const apiFetchProduct = category => {
  const prefix = '/api/v1/product';
  const url = category ? `${prefix}/${category}` : prefix;
  return axios.get(url);
};


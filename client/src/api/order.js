import axios from 'axios';

export const apiSaveOrder = order => {
  return axios.post('/api/v1/order', order);
};

export const apiUpdateOrder = orderId => {
  return axios.put(`/api/v1/order/${orderId}`);
};

export const apiDeleteOrder = orderId => {
  return axios.delete(`/api/v1/order/${orderId}`);
};

//user
export const apiFetchOrder= () => {
  return axios.get('/api/v1/order');
};
//admin
export const apiFetchOrders= () => {
  return axios.get('/api/v1/manage-order');
};



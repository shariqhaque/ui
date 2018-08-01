import request from 'axios';

const SERVICE_BASE = "http://localhost:8080";

export const getCars = () =>
  request
    .get(`${SERVICE_BASE}/car`)
    .then(response => response.data);

export const addCar = (car) =>
  request
    .post(`${SERVICE_BASE}/car`, car)
    .then(response => response.data);


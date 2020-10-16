import axios from 'axios';
import { parseErrorResponse } from "./apiParser";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1/'
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(async function (response) {
  console.log("From Interceptor")
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, async function (error) {
  console.log("From Interceptor")
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  let errorMessage = await parseErrorResponse(error);
  return Promise.reject(errorMessage);
});

export default axiosInstance;
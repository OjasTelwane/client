import { interceptors } from 'axios';

// Add a response interceptor
const errorHandlerInterceptor = interceptors.response.use(
  (res) => res,
  (err) => {
    if(err.response !== undefined) {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`);
      }
    }
    throw err;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default errorHandlerInterceptor;

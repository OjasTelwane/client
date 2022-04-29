import { interceptors } from 'axios';
import { getAuthToken } from '../../core/services/central-operations.service';
import { environment } from '../../../environments/environment';

var isAbsoluteURLRegex = /^(?:\w+:)\/\//;

// Add a request interceptor
const apiHeaderInterceptor = interceptors.request.use(
  (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
      config.url = environment.settings.apiURL + config.url;
      config.headers['Content-Type'] = 'application/json';
      const token = getAuthToken();
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default apiHeaderInterceptor;

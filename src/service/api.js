import axios from 'axios'
import i18n from '@/i18n/i18n.js'

const api = axios.create();

api.defaults.timeout = 15000;

api.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 403:
          alert(i18n.t('Auth.sessionExpired'));
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          window.location.href = "/auth"
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

export default api;
import api from '../api';

class UserService {

    getProfile() {
      let config = {
          headers: {
              'Authorization': localStorage.getItem('token'),
          }
      }          
      return api.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/user/me`, config)
    }
}

export default new UserService();
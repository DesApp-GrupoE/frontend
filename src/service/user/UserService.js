import axios from 'axios';

class UserService {

    getProfile() {
      let config = {
          headers: {
              'Authorization': localStorage.getItem('token'),
          }
      }          
      return axios.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/user/me`, config)
    }
}

export default new UserService();
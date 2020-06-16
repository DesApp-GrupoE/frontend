import axios from 'axios';

class CommerceService {

    getCommerce() {
      let userId = localStorage.getItem('userId');
      let config = {
          headers: {
              'Authorization': localStorage.getItem('token'),
          }
      }          
      return axios.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/user/${userId}/commerce`, config)
    }
}

export default new CommerceService();
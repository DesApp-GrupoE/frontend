import axios from 'axios';

class CommerceService {

    getSectors() {
        return axios.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/commerce-sector`)  
    }

    getCommerce() {
      let userId = localStorage.getItem('userId');
      let config = {
          headers: {
              'Authorization': localStorage.getItem('token'),
          }
      }         
      return axios.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/user/${userId}/commerce`, config)
    }

    createCommerce(json) {
        let userId = localStorage.getItem('userId');
        let config = {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }
        return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/user/${userId}/commerce`, json, config)
    }
}

export default new CommerceService();
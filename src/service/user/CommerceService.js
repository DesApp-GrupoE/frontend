import api from '../api';

class CommerceService {

    getSectors() {
        return api.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/commerce-sector`)
    }

    getCommerce() {
      let userId = localStorage.getItem('userId');
      let config = {
          headers: {
              'Authorization': localStorage.getItem('token'),
          }
      }         
      return api.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/user/${userId}/commerce`, config)
    }

    createCommerce(json) {
        let userId = localStorage.getItem('userId');
        let config = {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/user/${userId}/commerce`, json, config)
    }

    getSales() {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }
        return api.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/commerce/sales`, config)
    }
}

export default new CommerceService();
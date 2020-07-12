import api from '../api';

class PurchaseService {

    getPurchases() {
      let config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
          }
        }
      return api.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/user/purchase`, config);
    }

}

export default new PurchaseService();
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

    finalizePurchases(jsonPurchases) {
      let config = {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      }
      let cartId = localStorage.getItem('KEY_CART')
      return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/purchase/${cartId}`, jsonPurchases, config)
    }
}

export default new PurchaseService();
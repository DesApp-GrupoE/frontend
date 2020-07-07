import axios from 'axios';

class PurchaseServiceTurn {

    getTurns(commerceId) {
      let config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
          }
        }
      return axios.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/purchase-turn?commerceId=${commerceId}`, config);
    }

    createTurn(json) {
      let config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
          }
        }
      return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/purchase-turn`, json, config);
    }
}

export default new PurchaseServiceTurn();
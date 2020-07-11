import api from '../api';

class PurchaseServiceTurn {

    getTurns(commerceId, dateFrom, dateTo) {
      let config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
          }
        }
      return api.get(
        `${process.env.VUE_APP_DESAPP_ROOT_API}/purchase-turn?commerceId=${commerceId}&dateFrom=${dateFrom}&dateTo=${dateTo}`
        , config);
    }

    createTurn(json) {
      let config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
          }
        }
      return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/purchase-turn`, json, config);
    }
}

export default new PurchaseServiceTurn();
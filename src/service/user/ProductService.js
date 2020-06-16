import axios from 'axios';

class ProductService {

    findProducts(commerceId) {
      let config = {
          headers: {
              'Authorization': localStorage.getItem('token'),
          }
      }          
      return axios.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/commerce/${commerceId}/product`, config)
    }

    removeProduct(commerceId, productId) {
      let config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
      }          
      return axios.delete(`${process.env.VUE_APP_DESAPP_ROOT_API}/commerce/${commerceId}/product/${productId}`, config)
    }

    createProduct(commerceId, json) {
      let config = {
        headers: {
            'Authorization': localStorage.getItem('token'),
        }
      }          
      return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/commerce/${commerceId}/product/`, json, config)
    }
}

export default new ProductService();
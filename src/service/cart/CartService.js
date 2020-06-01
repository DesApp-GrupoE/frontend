import axios from 'axios';

class CartService {

    getShoppingCart() {
        return axios.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/cart/`)
    }

    addProductToCart(id) {
        let json = {
            id: id,
            quantity: 1
        }
        return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/cart/product`, json);
    }

}

export default new CartService();
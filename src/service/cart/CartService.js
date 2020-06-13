import axios from 'axios';

const KEY_CART = 'KEY_CART';

class CartService {

    checkStatusKeyOrCreateShoppingCart() {
        this.getShoppingCart()
            .catch(() => {
                // si no podemos obtener el shopping cart con la key que tenemos
                // entonces eliminamos la key
                localStorage.removeItem(KEY_CART);
            })
    }

    getShoppingCart() {
        return this.getKeyCart()
            .then(keyCart => {
                return axios.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/cart/${keyCart}`)
            })
    }

    async getKeyCart() {
        let keyCart = localStorage.getItem(KEY_CART)
        if(!keyCart) {
            return await this.createShoppingCart()
                .then(response => {
                    keyCart = response.data.key;
                    localStorage.setItem(KEY_CART, keyCart);
                    return keyCart;
                });
        } else {
            return keyCart;
        }
        
    }

    createShoppingCart() {
        return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/cart`);
    }

    addProductToCart(productId) {
        let json = {
            id: productId,
            quantity: 1
        }
        return this.getKeyCart()
            .then(keyCart => {
                return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/cart/${keyCart}/product`, json);
            })
    }

    removeProductById(idProduct) {
        return this.getKeyCart()
            .then(keyCart => {
                return axios.delete(`${process.env.VUE_APP_DESAPP_ROOT_API}/cart/${keyCart}/product/${idProduct}`);
            })
    }

    updateProductQuantity(idProduct, quantity) {
        let json = {
            id: idProduct,
            quantity: quantity
        }
        return this.getKeyCart()
            .then(keyCart => {
                return axios.put(`${process.env.VUE_APP_DESAPP_ROOT_API}/cart/${keyCart}/product`, json);
            })
    }
}

export default new CartService();
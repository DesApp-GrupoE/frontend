import api from '../api';

class ProductService {

    findProducts(searchJson) {
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/products`, searchJson);
    }

}

export default new ProductService();
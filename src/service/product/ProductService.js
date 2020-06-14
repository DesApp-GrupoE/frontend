import axios from 'axios';

class ProductService {

    findProducts(searchJson) {
        return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/products`, searchJson);
    }

}

export default new ProductService();
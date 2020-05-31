// import axios from 'axios';

// const URL_SERVER = 'http://localhost';
// const PORT = '8080'

class ProductService {

    findProducts(jsonForm) {
        // return axios.get(`${URL_SERVER}:${PORT}/api`);
        return Promise.resolve([
            {id: 1, name: 'Fideos', brand: 'Matarazzo', price: 50.0, stock: 60, 
                img: 'https://http2.mlstatic.com/fideo-lucchetti-tallarin-500-grs-D_NQ_NP_952769-MLA31029340446_062019-F.jpg' },
            {id: 2, name: 'Coca-Cola 2L', brand: 'Coca-Cola', price: 120.0, stock: 50, 
                img: 'https://www.licoreraexpress.com/wp-content/uploads/2018/01/Coca-Cola-Bottle-2L-1.jpg' },
            {id: 3, name: jsonForm.product, brand: 'Test', price: 100.0, stock: 10, img: '' }
        ]);
    }

    // getArtistById(id) {
    //     return axios.get(`${URL_SERVER}:${PORT}/artists/${id}`);
    // }

}

export default new ProductService();
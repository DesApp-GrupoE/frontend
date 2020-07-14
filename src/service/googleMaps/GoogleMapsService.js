import api from '../api';

class GoogleMapsService {

    positionMap = {}

    findPosition(address) {
        let keyAddress = address.replace(/\s/g, '');
        if(this.positionMap[keyAddress]) {
            return Promise.resolve(this.positionMap[keyAddress]);
        }

        const params = {
            key: `${process.env.VUE_APP_GOOGLE_API_KEY}`,
            address: address
        }
        return api.get('https://maps.googleapis.com/maps/api/geocode/json', {params})
            .then(response => {
                this.positionMap[keyAddress] = response.data.results[0];
                return Promise.resolve(response.data.results[0]);
            })
    }

    findDistanceBetween(addressCommerce, addressHome) {
        const params = {
            key: `${process.env.VUE_APP_GOOGLE_API_KEY}`,
            origins: addressCommerce,
            destinations: addressHome
        }
        return api.get('https://maps.googleapis.com/maps/api/distancematrix/json', {params})
    }
}

export default new GoogleMapsService();
import axios from 'axios';

class PositionStackService {

    positionMap = {}

    findPosition(address) {
        let keyAddress = address.replace(/\s/g, '');
        if(this.positionMap[keyAddress]) {
            return Promise.resolve(this.positionMap[keyAddress]);
        }

        const params = {
            access_key: `${process.env.VUE_APP_POSITION_STACK_KEY}`,
            query: address,
            limit: 1
        }
        return axios.get('http://api.positionstack.com/v1/forward', {params})
            .then(response => {
                this.positionMap[keyAddress] = response.data.data[0];
                return Promise.resolve(response.data.data[0]);
            })
    }
}

export default new PositionStackService();
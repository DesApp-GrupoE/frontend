import axios from 'axios';

class AuthService {

    isLogged() {
        return localStorage.getItem('token') != undefined;
    }

    signUp(json) {
        return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/sign-up`, json)
    }

    signIn(json) {
        return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/login`, json)
    }

    logout() {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }          
        return axios.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/logout`, null, config)
    }
}

export default new AuthService();
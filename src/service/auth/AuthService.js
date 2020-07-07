import api from '../api';

class AuthService {

    isLogged() {
        return localStorage.getItem('token') != undefined;
    }

    signUp(json) {
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/sign-up`, json)
    }

    signIn(json) {
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/login`, json)
    }

    logout() {
        let config = {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }          
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/logout`, null, config)
    }

    validateCodeQR(json) {
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/code-otp`, json)
    }
}

export default new AuthService();
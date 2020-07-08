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
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/logout`, null, this.headerSecured())
    }

    validateCodeQR(json) {
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/code-otp`, json)
    }

    getSecret() {
        return api.get(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/2fa`, this.headerSecured())
    }

    enable2FA() {
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/2fa/enabled`, null, this.headerSecured())
    }

    disable2FA() {
        return api.post(`${process.env.VUE_APP_DESAPP_ROOT_API}/auth/2fa/disabled`, null, this.headerSecured())
    }

    headerSecured() {
        return {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        }
    }
}

export default new AuthService();
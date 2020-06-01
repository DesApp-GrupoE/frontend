class AuthService {

    isLogged() {
        return localStorage.getItem('userId');
    }
}

export default new AuthService();
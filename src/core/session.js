class SessionManager {
    constructor() {
        this.username = sessionStorage.getItem("username")
    }
    isLoggedIn() {
        return !!this.username
    }
    isAdmin() {
        return this.username === "admin"
    }
    login(username) {
        this.username = username
        sessionStorage.setItem("username", username)
    }
    logout() {
        this.username = null
        sessionStorage.removeItem("username")
    }
}
export {SessionManager}
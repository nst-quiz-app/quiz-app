import { AdminManager, LearnersManager, usersInit } from "./users"

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
    login(username, password) {
        usersInit()
        const am=new AdminManager()
        const lm = new LearnersManager()
        if (username === "admin") {
            if (!am.check(password)) {
                return false
            }
        }
        else {
            if (!lm.check(username,password)) {
                return false
            }
        }
        this.username = username
        sessionStorage.setItem("username", username)
        return true
    }
    logout() {
        this.username = null
        sessionStorage.removeItem("username")
    }
}
export { SessionManager }
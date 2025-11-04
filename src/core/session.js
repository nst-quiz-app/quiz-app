import { AdminManager, LearnersManager } from "./users"

class SessionManager {
    getUsername() {
        return sessionStorage.getItem("username")
    }
    isLoggedIn() {
        return !!sessionStorage.getItem("username")
    }
    isAdmin() {
        return sessionStorage.getItem("username") === "admin"
    }
    login(username, password) {
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
        sessionStorage.setItem("username", username)
        return true
    }
    logout() {
        sessionStorage.removeItem("username")
    }
}
export { SessionManager }
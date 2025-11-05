import { AdminManager, LearnersManager } from "./users"

class SessionManager {
    /*
    getUsername() - returns the current logged in user's username
    isLoggedIn() - returns true if an user is logged in and false otherwise
    isAdmin() - returns true if the admin is currently logged in and false otherwise
    logout() - logs out the current user
    */
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
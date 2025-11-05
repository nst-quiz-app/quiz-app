function usersInit() {
    /**
    If not already initialised, the default setup is done
    */
    if (!localStorage.getItem("initialised")) {
        localStorage.setItem("admin-password", "I hate organic chemistry")
        localStorage.setItem("learners-credentials", JSON.stringify({}))
        localStorage.setItem("initialised", "true")
    }
}

class AdminManager {
    /*
    check(password) - returns true if correct password; returns false if incorrect password
    updatePassword(oldPassword, newPassword) - updates the password if the oldPassword is correct
    */
    check(password) {
        return localStorage.getItem("admin-password") === password
    }
    updatePassword(oldPassword, newPassword) {
        if (this.check(oldPassword)) {
            localStorage.setItem("admin-password", newPassword)
        }
    }
}

class LearnersManager {
    /*
    add(username, password) - adds a new user. Note: it doesn't check whether the user already exists
    check(password) - returns true if correct password; returns false if incorrect password
    updatePassword(username, oldPassword, newPassword, byAdmin = false)
        - updates the password if either the oldPassword is correct or if it's done by admin
        - returns true upon success and false otherwise
    remove(username, password, byAdmin = false)
        - removes an user if either the password is correct or if done by admin
        - returns true upon success and false otherwise
    exists(username) - returns true is the username already exists or it will return false
    */
    add(username, password) {
        const credentials = JSON.parse(localStorage.getItem("learners-credentials"))
        credentials[username] = password
        localStorage.setItem("learners-credentials", JSON.stringify(credentials))
    }
    check(username, password) {
        return JSON.parse(localStorage.getItem("learners-credentials"))[username] === password
    }
    updatePassword(username, oldPassword, newPassword, byAdmin = false) {
        if (this.check(username, oldPassword) || byAdmin) {
            const credentials = JSON.parse(localStorage.getItem("learners-credentials"))
            credentials[username] = newPassword
            localStorage.setItem("learners-credentials", JSON.stringify(credentials))
            return true
        }
        return false
    }
    remove(username, password, byAdmin = false) {
        if (this.check(username, password) || byAdmin) {
            const credentials = JSON.parse(localStorage.getItem("learners-credentials"))
            delete credentials[username]
            localStorage.setItem("learners-credentials", JSON.stringify(credentials))
            return true
        }
        return false
    }
    exists(username) {
        return (JSON.parse(localStorage.getItem("learners-credentials"))[username] != null) && (username !== "admin")
    }
}

export { AdminManager, LearnersManager, usersInit }
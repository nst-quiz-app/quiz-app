function usersInit() {
    if (!localStorage.getItem("initialised")) { // initial setup
        localStorage.setItem("admin-password", "I hate organic chemistry")
        localStorage.setItem("learners-credentials", JSON.stringify({}))
        localStorage.setItem("initialised", "true")
    }
}

class AdminManager {
    constructor() {
        this.password = localStorage.getItem("admin-password")
    }
    check(password) {
        return this.password === password
    }
    updatePassword(oldPassword, newPassword) {
        if (this.check(oldPassword)) {
            this.password = newPassword
            localStorage.setItem("admin-password", newPassword)
        }
    }
}

class LearnersManager {
    constructor() {
        this.credentials = JSON.parse(localStorage.getItem("learners-credentials"))
    }
    add(username, password) {
        this.credentials[username] = password
        localStorage.setItem("learners-credentials", JSON.stringify(this.credentials))
    }
    check(username, password) {
        return this.credentials[username] === password
    }
    updatePassword(username, oldPassword, newPassword, byAdmin = false) {
        if (this.check(username, oldPassword) || byAdmin) {
            this.credentials[username] = newPassword
            localStorage.setItem("learners-credentials", JSON.stringify(this.credentials))
            return true
        }
        return false
    }
    remove(username, password, byAdmin = false) {
        if (this.check(username, password) || byAdmin) {
            delete this.credentials[username]
            localStorage.setItem("learners-credentials", JSON.stringify(this.credentials))
            return true
        }
        return false
    }
    exists(username) {
        return (this.credentials[username] != null) && (username !== "admin")
    }
}

export { AdminManager, LearnersManager, usersInit }
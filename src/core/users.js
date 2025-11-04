function usersInit() {
    if (!localStorage.getItem("initialised")) { // initial setup
        localStorage.setItem("admin-password", "I hate organic chemistry")
        localStorage.setItem("learners-credentials", JSON.stringify({}))
        localStorage.setItem("initialised", "true")
    }
}

class AdminManager {
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
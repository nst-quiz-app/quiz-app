const set = localStorage.setItem.bind(localStorage)
const get = localStorage.getItem.bind(localStorage)
const setJSON = (k, v) => set(k, JSON.stringify(v))
const getJSON = k => JSON.parse(get(k))

if (!get("initialised")) { // initial setup
    set("admin-password", "I hate organic chemistry")
    setJSON("learners-credentials", {})
    set("initialised", "true")
}

class AdminManager {
    constructor() {
        this.password = get("admin-password")
    }
    check(password) {
        return this.password === password
    }
    updatePassword(oldPassword, newPassword) {
        if (this.check(oldPassword)) {
            this.password = newPassword
            set("admin-password", newPassword)
        }
    }
}

class LearnersManager {
    constructor() {
        this.credentials = getJSON("learners-credentials")
    }
    add(username, password) {
        this.credentials[username] = password
        setJSON("learners-credentials", this.credentials)
    }
    check(username, password) {
        return this.credentials[username] === password
    }
    updatePassword(username, oldPassword, newPassword, byAdmin=false) {
        if (this.check(username, oldPassword) || byAdmin) {
            this.credentials[username] = newPassword
            setJSON("learners-credentials", this.credentials)
            return true
        }
        return false
    }
    remove(username, password, byAdmin=false) {
        if (this.check(username, password) || byAdmin) {
            delete this.credentials[username]
            setJSON("learners-credentials", this.credentials)
            return true
        }
        return false
    }
    exists(username) {
        return (this.credentials[username] != null) && (username !== "admin")
    }
}

export {AdminManager, LearnersManager}
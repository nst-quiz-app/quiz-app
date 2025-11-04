import { SessionManager } from "../core/session"
import { AdminManager, LearnersManager, usersInit } from "../core/users"
export default function LoginWidget() {
    return <form>
        <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
        </div>
        <div>
            <label htmlFor="password">password</label>
            <input type="password" id="password" name="password" />
        </div>
        <button type="submit" onClick={login}>Login</button>
    </form>
    function login(evt) {
        evt.preventDefault()
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const sm = new SessionManager()
        usersInit()
        const am = new AdminManager()
        const lm = new LearnersManager()
        if (username === "admin") {
            if (am.check(password)) {
                sm.login("admin")
            }
        }
        else {
            if (lm.check(username, password)) {
                sm.login(username)
            }
        }
    }
}
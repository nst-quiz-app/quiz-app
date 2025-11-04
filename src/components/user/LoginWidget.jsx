import { SessionManager } from "../../core/session"
function login(evt) {
    evt.preventDefault()
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const sm = new SessionManager()
    if (sm.login(username, password)) {
        window.location.reload()
        return
    }
    document.getElementById("lol").style.display = "block"
}
export default function LoginWidget() {
    return <>
    <form>
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
    <p id="lol" style={{display: "none"}}>Login Failed</p>
    </>
}
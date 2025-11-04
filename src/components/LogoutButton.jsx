import { SessionManager } from "../core/session"
export default function LogoutButton() {
    return <button onClick={logout}>Logout</button>
    function logout(evt) {
        const sm = new SessionManager()
        sm.logout()
        window.location.reload()
    }
}
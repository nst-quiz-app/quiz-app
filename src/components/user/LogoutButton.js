import { SessionManager } from "../../core/session"
function logout(evt) {
    const sm = new SessionManager()
    sm.logout()
    window.location.reload()
}
export default function LogoutButton() {
    return <button onClick={logout}>Logout</button>
}
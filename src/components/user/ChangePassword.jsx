import { SessionManager } from "../../core/session";
import { AdminManager, LearnersManager } from "../../core/users";
function change(oldPassword, newPassword) {
    const sm = new SessionManager()
    const am = new AdminManager()
    const lm = new LearnersManager()
    if (sm.isAdmin()) {
        if (am.check(oldPassword)) {
            am.updatePassword(oldPassword, newPassword)
            sm.logout()
            window.location.reload()
            return
        }
    }
    else {
        if (lm.check(oldPassword)) {
            lm.updatePassword(sm.getUsername(), oldPassword, newPassword)
            sm.logout()
            window.location.reload()
            return
        }
    }
    document.getElementById("lol").style.display = "block"
}
export default function ChangePassword() {
    return <>
        <form>
            <div>
                <label htmlFor="old-password">Old Password</label>
                <input type="password" id="old-password" name="old-password" />
            </div>
            <div>
                <label htmlFor="new-password">New Password</label>
                <input type="password" id="new-password" name="new-password" />
            </div>
            <div>
                <label htmlFor="new-password-confirm">Confirm New Password</label>
                <input type="password" id="new-password-confirm" name="new-password-confirm" />
            </div>
            <button type="button" onClick={() => {
                const oldPassword = document.getElementById("old-password").value;
                const newPassword = document.getElementById("new-password").value;
                const newPasswordConfirm = document.getElementById("new-password-confirm").value;
                if (newPassword === newPasswordConfirm) {
                    change(oldPassword, newPassword);
                } else {
                    document.getElementById("lol").style.display = "block";
                }
            }}>Change Password</button>
        </form>
        <p id="lol" style={{ display: "none" }}>Password change failed</p>
    </>
}
import { SessionManager } from "../../core/session";
import { AdminManager, LearnersManager } from "../../core/users";
import FormLabelInputPair from "../FormLabelInputPair";
import { useState } from "react";

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(false);
    return <>
        <form>
            <FormLabelInputPair
                labelText="Old Password"
                inputType="password"
                inputValue={oldPassword}
                onInputValueChange={e => setOldPassword(e.target.value)}
            />
            <FormLabelInputPair
                labelText="New Password"
                inputType="password"
                inputValue={newPassword}
                onInputValueChange={e => setNewPassword(e.target.value)}
            />
            <FormLabelInputPair
                labelText="Confirm New Password"
                inputType="password"
                inputValue={newPasswordConfirm}
                onInputValueChange={e => setNewPasswordConfirm(e.target.value)}
            />
            <button type="button" disabled={btnDisabled} onClick={(evt) => {
                setBtnDisabled(true);
                evt.preventDefault();
                if (newPassword === newPasswordConfirm) {
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
                    setError("Old password is incorrect");
                    setTimeout(() => {
                        setError("");
                        setBtnDisabled(false);
                    }, 3000);
                } else {
                    setError("New passwords do not match");
                    setTimeout(() => {
                        setError("");
                        setBtnDisabled(false);
                    }, 3000);
                }
            }}>Change Password</button>
        </form>
        <p style={{ display: error ? "block" : "none" }}>{error}</p>
    </>
}
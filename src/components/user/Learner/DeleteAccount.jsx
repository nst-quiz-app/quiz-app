import { SessionManager } from "../../../core/session";
import { LearnersManager } from "../../../core/users";
import FormLabelInputPair from "../../FormLabelInputPair";
import { useState, useEffect } from "react";

export default function DeleteAccount() {
    const [confirmation, setConfirmation] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    useEffect(() => {
        setBtnDisabled(!(!!password && (confirmation === "delete my account")))
    }, [password, confirmation])
    return <>
        <form>
            <FormLabelInputPair
                labelText="Password"
                inputType="password"
                inputValue={password}
                onInputValueChange={e => setPassword(e.target.value)}
            />
            <FormLabelInputPair
                labelText="Confirmation"
                inputValue={confirmation}
                onInputValueChange={e => setConfirmation(e.target.value)}
            />
            <button type="button" disabled={btnDisabled} onClick={(evt) => {
                setBtnDisabled(true);
                const sm = new SessionManager()
                const lm = new LearnersManager()
                const username = sm.getUsername()
                if (lm.check(username, password)) {
                    lm.remove(username, password)
                    sm.logout()
                    window.location.reload()
                }
                else {
                    setError("Incorrect password")
                }
            }}>Delete my account</button>
        </form>
        <p style={{ display: error ? "block" : "none" }}>{error}</p>
    </>
}
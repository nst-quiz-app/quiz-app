import { SessionManager } from "../../core/session"
import { useState } from "react"
import FormLabelInputPair from "../FormLabelInputPair"

export default function LoginWidget() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [btnDisabled, setBtnDisabled] = useState(false)
    return <>
        <h2>Login Form</h2>
        <form>
            <FormLabelInputPair
                labelText="Username"
                inputValue={username}
                onInputValueChange={e => setUsername(e.target.value)}
            />
            <FormLabelInputPair
                labelText="Password"
                inputType="password"
                inputValue={password}
                onInputValueChange={e => setPassword(e.target.value)}
            />
            <button type="button" disabled={btnDisabled} onClick={(evt) => {
                setBtnDisabled(true)
                const sm = new SessionManager()
                if (sm.login(username, password)) {
                    window.location.reload()
                }
                else {
                    setError("Username and password doesn't match")
                    setTimeout(() => {
                        setError("")
                        setBtnDisabled(false)
                    }, 3000)
                }
            }}>Login</button>
        </form>
        <p style={{ display: error ? "block" : "none" }}>{error}</p>
    </>
}
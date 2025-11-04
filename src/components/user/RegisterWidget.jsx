import { LearnersManager } from "../../core/users"
import FormLabelInputPair from "../FormLabelInputPair"
import { useState } from "react"

export default function RegisterWidget() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [btnDisabled, setBtnDisabled] = useState(false)
    return <>
        <h2>Registration Form</h2>
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
            <FormLabelInputPair
                labelText="Confirm Password"
                inputType="password"
                inputValue={confirmPassword}
                onInputValueChange={e => setConfirmPassword(e.target.value)}
            />
            <button type="submit" disabled={btnDisabled} onClick={(evt) => {
                setBtnDisabled(true)
                evt.preventDefault()
                if (password !== confirmPassword) {
                    setError("Passwords do not match")
                    setTimeout(() => {
                        setError("")
                        setBtnDisabled(false)
                    }, 3000)
                    return
                }
                const lm = new LearnersManager()
                if (lm.exists(username)) {
                    setError("User already exists")
                    setTimeout(() => {
                        setError("")
                        setBtnDisabled(false)
                    }, 3000)
                    return
                }
                lm.add(username, password)
                window.location.reload()
            }}>Register</button>
        </form>
        <p style={{ display: error ? "block" : "none" }}>{error}</p>
    </>
}
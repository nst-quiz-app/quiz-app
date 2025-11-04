import { LearnersManager } from "../../core/users"
function register(evt) {
    evt.preventDefault()
    const username = document.getElementById("register-username").value
    const password = document.getElementById("register-password").value
    const confirmPassword = document.getElementById("register-confirm-password").value
    
    if (password !== confirmPassword) {
        console.log(password, confirmPassword);
        
        document.getElementById("lol").style.display = "block"
        return
    }
    const lm = new LearnersManager()
    if (lm.exists(username)) {
        document.getElementById("lol").style.display = "block"
        return
    }
    lm.add(username, password)
    window.location.reload()
}
export default function RegisterWidget() {
    return <>
    <h2>Registration Form</h2>
    <form>
        <div>
            <label htmlFor="register-username">Username</label>
            <input type="text" id="register-username" name="username" />
        </div>
        <div>
            <label htmlFor="register-password">password</label>
            <input type="password" id="register-password" name="password" />
        </div>
        <div>
            <label htmlFor="register-confirm-password">confirm password</label>
            <input type="password" id="register-confirm-password" name="confirm-password" />
        </div>
        <button type="submit" onClick={register}>Register</button>
    </form>
    <p id="lol" style={{display: "none"}}>Registration Failed</p>
    </>
}
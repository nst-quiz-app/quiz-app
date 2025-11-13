import { createRoot } from "react-dom/client";
import Login from "./routes/login.js"
import Admin from "./routes/admin.js"
import Learner from "./routes/learner.js";
import { usersInit } from "./core/users";
import { SessionManager } from "./core/session";

usersInit()
const sm = new SessionManager();

const root = createRoot(document.getElementById("root"))
root.render(
    sm.isLoggedIn() ? (sm.isAdmin() ? <Admin />: <Learner />) : <Login />
)
import LogoutButton from "../components/user/LogoutButton"
import ChangePassword from "../components/user/ChangePassword"
import DeleteAccount from "../components/user/Learner/DeleteAccount";

export default () => {
    return <div>
        <p>This is the learner page</p>
        <LogoutButton />
        <ChangePassword />
        <DeleteAccount />
    </div>
}
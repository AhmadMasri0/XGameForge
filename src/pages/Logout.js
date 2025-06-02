import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Logout = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    logout();
    navigate('/');
    return;
}

export default Logout;  
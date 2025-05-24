import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Logout = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    logout();
    navigate('/');
    return;
} 
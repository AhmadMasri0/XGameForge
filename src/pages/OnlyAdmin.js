import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const OnlyAdmin = () => {
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {

    });

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!user?.isAdmin) return <Navigate to="/" replace />;

    return <div>Only admin can access this page.</div>;
};

export default OnlyAdmin;

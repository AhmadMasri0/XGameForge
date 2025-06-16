import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React, { ReactNode } from "react";

interface AdminRouteProps {
    children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user } = useAuth();
    if (!user?.token) return <Navigate to="/login" />;

    if (!user.isAdmin) return <Navigate to="/" />;

    return children;
};

export default AdminRoute;

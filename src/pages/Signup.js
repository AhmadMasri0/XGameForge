import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        validate();
    }, [formData]);

    const validate = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = "Username is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
    };

    const handleSignup = () => {
        validate();
        if (Object.keys(errors).length === 0) {
            login(formData);
            navigate("/");
        }
    };

    return (
        <AuthForm
            type="signup"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSignup}
            errors={errors}
        />
    );
};

export default Signup;

import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        validate();
    }, [formData]);

    const validate = () => {
        const newErrors = {};
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


    const handleLogin = async () => {
        validate();
        if (Object.keys(errors).length === 0) {
            setSubmitError(login(formData));
        }
    };

    return (
        <AuthForm
            type="login"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleLogin}
            errors={errors}
            submitError={submitError}
        />
    );
};

export default Login;

import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const { login, user } = useAuth();
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();
    const [touched, setTouched] = useState({});

    useEffect(() => {
        validate();
    }, [formData]);

    useEffect(() => {

        if (user) {
            return navigate('/');
        }
    }, [user]);

    const validate = () => {
        const newErrors = {};
        if (touched.email) {
            if (!formData.email) {
                newErrors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = "Invalid email format";
            }
        }
        if (touched.password) {

            if (!formData.password) {
                newErrors.password = "Password is required";
            } else if (formData.password.length < 6) {
                newErrors.password = "Password must be at least 6 characters";
            }
        }
        setErrors(newErrors);
    };


    const handleLogin = async () => {
        validate();
        if (Object.keys(errors).length === 0) {
            const res = await login(formData);
            setSubmitError(res);
        }
    };

    return (
        <AuthForm
            type="login"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleLogin}
            errors={errors}
            touched={touched}
            setTouched={setTouched}
            submitError={submitError}
        />
    );
};

export default Login;

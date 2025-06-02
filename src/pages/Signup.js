import React, { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const { signup, signupMessage } = useAuth();
    const [submitError, setSubmitError] = useState('');

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
    useEffect(() => {
        validate();
    }, [formData,]);


    const handleSignup = async () => {
        validate();
        if (Object.keys(errors).length === 0) {
            setSubmitError(signup(formData));
        }
    };


    return (
        <AuthForm
            type="signup"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSignup}
            errors={errors}
            submitError={submitError}
            signupMessage={signupMessage}
        />
    );
};

export default Signup;

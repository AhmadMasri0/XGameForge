import React, { useState, useEffect } from "react";
import AuthForm from "../components/common/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { RegistrationData, FormErrors, TouchedFields } from "../types/types";


const Login: React.FC = () => {
    const [formData, setFormData] = useState<RegistrationData>({ 
      email: "", 
      password: "" 
    });
    
    const [errors, setErrors] = useState<FormErrors>({});
    const { login, user } = useAuth();
    const [submitError, setSubmitError] = useState<string>('');
    const navigate = useNavigate();
    const [touched, setTouched] = useState<TouchedFields>({});

    useEffect(() => {
        validate();
    }, [formData, touched]);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const validate = (): void => {
        const newErrors: FormErrors = {};
        
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

    const handleLogin = async (): Promise<void> => {
        validate();
        if (Object.keys(errors).length === 0) {
            try {
                const errorMessage = await login(formData);
                if (errorMessage) {
                    setSubmitError(errorMessage);
                }
            } catch (error) {
                setSubmitError("An unexpected error occurred during login");
            }
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
            setTouched={setTouched}
        />
    );
};

export default Login;
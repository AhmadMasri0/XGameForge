import { useState, useEffect } from "react";
import AuthForm from "../components/common/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { RegistrationData, FormErrors, TouchedFields } from "../types/types";

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<RegistrationData>({ 
      username: "", 
      email: "", 
      password: "" 
    });
    
    const [errors, setErrors] = useState<FormErrors>({});
    const { signup, signupMessage, user } = useAuth();
    const [submitError, setSubmitError] = useState<string>('');
    const navigate = useNavigate();
    const [touched, setTouched] = useState<TouchedFields>({});

    const validate = (): void => {
        const newErrors: FormErrors = {};
        
        if (touched.username) {
            if (!formData.username) {
                newErrors.username = "Username is required";
            }
        }
        
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

    useEffect(() => {
        validate();
    }, [formData, touched]);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSignup = async (): Promise<void> => {
        validate();
        if (Object.keys(errors).length === 0) {
            try {
                const errorMessage = await signup(formData);
                if (errorMessage) {
                    setSubmitError(errorMessage);
                }
            } catch (error) {
                setSubmitError("An unexpected error occurred during signup");
                console.error("Signup error:", error);
            }
        }
    };

    return (
        <AuthForm
            type="signup"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSignup}
            errors={errors}
            setTouched={setTouched}
            submitError={submitError}
            signupMessage={signupMessage}
        />
    );
};

export default Signup;
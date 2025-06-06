import { useState, useEffect } from "react";
import AuthForm from "../components/common/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const { signup, signupMessage, user } = useAuth();
    const [submitError, setSubmitError] = useState('');
    const navigate = useNavigate();
    const [touched, setTouched] = useState({});

    const validate = () => {
        const newErrors = {};

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
    }, [formData,]);

    useEffect(() => {

        if (user) {
            return navigate('/');
        }
    }, [user]);

    const handleSignup = async () => {
        validate();
        if (Object.keys(errors).length === 0) {
            const res = await signup(formData);
            setSubmitError(res);
        }
    };


    return (
        <AuthForm
            type="signup"
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSignup}
            errors={errors}
            touched={touched}
            setTouched={setTouched}
            submitError={submitError}
            signupMessage={signupMessage}
        />
    );
};

export default Signup;

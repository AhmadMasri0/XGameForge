import React from "react";
import {
    TextField, Button, Typography, Box, Stack,
} from "@mui/material";

const AuthForm = ({ type, onSubmit, formData, setFormData, errors }) => {
    const isSignup = type === "signup";

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const isDisabled = Object.values(errors).some(error => error) ||
        Object.values(formData).some(value => !value);

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" mb={3} align="center">
                {isSignup ? "Sign Up" : "Login"}
            </Typography>
            <Stack spacing={2}>
                {isSignup && (
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username || ""}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                        fullWidth
                    />
                )}
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    fullWidth
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    disabled={isDisabled}
                >
                    {isSignup ? "Create Account" : "Login"}
                </Button>
            </Stack>
        </Box>
    );
};

export default AuthForm;

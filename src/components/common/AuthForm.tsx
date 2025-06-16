import { useState, KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import {
  TextField, Button, Typography,
  Box, Stack, IconButton, InputAdornment,
  Link as MuiLink, Alert, useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { RegistrationData, FormErrors, TouchedFields } from "../../types/types";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: () => void;
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  errors: FormErrors;
  submitError?: string;
  signupMessage?: string;
  setTouched: React.Dispatch<React.SetStateAction<TouchedFields>>;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type, onSubmit, formData, setFormData,
  errors, submitError, signupMessage, setTouched,
}) => {
  const isSignup = type === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const keyTrigger = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const isDisabled =
    Object.values(errors).some(error => error) ||
    Object.values(formData).some(value => !value);

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" mb={3}>
        {isSignup ? "Sign Up" : "Login"}
      </Typography>

      <Stack spacing={2}>
        {isSignup && (
          <TextField
            label="Username"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            onKeyDown={keyTrigger}
            error={!!errors.username}
            onBlur={handleBlur}
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
          onKeyDown={keyTrigger}
          error={!!errors.email}
          onBlur={handleBlur}
          helperText={errors.email}
          fullWidth
        />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          onBlur={handleBlur}
          helperText={errors.password}
          onKeyDown={keyTrigger}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {submitError && <span style={{ color: "red", fontSize: '13px' }}>{submitError}</span>}
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={isDisabled}
        >
          {isSignup ? "Create Account" : "Login"}
        </Button>
        {signupMessage && <Alert severity="success">
          {signupMessage}
        </Alert>}
        <Typography variant="body2">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <MuiLink component={Link} to="/login" underline="hover" color={theme.customColors.primary}>
                Login
              </MuiLink>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <MuiLink component={Link} to="/signup" underline="hover" color={theme.customColors.primary}>
                Sign Up
              </MuiLink>
            </>
          )}
        </Typography>
      </Stack>
    </Box>
  );
};

export default AuthForm;
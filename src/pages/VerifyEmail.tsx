import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const res = await api.get(`/api/auth/confirm/${token}`);
        setMessage(res.data.message || "Email confirmed!");
        setStatus("success");
      } catch (err) {
        setMessage(err.response?.data?.message || "Invalid or expired token.");
        setStatus("error");
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        px: 2,
      }}
    >
      {status === "loading" ? (
        <>
          <CircularProgress />
          <Typography mt={2}>Verifying your email...</Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" mb={2}>
            {status === "success" ? "✅ Success!" : "❌ Error"}
          </Typography>
          <Typography variant="body1" color={status === "error" ? "error" : "textPrimary"}>
            {message}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </>
      )}
    </Box>
  );
};

export default VerifyEmail;
    
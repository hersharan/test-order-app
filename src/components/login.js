import "../App.css";
import React, { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { FormHelperText, Typography } from "@mui/material";
import { useAuth } from "../auth/auth";

function Login() {
  const { onLogin } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    userName: false,
    password: false,
  });
  const [apiError, setApiError] = useState({
    status: false,
    message: null,
  });

  const handleUName = (e) => {
    const { value } = e.target;
    setUserName(value);
    const newErrors = {
      ...errors,
      userName: !value || value === "",
    };
    setErrors(newErrors);
  };

  const handlePass = (e) => {
    const { value } = e.target;
    setPassword(value);
    const newErrors = {
      ...errors,
      password: !value || value === "",
    };
    setErrors(newErrors);
  };

  const handleLogin = async () => {
    try {
      const resp = await onLogin({ userName, password });
      setApiError({
        status: resp.status,
        message: resp.message,
      });
    } catch {
      setApiError({
        status: false,
        message: "Something went wrong",
      });
    }
  };

  return (
    <Fragment>
      <Box className="login-box">
        <Paper elevation={3}>
          <Typography variant="h4" component="div" gutterBottom>
            Login
          </Typography>
          <div className="login-form">
            {apiError.status === false &&
              apiError.message !== "" &&
              apiError.message !== null && (
                <FormHelperText error className="login-err">{apiError.message}</FormHelperText>
              )}
            <TextField
              id="username"
              label="Username"
              value={userName}
              required
              onChange={handleUName}
              error={errors.userName}
              helperText={errors.userName && "Enter a username"}
            />
            <TextField
              id="password"
              label="Password"
              value={password}
              required
              type="password"
              onChange={handlePass}
              error={errors.password}
              helperText={errors.password && "Enter a password"}
            />
          </div>
          <div className="login-buttons">
            <Button
              variant="contained"
              type="submit"
              id="login-btn"
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              disabled={userName === "" || password === ""}
            >
              Login
            </Button>
          </div>
        </Paper>
      </Box>
    </Fragment>
  );
}

export default Login;

import "../App.css";
import React, { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { Typography } from "@mui/material";
import { useAuth } from "../auth/auth";

function Login() {
  const { onLogin } = useAuth();

  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    onLogin({ userName, password });
  };

  return (
    <Fragment>
      <Box className="login-box">
        <Paper elevation={3}>
          <Typography variant="h3" component="div" gutterBottom>
            Login
          </Typography>
          <div className="login-form">
            <TextField
              id="username"
              label="Username"
              value={userName}
              required
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              error={userName === ""}
              helperText={ userName=== "" && "Enter a username"}
            />
            <TextField
              id="password"
              label="Password"
              value={password}
              required
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={password === ""}
              helperText={ password=== "" && "Enter a password"}
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

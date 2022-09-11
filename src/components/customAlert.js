import * as React from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export default function CustomAlert({ show, type, message, handleClose }) {
  if (!type || !message) {
    return null;
  }
  return (
    <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="filled" severity={`${type}`}>
        {message}
      </Alert>
    </Snackbar>
  );
}

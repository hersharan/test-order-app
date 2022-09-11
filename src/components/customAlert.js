import * as React from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export default function CustomAlert({ show, type, message, handleClose }) {
  if (!type || !message) {
    return null;
  }

  const vertical = "top";
  const horizontal = "right";

  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
    >
      <Alert variant="filled" severity={`${type}`}>
        {message}
      </Alert>
    </Snackbar>
  );
}

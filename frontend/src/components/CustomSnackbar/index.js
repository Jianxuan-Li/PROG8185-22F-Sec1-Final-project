import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar({ message }) {
  return (
    <Snackbar open={message} autoHideDuration={3000}>
      <Alert severity="success" sx={{ width: "99%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

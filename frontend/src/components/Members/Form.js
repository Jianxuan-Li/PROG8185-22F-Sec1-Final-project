import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Form({ onSubmit, onClose, member }) {
  const [message, setMessage] = React.useState(null);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return showMessage("Please fill all the fields");
    }

    // check email address
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      return showMessage("Please enter a valid email address");
    }

    if (member) {
      onSubmit(member.id, { name, email, password });
    } else {
      onSubmit({ name, email, password });
    }
    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"lg"}
    >
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          defaultValue={member ? member.name : ""}
        />
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={member ? member.email : ""}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          defaultValue={member ? member.password : ""}
        />
        {message && (
          <Snackbar open={true}>
            <Alert severity="warning">{message}</Alert>
          </Snackbar>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

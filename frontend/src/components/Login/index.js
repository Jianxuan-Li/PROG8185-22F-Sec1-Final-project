import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import MemberContext from "../../context/MemberContext";

import { createOneMember } from "./request";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertDialog({ open, handleClose }) {
  const [value, setValue] = React.useState("1");
  const [message, setMessage] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { members, createNewMember, loginUser } = useContext(MemberContext);

  // login
  const [email, setEmail] = React.useState("aayush@group.com");
  const [password, setPassword] = React.useState("admin123");

  const Login = () => {
    const user = members.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // log the user in
      loginUser(user);
      handleClose();
    } else {
      setMessage("Invalid email or password");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  // register
  const [username, setName] = React.useState("");
  const [emailRegister, setEmailRegister] = React.useState("");
  const [passwordRegister, setPasswordRegister] = React.useState("");

  const Register = () => {
    const user = members.find(
      (user) =>
        user.email === emailRegister && user.password === passwordRegister
    );
    if (user) {
      setMessage("User already exists");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      const data = {
        username,
        email: emailRegister,
        password: passwordRegister,
      };
      createOneMember(data).then((res) => {
        createNewMember(res);
        loginUser(res);
        handleClose();
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"lg"}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          hint: Please use email &quot;aayush@group.com&quot; and password
          &quot;admin123&quot; to login as a admin user. <br />
          all emails allowed to use: admin@group.com, aayush@group.com,
          jack@group.com, krupa@group.com <br />
          if a new user registed, the user will be logged in automatically.
        </DialogContentText>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Login" value="1" />
              <Tab label="Register" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={"aayush@group.com"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              defaultValue={"admin123"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </TabPanel>
          <TabPanel value="2">
            {/* register */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setEmailRegister(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={(e) => setPasswordRegister(e.target.value)}
            />
          </TabPanel>
        </TabContext>
        {message && (
          <Snackbar open={true}>
            <Alert severity="warning">{message}</Alert>
          </Snackbar>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            value === "1" ? Login() : Register();
          }}
          autoFocus
        >
          {value === "1" ? "Login" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

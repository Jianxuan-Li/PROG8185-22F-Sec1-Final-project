import { FormControl, Input, Container, Button, Snackbar } from "@mui/material";
import React, { useContext } from "react";

import MemberContext from "../../context/MemberContext";
import { Payment, ShippingAddress } from "../../models/models";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../CustomSnackbar";

export default function Profile() {
  let navigate = useNavigate();
  const { currentUser } = useContext(MemberContext);
  const [message, setMessage] = React.useState(null);

  var shippingAddress = new ShippingAddress();
  var payment = new Payment();

  var onClick = function () {
    {
      //validate input
      if (shippingAddress.fname === null || shippingAddress.fname === "") {
        alert("Please enter your first name");
        return;
      }
      if (shippingAddress.lname === null || shippingAddress.lname === "") {
        alert("Please enter your last name");
        return;
      }
      if (shippingAddress.address === null || shippingAddress.address === "") {
        alert("Please enter your address");
        return;
      }
      if (shippingAddress.city === null || shippingAddress.city === "") {
        alert("Please enter your city");
        return;
      }
      if (shippingAddress.state === null || shippingAddress.state === "") {
        alert("Please enter your state");
        return;
      }
      if (shippingAddress.zip === null || shippingAddress.zip === "") {
        alert("Please enter your zip code");
        return;
      }
      if (shippingAddress.phone === null || shippingAddress.phone === "") {
        alert("Please enter your phone number");
        return;
      }
      if (shippingAddress.email === null || shippingAddress.email === "") {
        alert("Please enter your email");
        return;
      }
      if (payment.cardNumber === null || payment.cardNumber === "") {
        alert("Please enter your card number");
        return;
      }
      if (payment.expirationDate === null || payment.expirationDate === "") {
        alert("Please enter your expiration date");
        return;
      }
      if (payment.securityCode === null || payment.securityCode === "") {
        alert("Please enter your security code");
        return;
      }

      //TODO: Save address

      currentUser.shippingAddress = shippingAddress;
      currentUser.payment = payment;

      setMessage("Profile updated");

      //goto home home

      setTimeout(() => {
        navigate("/");
      }, 3000);

      //show snackbar mui

      Snackbar.open({
        message: "Profile Saved",
        key: "profileSaved",
        action: (
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              //do something
            }}
          >
            Close
          </Button>
        ),
      });
    }
  };

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <h2>Shipping Address</h2>
      <br />
      <FormControl>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder="First Name"
          value={shippingAddress.firstName}
          onChange={(s) => {
            shippingAddress.fname = s.target.value;
          }}
          required
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder="Last Name"
          value={shippingAddress.lastName}
          onChange={(s) => {
            shippingAddress.lname = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          placeholder="Address"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            shippingAddress.address = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          placeholder="City"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            shippingAddress.city = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          placeholder="State"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            shippingAddress.state = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          placeholder="Zip Code"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            shippingAddress.zip = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          placeholder="Phone Number"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            shippingAddress.phone = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          placeholder="Email"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            shippingAddress.email = s.target.value;
          }}
        />
      </FormControl>

      <br />
      <br />
      <h2>Payment Information</h2>
      <br />
      <FormControl>
        <Input
          placeholder="Card Number"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            payment.cardNumber = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          placeholder="Expiration Date"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            payment.expirationDate = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Input
          placeholder="Security Code"
          id="my-input"
          aria-describedby="my-helper-text"
          onChange={(s) => {
            payment.securityCode = s.target.value;
          }}
        />
      </FormControl>
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={onClick}
      >
        Submit
      </Button>

      <CustomSnackbar message={message} />
    </Container>
  );
}

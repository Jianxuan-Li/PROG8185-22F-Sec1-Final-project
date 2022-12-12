import React, { useContext } from "react";
import "./products.css";
import CartContext from "../../context/CartContext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CustomerSnackbar from "../CustomSnackbar";

import Item from "./item";

export default function Products() {
  const { products } = useContext(CartContext);
  const [message, setMessage] = React.useState(null);

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <Grid container spacing={5} alignItems="flex-end">
        {products.map((item) => (
          // Enterprise card is full width at sm breakpoint
          <Item key={item.id} product={item} onAdded={setMessage} />
        ))}
      </Grid>
      <CustomerSnackbar message={message} />
    </Container>
  );
}

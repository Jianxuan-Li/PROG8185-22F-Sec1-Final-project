import React, { useContext } from "react";
import "./products.css";
import CartContext from "../../context/CartContext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CustomerSnackbar from "../CustomSnackbar";

import { fetchProducts } from "./request";

import Item from "./item";

export default function Products() {
  const { products, setProducts } = useContext(CartContext);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    fetchProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <Grid container spacing={5} alignItems="flex-end">
        {products.map((item, index) => {
          // Enterprise card is full width at sm breakpoint
          return <Item key={index} product={item} onAdded={setMessage} />;
        })}
      </Grid>
      <CustomerSnackbar message={message} />
    </Container>
  );
}

import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import Container from "@mui/material/Container";
import CartItem from "./CartItem";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

import { fetchCart } from "./request";

export default function Products() {
  const { cart, removeFromCart, getSubtotal, getTax, getTotal, setCart } =
    useContext(CartContext);

  React.useEffect(() => {
    fetchCart().then((res) => {
      const newCart = res.map((item) => {
        return {
          ...item.product,
          qty: item.quantity,
          id: item._id,
        };
      });
      setCart(newCart);
    });
  }, []);

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      {/* check if cart is empty */}
      {cart.length === 0 ? (
        <h1>Cart is empty</h1>
      ) : (
        <div>
          <h1>Cart</h1>
          <br />
          <Stack spacing={2}>
            {cart.map((item, index) => (
              <CartItem
                key={item._id + "_" + index}
                item={item}
                removeFromCart={removeFromCart}
              />
            ))}
          </Stack>
          <br />

          <div style={{ float: "right" }}>
            Subtotal: ${getSubtotal()}
            <br />
            Tax: ${getTax()}
            <hr />
            <h3>Total: ${getTotal()}</h3>
            <br />
            <Button variant="contained" color="success">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}

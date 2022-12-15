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
      // extra product and qty from response and set to cart
      /*
      [{
        "_id": "639a96c5c7533eac5bad7bc9",
        "user": "6399eee96897670352fc29e9",
        "product": {
            "_id": "639252b32bde078e42d9bead",
            "title": "Apple iPhone 14",
            "description": "This is a great SmartPhone",
            "image": "image/ug50Y0Ghh.png",
            "price": {
                "$numberDecimal": "14.5"
            },
            "shippingCost": {
                "$numberDecimal": "20.30"
            },
            "__v": 0,
            "createdAt": "2022-12-15T03:38:52.751Z"
        },
        "quantity": 1,
        "createdAt": "2022-12-15T03:38:45.968Z",
        "__v": 0
    },
      // ...]
      */
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

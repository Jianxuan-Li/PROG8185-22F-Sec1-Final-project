import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import Container from "@mui/material/Container";
import CartItem from "./CartItem";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

import { fetchCart, removeByUserId, createOrder } from "./request";
import { getItem } from "@utils/storage";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const { cart, removeFromCart, getSubtotal, getTax, getTotal, setCart } =
    useContext(CartContext);
  const navigate = useNavigate();

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

  const handleCheckout = async () => {
    // get user id
    const userId = getItem("id");
    // get cart items, and extract product id and quantity
    const products = cart.map((item) => {
      return {
        _id: item._id,
        quantity: item.qty,
      };
    });

    // create order
    const order = {
      user: userId,
      products, 
    };

    // send order to backend
    try{
      await createOrder(order);
      await removeByUserId(getItem("id"));
      setCart([]);
      navigate("/profile");
    }catch(err){
      console.log(err);
    }
  };

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
            <Button variant="contained" color="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}

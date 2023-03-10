import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { CartContext } from "../../context/CartContext";
import React, { useContext } from "react";
import { Container, Grid } from "@mui/material";

import { addQuantity, reduceQuantity, removeItem } from "./request";

export default function CartItem({ item, removeFromCart }) {
  const { increaseQty, decreaseQty } = useContext(CartContext);

  const handleIncreaseQty = async (id) => {
    await addQuantity(id);
    increaseQty(item.id);
  };

  const handleDecreaseQty = async (id) => {
    await reduceQuantity(id);
    decreaseQty(item.id);
  };

  const handleRemoveItem = async (id) => {
    await removeItem(id);
    removeFromCart(item.id);
  };

  return (
    <Container>
      <Paper>
        <Grid container direction={"row"}>
          <Grid item xs={2}>
            <img
              src={"/upload/" + item.image}
              alt={item.title}
              style={{ width: "105px", height: "105px" }}
            />
          </Grid>
          <Grid item xs={2}>
            <h3>{item.title}</h3>
          </Grid>
          <Grid item xs={2}>
            Price: ${item.price["$numberDecimal"]}
          </Grid>
          <Grid item xs={2}>
            Qty: {item.qty}
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={() => handleIncreaseQty(item.id)}
            >
              +
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDecreaseQty(item.id)}
              disabled={item.qty < 2 ? true : false}
            >
              -
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleRemoveItem(item.id)}
            >
              - REMOVE
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

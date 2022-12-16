import React from "react";
import moment from "moment";

import { Box, CircularProgress, Container } from "@mui/material";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Collapse,
  Divider,
} from "@mui/material";

import { findOrderByUser } from "./request";

export default function MyOrders() {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      findOrderByUser().then((res) => {
        console.log(res);
        setOrders(res);
        setLoading(false);
      });
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const listItem = (order, orderIndexOfList) => {
    const getSecondary = () => {
      let lines = [];
      lines.push(moment(order.createdAt).format("YYYY-MM-DD HH:mm"));
      lines.push(order.status);
      lines.push("Subtotal: $" + order.subtotal["$numberDecimal"]);
      lines.push("Tax: $" + order.tax["$numberDecimal"]);
      lines.push("Total: $" + order.total["$numberDecimal"]);
      const component = lines.map((line, index) => (
        <div key={order._id + "_" + index}>{line}</div>
      ));
      return <React.Fragment>{component}</React.Fragment>;
    };

    return (
      <React.Fragment key={order._id}>
        <ListItem alignItems="flex-start">
          <ListItemText primary={order._id} secondary={getSecondary()} />
          <Collapse in={true} timeout="auto" unmountOnExit>
            <Box sx={{ width: "100%" }}>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {order.products.map((product, index) => (
                  <React.Fragment key={index + "_order" + product.product._id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src={"/upload/" + product.product.image}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={product.product.title}
                        secondary={
                          product.quantity +
                          " x $" +
                          product.product.price["$numberDecimal"] +
                          " = $" +
                          product.quantity *
                            product.product.price["$numberDecimal"]
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Collapse>
        </ListItem>
        {orderIndexOfList !== orders.length - 1 && (
          <Divider component="li" />
        )}
      </React.Fragment>
    );
  };

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <h1>MyOrders</h1>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {orders.map((order, index) => listItem(order, index))}
      </List>
    </Container>
  );
}

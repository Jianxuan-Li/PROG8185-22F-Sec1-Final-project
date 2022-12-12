import React from "react";
import { Link } from "react-router-dom";

import CartContext from "../../context/CartContext";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Products({ product, onAdded }) {
  const { addToCart } = React.useContext(CartContext);

  return (
    <Grid item key={product.id} xs={12} md={4}>
      <Card>
        <CardHeader
          title={(<Link to={"/product/" + product.id}>{product.name}</Link>)}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{
            align: "center"
          }}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[700]
          }}
        />
        <CardContent>
          <img
            className="productImage"
            src={`${product.img}`}
            srcSet={`${product.img}`}
            alt={product.name}
            loading="lazy"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline"
            }}
          >
            <Typography component="h2" variant="h3" color="text.primary">
              ${product.price}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth onClick={() => {
            if (addToCart(product.id)) {
              onAdded("Added to cart");

            }
            else {
              onAdded("Item already in cart, updating quantity");
            }
          }}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

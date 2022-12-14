import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { addToCart } from "./request";
import { getItem } from "@utils/storage";

export default function Products({ product, onAdded }) {
  const handleAddToCart = async (id) => {
    try {
      const data = {
        user: getItem("id"),
        products: [{ product: id, qty: 1 }],
      };
      if (await addToCart(data)) {
        onAdded("added to cart");
      }
    } catch {
      onAdded("failed to add to cart");
    }
  };

  return (
    <Grid item key={product.id} xs={12} md={4}>
      <Card>
        <CardHeader
          title={<Link to={"/product/" + product._id}>{product.title}</Link>}
          titleTypographyProps={{ align: "center" }}
          subheaderTypographyProps={{
            align: "center",
          }}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
          }}
        />
        <CardContent>
          <img
            className="productImage"
            src={`/upload/${product.image}`}
            srcSet={`/upload/${product.image}`}
            alt={product.name}
            loading="lazy"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <Typography component="h2" variant="h3" color="text.primary">
              ${product.price["$numberDecimal"]}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            onClick={() => {
              if (handleAddToCart(product._id)) {
                onAdded("Added to cart");
              } else {
                onAdded("Item is already in cart!, now updating quantity");
              }
            }}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

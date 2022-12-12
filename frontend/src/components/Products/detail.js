import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./products.css";
import CommentForm from "./commentForm";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import CartContext from "../../context/CartContext";
import Container from "@mui/material/Container";

export default function Products() {
  const { productId } = useParams();
  const { products } = useContext(CartContext);
  const product = products.find((item) => item.id === parseInt(productId));

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <div className="product">
        <div className="product-image">
          <img
            className="productImage"
            src={`${product.img}`}
            srcSet={`${product.img}`}
            alt={product.name}
            loading="lazy"
          />
        </div>
        <div className="product-details">
          <div className="product-title"><h1>{product.name}</h1></div>
          <div className="product-description">{product.description}</div>
        </div>
        <div className="product-price">${product.price}/per</div>
        <div className="product-comments">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {product.comments.map((comment, index) => (
              <ListItem alignItems="flex-start" key={index}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={comment.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        <Rating
                          name="simple-controlled"
                          value={comment.rate}
                          readOnly
                        />
                      </Typography>
                      {comment.text}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="product-comment-form">
            <CommentForm productId={productId} />
        </div>
      </div>
    </Container>
  );
}

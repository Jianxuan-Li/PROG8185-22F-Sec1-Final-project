import React from "react";
import { useParams } from "react-router-dom";
import "./products.css";
import CommentForm from "./commentForm";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Container from "@mui/material/Container";

import { fetchOneProduct, fetchComments } from "./request";

export default function Products() {
  const { productId } = useParams();
  const [product, setProduct] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [loadingComment, setLoadingComment] = React.useState(true);

  React.useEffect(() => {
    // a random delay to simulate a slow network, the delay between 1 and 3 seconds
    const delay = Math.floor(Math.random() * 3 + 1) * 1000;

    setTimeout(() => {
      fetchOneProduct(productId).then((res) => {
        setProduct(res);
        setLoading(false);
      });

      fetchComments(productId).then((res) => {
        setComments(res);
        setLoadingComment(false);
      });
    }, delay);
  }, []);

  if (loading || loadingComment) {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <div className="product">
        <div className="product-image">
          <img
            className="productImage"
            src={`/upload/${product.image}`}
            srcSet={`/upload/${product.image}`}
            alt={product.title}
            loading="lazy"
          />
        </div>
        <div className="product-details">
          <div className="product-title">
            <h1>{product.title}</h1>
          </div>
          <div className="product-description">{product.description}</div>
        </div>
        <div className="product-price">
          ${product.price["$numberDecimal"]}/per
        </div>
        <div className="product-comments">
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {comments.map((comment, index) => (
              <ListItem alignItems="flex-start" key={index}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={comment.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user.username}
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
                          value={comment.rating["$numberDecimal"]}
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

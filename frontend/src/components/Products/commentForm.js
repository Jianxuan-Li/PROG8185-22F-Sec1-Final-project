import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

import MemberContext from "../../context/MemberContext";

import { postCommentOnProduct } from "./request";
import { getItem } from "@utils/storage";

import "./comment.css";

export default function CommentForm({ productId, onCommentPosted }) {
  const { login, currentUser } = useContext(MemberContext);

  const [value, setValue] = React.useState("");
  const [rate, setRate] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if (!login) {
    return <div>Please login to comment</div>;
  }

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const commentData = {
      text: value,
      rating: rate,
      user: getItem("id"),
    };
    await postCommentOnProduct(productId, commentData);
    setValue("");
    setRate(0);
    onCommentPosted();
  };

  return (
    <div className="commentFormContainer">
      <div className="avatar">
        <Avatar alt="Remy Sharp" src={currentUser.avatar} />
      </div>
      <div className="text">
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Comment of this product"
            sx={{ width: "100%" }}
            multiline
            rows={4}
            value={value}
            onChange={handleChange}
          />
        </div>
        <div>
          <Rating
            name="simple-controlled"
            value={rate}
            onChange={(event, newValue) => {
              setRate(newValue);
            }}
          />
        </div>
      </div>
      <div className="postButton">
        <Button variant="contained" onClick={handleCreateComment}>
          Post
        </Button>
      </div>
    </div>
  );
}

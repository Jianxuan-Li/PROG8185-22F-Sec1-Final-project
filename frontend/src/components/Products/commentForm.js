import React, { useContext } from "react";
import moment from "moment";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";

import MemberContext from "../../context/MemberContext";
import CartContext from "../../context/CartContext";

import "./comment.css";

export default function CommentForm({productId}) {
  const { login, currentUser } = useContext(MemberContext);
  const { addComment } = useContext(CartContext);

  const [value, setValue] = React.useState("");
  const [rate, setRate] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if (!login) {
    return <div>Please login to comment</div>;
  }

  const handleCreateComment = (e) => {
    e.preventDefault();
    /*
    const comment = {
        id: 1,
        user: {
          id: 1,
          name: "Aayush",
          avatar: "/avatar/1.jpg",
        },
        created_at: moment().format('MMMM Do YYYY, h:mm:ss'),
        text: "It is a really nice bike, I need it right now.",
        rate: 5,
      },
    */
    const commentData = {
      text: value,
      rate: rate,
      created_at: moment().format("MMMM Do YYYY, h:mm:ss"),
      user: currentUser
    };
    addComment(productId, commentData);
    setValue("");
    setRate(0);
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

import React, { useContext } from "react";
import { Box, Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import LoadingButton from "@mui/lab/LoadingButton";

import MemberContext from "../../context/MemberContext";

import { postCommentOnProduct } from "./request";
import { getItem } from "@utils/storage";

import "./comment.css";

export default function CommentForm({ productId, onCommentPosted }) {
  const { login, currentUser } = useContext(MemberContext);

  const [value, setValue] = React.useState("");
  const [rate, setRate] = React.useState(0);
  const [image, setImage] = React.useState(null);

  const [posting, setPosting] = React.useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  if (!login) {
    return <div>Please login to comment</div>;
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    setPosting(true);
    const commentData = {
      text: value,
      rating: rate,
      image: image,
      user: getItem("id"),
    };
    setTimeout(async () => {
      await postCommentOnProduct(productId, commentData);
      setValue("");
      setRate(0);
      onCommentPosted();
      setPosting(false);
    }, 2000);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
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
          <div>
            <Button variant="contained" component="label">
              Upload Image
              <input hidden accept="image/*" multiple type="file" onChange={handleImageChange} />
            </Button>
          </div>
        </div>

        <div className="postButton">
          <LoadingButton
            size="small"
            onClick={handleCreateComment}
            loading={posting}
            variant="outlined"
            disabled={posting}
          >
            Post
          </LoadingButton>
        </div>
      </div>
    </Box>
  );
}

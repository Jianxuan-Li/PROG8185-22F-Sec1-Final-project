import React from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import {
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Button,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { createProduct } from "./request";

export default function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    createProduct(data).then((res) => {
      console.log(res);
      navigate("/");
    });
  };
  return (
    <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
      <h1>Add Product</h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="i-title">Title</InputLabel>
          <OutlinedInput id="i-title" label="Title" name="title" />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="i-desicription">Description</InputLabel>
          <OutlinedInput
            id="i-desicription"
            label="Description"
            name="description"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="i-amount">Price</InputLabel>
          <OutlinedInput
            id="i-amount"
            name="price"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Price"
          />
        </FormControl>
        <Button variant="contained" component="label">
          <PhotoCamera /> Upload
          <input name="image" hidden accept="image/*" multiple type="file" />
        </Button>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
}

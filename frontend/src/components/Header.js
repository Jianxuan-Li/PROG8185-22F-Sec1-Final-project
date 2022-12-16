import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../context/CartContext";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import Login from "./Login";

import { getAuth, getItem } from "../utils/storage";
import MemberContext from "../context/MemberContext";
import { fetchCart } from "./Cart/request";

export default function DenseAppBar() {
  const { cart, setCart } = React.useContext(CartContext);
  const { login, logout, loginUser } = useContext(MemberContext);

  let navigate = useNavigate();

  const syncCart = async () => {
    fetchCart().then((res) => {
      const newCart = res.map((item) => {
        return {
          ...item.product,
          qty: item.quantity,
          id: item._id,
        };
      });
      setCart(newCart);
    });
  };

  React.useEffect(() => {
    const auth = getAuth();
    if (auth) {
      loginUser(auth);
      syncCart();
    }
  }, []);

  // login dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // logout
  const handleLogout = () => {
    logout();
    setCart([]);
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div" edge="start" sx={{display: "flex"}}>
            <Link to="/" className="navLink">
              Products
            </Link>
            <Box sx={{ ml: 2 }}></Box>
            <Link to="/members" className="navLink">
              Members
            </Link>
            <Box sx={{ ml: 2 }}></Box>
            <Link to="/product/add" className="navLink">
              Add Product
            </Link>
          </Typography>

          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ ml: 2, flexGrow: 1 }}
            edge="start"
          >
          </Typography>

          <Badge badgeContent={cart.length} color="success">
            <IconButton
              size="large"
              aria-label="account of user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon color="inherit" />
            </IconButton>
          </Badge>

          {login === false && (
            <React.Fragment>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClickOpen}
              >
                <AccountCircle />
              </IconButton>
              <Login open={open} handleClose={handleClose} />
            </React.Fragment>
          )}

          {login === true && (
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              sx={{ ml: 2 }}
            >
              <Link to="/profile" className="navLink">
                {getItem("username")}
              </Link>
            </Typography>
          )}

          {login === true && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import React from "react";
import { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const addItemToCart = (id) => {
    const product = products.find((item) => {
      return item._id === id;
    });
    //check if product is already in cart
    const inCart = cart.find((item) => (item.id === id ? true : false));
    if (inCart) {
      return false;
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      return true;
    }
  };

  const removeFromCart = (id) => {
    const product = cart.find((item) => item.id === id);
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  const increaseQty = (id) => {
    const product = cart.find((item) => item.id === id);
    product.qty += 1;
    setCart((prevState) => [...prevState]);
  };

  const decreaseQty = (id) => {
    const product = cart.find((item) => item.id === id);
    if (product.qty > 1) {
      product.qty -= 1;
      setCart((prevState) => [...prevState]);
    }
  };

  //get subtotal
  const getSubtotal = () => {
    return parseFloat(parseFloat(cart.reduce(
      (acc, item) => acc + item.price["$numberDecimal"] * item.qty,
      0
    )).toFixed(2));
  };

  //get tax amount
  const getTax = () => {
    return parseFloat(parseFloat(getSubtotal() * 0.13).toFixed(2));
  };

  //get total
  const getTotal = () => {
    return parseFloat(parseFloat(getSubtotal() + getTax()).toFixed(2));
  };
  const addComment = (id, comment) => {
    const product = products.find((item) => {
      return item._id === parseInt(id);
    });
    product.comments.push(comment);
    setProducts((prevState) => [...prevState, product]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        cart,
        setCart,
        addToCart: addItemToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        getSubtotal,
        getTax,
        getTotal,
        addComment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;

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
    const inCart = cart.find((item) => (item._id === id ? true : false));
    if (inCart) {
      setCart(
        cart.map((item) =>
          item._id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
      return false;
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      return true;
    }
  };

  const removeFromCart = (id) => {
    const product = cart.find((item) => item._id === id);
    setCart((prevState) => prevState.filter((item) => item._id !== product.id));
  };

  const increaseQty = (id) => {
    const product = cart.find((item) => item._id === id);
    product.qty += 1;
    setCart((prevState) => [...prevState]);
  };

  const decreaseQty = (id) => {
    const product = cart.find((item) => item._id === id);
    if (product.qty > 1) {
      product.qty -= 1;
      setCart((prevState) => [...prevState]);
    }
  };

  //get subtotal
  const getSubtotal = () => {
    return cart.reduce(
      (acc, item) => acc + item.price["$numberDecimal"] * item.qty,
      0
    );
  };

  //get tax amount
  const getTax = () => {
    return getSubtotal() * 0.13;
  };

  //get total
  const getTotal = () => {
    return getSubtotal() + getTax();
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

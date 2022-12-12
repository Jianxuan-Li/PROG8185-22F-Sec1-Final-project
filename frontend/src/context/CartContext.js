import React from "react";
import { useState, createContext } from "react";
import moment from "moment";

export const CartContext = createContext();

const items = [
  {
    id: 1,
    name: "Bike",
    price: 400,
    qty: 1,
    img: "/images/bike.jpg",
    description: "Bike description xxxxxxxx",
    comments: [
      {
        id: 1,
        user: {
          id: 1,
          name: "Aayush",
          avatar: "/avatar/1.jpg",
        },
        created_at: moment().format("MMMM Do YYYY, h:mm:ss"),
        text: "It is a really nice bike, I need it right now.",
        rate: 5,
      },
      {
        id: 2,
        user: {
          id: 2,
          name: "Jack",
          avatar: "/avatar/2.jpg",
        },
        created_at: moment().format("MMMM Do YYYY, h:mm:ss"),
        text: "I like it, but I don't need it right now.",
        rate: 2,
      },
    ],
  },
  {
    id: 2,
    name: "Speaker",
    price: 100,
    qty: 1,
    img: "/images/speaker.jpg",
    description: "Speaker description xxxxxxxx",
    comments: [],
  },
  {
    id: 3,
    name: "Watch",
    price: 500,
    qty: 1,
    img: "/images/watch.png",
    description: "Watch description xxxxxxxx",
    comments: [],
  },
  {
    id: 4,
    name: "TV",
    price: 1000,
    qty: 1,
    img: "/images/tv.jpg",
    description: "TV description xxxxxxxx",
    comments: [],
  },
  {
    id: 5,
    name: "Camera",
    price: 2000,
    qty: 1,
    img: "/images/camera.jpg",
    description: "Camera description xxxxxxxx",
    comments: [],
  },
  {
    id: 6,
    name: "Monitor",
    price: 500,
    qty: 1,
    img: "/images/monitor.jpg",
    description: "Monitor description xxxxxxxx",
    comments: [],
  },
];

export const CartProvider = (props) => {
  const [products, setProducts] = useState(items);
  const [cart, setCart] = useState([]);

  const addToCart = (id) => {
    const product = products.find((item) => {
      return item.id === id;
    });
    //check if product is already in cart
    const inCart = cart.find((item) => (item.id === id ? true : false));
    if (inCart) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
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
    return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
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
      return item.id === parseInt(id);
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
        addToCart,
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

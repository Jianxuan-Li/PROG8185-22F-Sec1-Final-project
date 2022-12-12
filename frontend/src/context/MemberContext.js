import React from "react";
import { useState, createContext } from "react";
import { ShippingAddress } from "../models/models";

export const MemberContext = createContext();

const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@group.com",
    password: "admin123",
    avatar: "/avatar/1.jpg",
    shippingAddress: new ShippingAddress(),
  },
  {
    id: 2,
    name: "Aayush",
    email: "aayush@group.com",
    password: "admin123",
    avatar: "/avatar/1.jpg",
    shippingAddress: new ShippingAddress(),
  },
  {
    id: 3,
    name: "Jack",
    email: "jack@group.com",
    password: "admin123",
    avatar: "/avatar/2.jpg",
    shippingAddress: new ShippingAddress(),
  },
  {
    id: 4,
    name: "Krupa",
    email: "krupa@group.com",
    password: "admin123",
    avatar: "/avatar/3.jpg",
    shippingAddress: new ShippingAddress(),
  },
];

export const MemberProvider = (props) => {
  const [members, setMembers] = useState(users);
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const createNewMember = (newMember) => {
    // user id is the last id + 1
    const id = members[members.length - 1].id + 1;
    const newMemberWithId = { id, ...newMember };
    setMembers([...members, newMemberWithId]);
    return newMemberWithId;
  };

  const deleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const editMember = (id, updatedMember) => {
    setMembers(
      members.map((member) => {
        if (member.id === id) {
          return { id, ...updatedMember };
        }
        return member;
      })
    );
  };

  const loginUser = (user) => {
    setLogin(true);
    setCurrentUser(user);
  };

  const logout = () => {
    setLogin(false);
  };

  return (
    <MemberContext.Provider
      value={{
        members,
        createNewMember,
        deleteMember,
        editMember,
        login,
        loginUser,
        logout,
        currentUser,
      }}
    >
      {props.children}
    </MemberContext.Provider>
  );
};

export default MemberContext;

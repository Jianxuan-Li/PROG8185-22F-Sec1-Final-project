import React from "react";
import { useState, createContext } from "react";

export const MemberContext = createContext();

const users = [];

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
    setMembers(members.filter((member) => member._id !== id));
  };

  const editMember = (id, updatedMember) => {
    setMembers(
      members.map((member) => {
        if (member._id === id) {
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
        setMembers,
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

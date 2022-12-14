import React from "react";
import { useState, createContext } from "react";
import { getAuth, clearAuth } from "../utils/storage";

export const MemberContext = createContext();

const users = [];

export const MemberProvider = (props) => {
  const [members, setMembers] = useState(users);
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  React.useEffect(() => {
    const auth = getAuth();
    if (auth) {
      setLogin(true);
      setCurrentUser(auth);
    }
  }, []);

  const createNewMember = (newMember) => {
    // user id is the last id + 1
    setMembers([...members, newMember]);
    return newMember;
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
    setCurrentUser({});
    clearAuth();
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

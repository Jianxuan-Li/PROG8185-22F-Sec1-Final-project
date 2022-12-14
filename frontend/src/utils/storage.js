export const getItem = (key) =>
  sessionStorage.getItem(key) || localStorage.getItem(key) || null;

export const getAuth = (remember) => {
  const getStorage = (r) => {
    return r ? localStorage : sessionStorage;
  };

  const storage = getStorage(remember);

  if (!storage.getItem("username") || !storage.getItem("token")) {
    return false;
  }

  return {
    username: storage.getItem("username"),
    email: storage.getItem("email"),
  };
};

export const saveAuth = (username, email, remember) => {
  const getStorage = (r) => {
    return r ? localStorage : sessionStorage;
  };

  const storage = getStorage(remember);

  storage.setItem("username", username);
  storage.setItem("email", email);
  storage.setItem("remember", remember);
};

export const parseUserData = () => {
  return JSON.parse(getItem("userdata"));
};

export const clearAuth = () => {
  sessionStorage.removeItem("token"); 
  localStorage.removeItem("token");
  sessionStorage.removeItem("username"); 
  localStorage.removeItem("username");
  sessionStorage.removeItem("email"); 
  localStorage.removeItem("email");
  sessionStorage.removeItem("remember"); 
  localStorage.removeItem("remember");
  sessionStorage.removeItem("userdata"); 
  localStorage.removeItem("userdata");
}

import React from "react";

const initialState = {
  loggedUser: false,
  showLoginModal: false,
  userName: "",
  redirect: false
};

export const UserContext = React.createContext(initialState);

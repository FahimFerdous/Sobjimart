import React from "react";

const AuthContext = React.createContext();

/* const AuthProvider = (props) => {
  let user = firebase.auth().currentUser;
  let isUserAuthenticated = false;
  if (user != null) {
    isUserAuthenticated = true;
    console.log(user);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isUserAuthenticated,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}; */

export default AuthContext;

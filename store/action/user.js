export const LOAD_USER = "LOAD_USER";

import User from "../../models/User";

export const loadUser = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://sobjimart-ce728.firebaseio.com/Users.json"
    );

    const resdata = await response.json();

    const loadedUser = [];
    for (const key in resdata) {
      loadedUser.push(
        new User(
          key,
          resdata[key].name,
          resdata[key].email,
          resdata[key].phone,
          resdata[key].address
        )
      );
    }

    dispatch({ type: LOAD_USER, userList: loadedUser });
  };
};

import { LOAD_USER } from "../action/user";

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        users: action.userList,
      };
  }
  return state;
};

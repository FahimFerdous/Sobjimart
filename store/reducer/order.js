import { ADD_ORDER, SET_ORDERS, ADMIN_ORDERS_DATA } from "../action/order";
import Order from "../../models/Orders";

const initialState = {
  orders: [],
  adminOrder: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADMIN_ORDERS_DATA:
      return {
        adminOrder: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.userName,
        action.orderData.email,
        action.orderData.address,
        action.orderData.phone,
        action.orderData.date,
        action.orderData.orderId,
        action.orderData.isDelivered
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }
  return state;
};

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const ADMIN_ORDERS_DATA = "ADMIN_ORDERS_DATA";

import Order from "../../models/Orders";

export const addOrder = (
  cartItems,
  totalAmount,
  userName,
  email,
  phone,
  address,
  OrderId,
  userId
) => {
  return async (dispatch) => {
    const date = new Date().toLocaleDateString();
    const delevered = false;

    const response = await fetch(
      `https://sobjimart-ce728.firebaseio.com/Orders/${userId}.json`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          userName,
          email,
          phone,
          address,
          date: date,
          OrderId,
          isDelivered: delevered,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
        userName: userName,
        email: email,
        phone: phone,
        address: address,
        OrderId: OrderId,
        isDelivered: delevered,
      },
    });
  };
};

export const setOrder = (userId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://sobjimart-ce728.firebaseio.com/Orders/${userId}.json`
    );
    const resData = await response.json();

    const loadedOrder = [];
    for (const key in resData) {
      loadedOrder.push(
        new Order(
          key,
          resData[key].cartItems,
          resData[key].totalAmount,
          resData[key].userName,
          resData[key].email,
          resData[key].address,
          resData[key].phone,
          resData[key].date,
          resData[key].OrderId,
          resData[key].isDelivered
        )
      );
    }
    dispatch({ type: SET_ORDERS, orders: loadedOrder });
  };
};

export const adminOrder = () => {
  return async (dispatch) => {
    const response = await fetch(
      `https://sobjimart-ce728.firebaseio.com/Orders.json`
    );
    const resData = await response.json();

    const loadedOrder = [];
    for (const key in resData) {
      const allOrders = resData[key];
      for (const i in allOrders) {
        loadedOrder.push(
          new Order(
            i,
            allOrders[i].cartItems,
            allOrders[i].totalAmount,
            allOrders[i].userName,
            allOrders[i].email,
            allOrders[i].address,
            allOrders[i].phone,
            allOrders[i].date,
            allOrders[i].OrderId,
            allOrders[i].isDelivered
          )
        );
      }
    }

    dispatch({ type: ADMIN_ORDERS_DATA, orders: loadedOrder });
  };
};

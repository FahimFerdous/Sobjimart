import CartItem from "../../models/CartItem";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/cart";
import { ADD_ORDER } from "../action/order";

const initialState = {
  item: {},
  counterItem: [],
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.unitPrice * addedProduct.minOrder;
      const prodName = addedProduct.name;
      const updatedCounterItems = [...state.counterItem];
      updatedCounterItems.push(addedProduct);

      let updatedOrNewCartItem;
      if (state.item[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.item[addedProduct.id].quantity + 1,
          prodName,
          prodPrice,
          state.item[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodName, prodPrice, prodPrice);
      }
      return {
        ...state,
        item: {
          ...state.item,
          [addedProduct.id]: updatedOrNewCartItem,
        },
        totalAmount: state.totalAmount + prodPrice,
        counterItem: updatedCounterItems,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.item[action.productId];
      console.log("selectedItem");
      console.log(selectedCartItem);
      const removedCounterItems = [...state.counterItem];
      /* console.log("removedItems");
      console.log(removedCounterItems); */
      const removedCounterItem = removedCounterItems.find(
        (item) => item.id === action.productId
      );
      /* console.log("removedItem");
      console.log(removedCounterItem); */

      const itemIdex = removedCounterItems.findIndex(
        (item) => item === removedCounterItem
      );
      /* console.log("Index");
      console.log(itemIdex);
 */
      removedCounterItems.splice(itemIdex, 1);

      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.prodName,
          selectedCartItem.prodPrice,
          selectedCartItem.sum - selectedCartItem.prodPrice
        );
        updatedCartItems = {
          ...state.item,
          [action.productId]: updatedCartItem,
        };
      } else {
        updatedCartItems = { ...state.item };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        item: updatedCartItems,
        counterItem: removedCounterItems,
        totalAmount: state.totalAmount - selectedCartItem.prodPrice,
      };

    case ADD_ORDER: {
      return initialState;
    }
  }
  return state;
};

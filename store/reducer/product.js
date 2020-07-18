import ProductModel from "../../models/ProductModel";
import {
  CREATE_PRODUCT,
  LOAD_PRODUCT,
  SET_FILTERS,
  UPDATE_PRODUCT,
} from "../action/product";

const initialState = {
  products: [],
  filteredProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      const appliedFilters = action.filters;

      const updatedFilteredProducts = state.products.filter((prod) => {
        if (
          !appliedFilters.Vegetables &&
          !appliedFilters.Fruits &&
          !appliedFilters.FishMeat
        ) {
          return true;
        }
        if (appliedFilters.Vegetables && prod.category === "Vegetables") {
          return true;
        }
        if (appliedFilters.Fruits && prod.category === "Fruits") {
          return true;
        }
        if (appliedFilters.FishMeat && prod.category === "FishMeat") {
          return true;
        }
        return false;
      });
      return { ...state, filteredProducts: updatedFilteredProducts };
    case LOAD_PRODUCT:
      return {
        products: action.products,
        filteredProducts: action.products,
      };
    case CREATE_PRODUCT:
      const newProducts = new ProductModel(
        action.productData.id,
        action.productData.category,
        action.productData.name,
        action.productData.unitPrice,
        action.productData.totalQuantity,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.minOrder,
        action.productData.storedDate
      );

      return {
        ...state,
        products: state.products.concat(newProducts),
      };

    case UPDATE_PRODUCT:
      const prodIndex = state.products.findIndex(
        (prod) => prod.id === action.prodId
      );
      const updatedProduct = new ProductModel(
        action.prodId,
        action.productData.category,
        action.productData.name,
        action.productData.unitPrice,
        action.productData.totalQuantity,
        state.products[prodIndex].imageUrl,
        action.productData.description,
        action.productData.minOrder,
        action.productData.storedDate
      );

      const updatedAllProducts = [...state.products];
      updatedAllProducts[prodIndex] = updatedProduct;

      return {
        ...state,
        products: updatedAllProducts,
      };
  }
  return state;
};

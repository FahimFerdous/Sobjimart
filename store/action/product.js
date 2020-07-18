export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const LOAD_PRODUCT = "LOAD_PRODUCT";
export const SET_FILTERS = "SET_FILTERS";

import ProductModel from "../../models/ProductModel";

export const setFilter = (filterSettings) => {
  return { type: SET_FILTERS, filters: filterSettings };
};

export const createProducts = (
  category,
  name,
  unitPrice,
  totalQuantity,
  imageUrl,
  description,
  minOrder
) => {
  return async (dispatch) => {
    const date = new Date().toLocaleDateString();
    const response = await fetch(
      "https://sobjimart-ce728.firebaseio.com/Products.json",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          category,
          name,
          unitPrice,
          totalQuantity,
          imageUrl,
          description,
          minOrder,
          storedDate: date,
        }),
      }
    );
    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        category,
        name,
        unitPrice,
        totalQuantity,
        imageUrl,
        description,
        minOrder,
        storedDate: date,
      },
    });
  };
};

export const loadProducts = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://sobjimart-ce728.firebaseio.com/Products.json"
    );
    const resData = await response.json();
    const productList = [];

    for (const key in resData) {
      productList.push(
        new ProductModel(
          key,
          resData[key].category,
          resData[key].name,
          resData[key].unitPrice,
          resData[key].totalQuantity,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].minOrder,
          resData[key].storedDate
        )
      );
    }
    dispatch({ type: LOAD_PRODUCT, products: productList });
  };
};

export const updateProduct = (
  id,
  category,
  name,
  unitPrice,
  totalQuantity,
  description,
  minOrder
) => {
  return async (dispatch) => {
    const date = new Date().toLocaleDateString();
    await fetch(`https://sobjimart-ce728.firebaseio.com/Products/${id}.json`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category,
        name,
        unitPrice,
        totalQuantity,
        description,
        minOrder,
        storedDate: date,
      }),
    });
    dispatch({
      type: UPDATE_PRODUCT,
      prodId: id,
      productData: {
        category,
        name,
        unitPrice,
        totalQuantity,
        description,
        minOrder,
        storedDate: date,
      },
    });
  };
};

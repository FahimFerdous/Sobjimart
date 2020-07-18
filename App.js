import React, { useState, useEffect } from "react";
import { StyleSheet, AsyncStorage } from "react-native";

import firebase from "firebase";

import { NavigationContainer } from "@react-navigation/native";

import { DrawerNavigator } from "./navigation/MartNavigation";
import { NonUserDrawerNavigator } from "./navigation/AppNavigator";

import { AppLoading } from "expo";
import * as font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import productReducer from "./store/reducer/product";
import cartReducer from "./store/reducer/cart";
import orderReducer from "./store/reducer/order";
import userReducer from "./store/reducer/user";

import AuthContext from "./context/auth-context";

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFont = () => {
  return font.loadAsync({
    regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    SemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    bold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });
};

export default function App() {
  const [isFontLoaded, setisFontLoaded] = useState(false);
  const [user, setUser] = useState(false);

  const loadUser = async () => {
    try {
      let email = await AsyncStorage.getItem("mail");
      let password = await AsyncStorage.getItem("pass");
      if (email != null) {
        setisFontLoaded(false);
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((userCredentital) => {
            setUser(true);
            setisFontLoaded(true);
          })
          .catch((err) => {});
      } else {
        console.log("No User");
      }
    } catch (err) {}
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onFinish={() => {
          setisFontLoaded(true);
        }}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Provider store={store}>
        <NavigationContainer>
          {user ? <DrawerNavigator /> : <NonUserDrawerNavigator />}
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

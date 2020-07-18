import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CategoriesScreen from "../screens/Mart/CategoriesScreen";
import ProductsScreen from "../screens/Mart/ProductsScreen";

import StartScreen from "../screens/Mart/StartScreen";
import ProductDetailsScreen from "../screens/Mart/ProductDetailsScreen";
import AddProductScreen from "../screens/Admin/AddProductScreen";
import UpdateProductsScreen from "../screens/Admin/UpdateProductsScreen";
import OrderConfirmationScreen from "../screens/Mart/OrderConfirmationScreen";
import CartScreen from "../screens/Mart/CartScreen";
import OrdersScreen from "../screens/Mart/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import OrderDetailsScreen from "../screens/Admin/OrderDetailsScreen";

import UserOrder from "../screens/User/UserOrder";

import LoginScreen from "../screens/User/LoginScreen";
import LogoutScreen from "../screens/User/LogoutScreen";
import RegisterScreen from "../screens/User/RegisterScreen";
import ForgotPasswordScreen from "../screens/User/ForgotPasswordScreen";
import UserProfileScreen from "../screens/User/UserProfileScreen";

import firebase from "firebase";

const myStack = createStackNavigator();
const drawer = createDrawerNavigator();

export const OnScreenNavigator = () => {
  return (
    <myStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e6262",
        },
        headerTintColor: "white",
      }}>
      <myStack.Screen name="Categories" component={CategoriesScreen} />
      <myStack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ route }) => ({
          title: route.params.category,
        })}
      />
      <myStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <myStack.Screen
        name="CartDetail"
        component={CartScreen}
        options={{ title: "Your Cart" }}
      />
      <myStack.Screen
        name="OrderDetails"
        component={OrdersScreen}
        options={{ title: "Place Order" }}
      />
      <myStack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{
          title: "Congrats!",
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#f4f4f4",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: "#ff5959",
        }}
      />
    </myStack.Navigator>
  );
};

export const UserNavigator = () => {
  return (
    <myStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e6262",
        },
        headerTintColor: "white",
      }}>
      <myStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <myStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
      <myStack.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{ title: "Profile" }}
      />
      <myStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: "Forgot Password" }}
      />
      <myStack.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ title: "LogOut" }}
      />
    </myStack.Navigator>
  );
};

export const AdminNavigator = () => {
  return (
    <myStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e6262",
        },
        headerTintColor: "white",
      }}>
      <myStack.Screen
        name="dailyUpdate"
        component={UpdateProductsScreen}
        options={{ title: "Daily Update" }}
      />
      <myStack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={({ route }) => ({
          title: route.params.prodId === null ? "Add Item" : "Update Item",
        })}
      />
    </myStack.Navigator>
  );
};

export const secondNavigator = () => {
  return (
    <myStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e6262",
        },
        headerTintColor: "white",
      }}>
      <myStack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{ title: "Add Products" }}
      />
    </myStack.Navigator>
  );
};

const OrderNavigator = () => {
  return (
    <myStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e6262",
        },
        headerTintColor: "white",
      }}>
      <myStack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{ title: "All Orders" }}
      />
    </myStack.Navigator>
  );
};

export const DrawerNavigator = () => {
  let isAdmin = false;

  const User = firebase.auth().currentUser;
  if (User) {
    if (User.email === "admin@sobjimart.com") {
      isAdmin = true;
    }
  }

  return (
    <drawer.Navigator
      drawerType="front"
      drawerStyle={{
        paddingTop: 15,
      }}
      drawerContentOptions={{
        activeTintColor: "#ff5959",
        inactiveTintColor: "#38433c",

        labelStyle: { fontFamily: "SemiBold" },
      }}>
      <drawer.Screen
        name="Categories"
        component={OnScreenNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-apps" size={23} color={color} />
          ),
        }}
      />

      {isAdmin ? (
        <>
          <drawer.Screen
            name="dailyUpdate"
            component={AdminNavigator}
            options={{
              title: "Update Products",
              drawerIcon: ({ color }) => (
                <Ionicons
                  name="ios-add-circle-outline"
                  size={23}
                  color={color}
                />
              ),
            }}
          />

          <drawer.Screen
            name="AddProductScreen"
            component={secondNavigator}
            options={{
              title: "Add Product",
              drawerIcon: ({ color }) => (
                <Ionicons name="md-create" size={23} color={color} />
              ),
            }}
          />

          <drawer.Screen
            name="OrderDetails"
            component={OrderNavigator}
            options={{
              title: "Order Details",
              drawerIcon: ({ color }) => (
                <Ionicons name="ios-basket" size={24} color={color} />
              ),
            }}
          />
          <drawer.Screen
            name="LogOut"
            component={LogoutScreen}
            options={{
              title: "LogOut",
              drawerIcon: ({ color }) => (
                <Ionicons name="ios-log-out" size={24} color={color} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <drawer.Screen
            name="OrderDetails"
            component={UserOrder}
            options={{
              title: "Order Details",
              drawerIcon: ({ color }) => (
                <Ionicons name="ios-basket" size={24} color={color} />
              ),
            }}
          />
          <drawer.Screen
            name="ProfileNav"
            component={UserProfileScreen}
            options={{
              title: "Profile",
              drawerIcon: ({ color }) => (
                <Ionicons name="ios-paper" size={24} color={color} />
              ),
            }}
          />
          <drawer.Screen
            name="LogOut"
            component={LogoutScreen}
            options={{
              title: "LogOut",
              drawerIcon: ({ color }) => (
                <Ionicons name="ios-log-out" size={24} color={color} />
              ),
            }}
          />
        </>
      )}
    </drawer.Navigator>
  );
};

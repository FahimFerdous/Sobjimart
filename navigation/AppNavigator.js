import React from "react";

import ProductsScreen from "../screens/Mart/ProductsScreen";

import ProductDetailsScreen from "../screens/Mart/ProductDetailsScreen";

import OrderConfirmationScreen from "../screens/Mart/OrderConfirmationScreen";
import CartScreen from "../screens/Mart/CartScreen";
import OrdersScreen from "../screens/Mart/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CategoriesScreen from "../screens/Mart/CategoriesScreen";
import StartScreen from "../screens/Mart/StartScreen";
import LoginScreen from "../screens/User/LoginScreen";

import RegisterScreen from "../screens/User/RegisterScreen";
import ForgotPasswordScreen from "../screens/User/ForgotPasswordScreen";

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

export const NonUserDrawerNavigator = () => {
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

      <drawer.Screen
        name="LoginNav"
        component={LoginScreen}
        options={{
          title: "Login",
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-log-in" size={24} color={color} />
          ),
        }}
      />
      <drawer.Screen
        name="RegNav"
        component={RegisterScreen}
        options={{
          title: "SignUp",
          drawerIcon: ({ color }) => (
            <Ionicons name="md-person-add" size={24} color={color} />
          ),
        }}
      />
      <drawer.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: "Reset Password",
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-refresh-circle" size={24} color={color} />
          ),
        }}
      />
    </drawer.Navigator>
  );
};

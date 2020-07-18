import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";

import firebase from "firebase";

import TableView from "../../components/TableView";
import AppTextInput from "../../components/AppTextInput";
import ErrorMessage from "../../components/ErrorMessage";

import { useDispatch, useSelector } from "react-redux";
import * as OrderAction from "../../store/action/order";
import * as UserAction from "../../store/action/user";

const validationSchema = Yup.object({
  userName: Yup.string().required().label("User Name"),
  email: Yup.string().email().required().label("Email"),
  phone: Yup.string().min(11).max(11).required().label("Phone Number"),
  address: Yup.string().required().label("Address"),
});

const OrdersScreen = (props) => {
  const dispatch = useDispatch();
  const user = firebase.auth().currentUser;
  const LoadedUser = async () => {
    await dispatch(UserAction.loadUser());
  };
  useEffect(() => {
    LoadedUser();
  }, [dispatch, user]);
  let selectedUser = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  if (user) {
    const emailList = useSelector((state) => {
      const transformedUserList = [];
      for (const key in state.user.users) {
        transformedUserList.push({
          id: key,
          name: state.user.users[key].name,
          email: state.user.users[key].email,
          address: state.user.users[key].address,
          phone: state.user.users[key].phone,
        });
      }
      return transformedUserList;
    });

    for (let x = 0; x < emailList.length; x++) {
      if (emailList[x].email === user.email) {
        selectedUser.name = emailList[x].name;
        selectedUser.email = emailList[x].email;
        selectedUser.phone = emailList[x].phone;
        selectedUser.address = emailList[x].address;

        break;
      }
    }
  } else {
    Alert.alert("Login", "Don't want to put info everytime?", [
      {
        text: "Login",
        style: "default",
        onPress: () => {
          props.navigation.navigate("LoginNav");
        },
      },
    ]);
  }
  const CartItemTotal = useSelector((state) => state.cart.totalAmount);

  const cartItem = useSelector((state) => {
    const transformedCartItem = [];
    for (const key in state.cart.item) {
      transformedCartItem.push({
        prodId: key,
        prodName: state.cart.item[key].prodName,
        quantity: state.cart.item[key].quantity,
        prodPrice: state.cart.item[key].prodPrice,
        sum: state.cart.item[key].sum,
      });
    }
    return transformedCartItem.sort((a, b) => (a.prodId > b.prodId ? 1 : -1));
  });

  const addOrderHandler = async (userName, email, phone, address) => {
    const nameExtract = userName.substring(0, 3).toUpperCase();
    const NumExtract = phone.toString().substring(3, 6);
    const emailExtract = email.substring(2, 4).toUpperCase();
    const randNum = Math.floor(Math.random() * 10) + 1;
    const lastdigits = randNum.toString();

    const OrderNumber =
      nameExtract + NumExtract + emailExtract + randNum + lastdigits;
    await dispatch(
      OrderAction.addOrder(
        cartItem,
        CartItemTotal,
        userName,
        email,
        phone,
        address,
        OrderNumber,
        user.uid
      )
    );
    props.navigation.navigate("OrderConfirmation", { code: OrderNumber });
  };

  if (!selectedUser) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff5959" />
      </View>
    );
  }
  return (
    <View style={styles.halfscreen}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Items in Cart</Text>
        </View>
        <View style={styles.tableContainer}>
          <ScrollView>
            {cartItem.map((item) => (
              <TableView
                key={item.prodId}
                productName={item.prodName}
                quantity={item.quantity}
                price={item.sum}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.totalItemContainer}>
          <Text style={styles.totalItemText}>Total Amount</Text>
          <Text style={styles.totalItemText}>= {CartItemTotal}</Text>
        </View>
      </View>

      <View style={styles.addressContainer}>
        <View>
          <Text style={styles.addressheader}>Billing Address</Text>
        </View>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
            <Formik
              initialValues={{
                userName: selectedUser.name,
                email: selectedUser.email,
                phone: selectedUser.phone,
                address: selectedUser.address,
              }}
              onSubmit={(values) =>
                addOrderHandler(
                  values.userName,
                  values.email,
                  values.phone,
                  values.address
                )
              }
              validationSchema={validationSchema}>
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldTouched,
              }) => (
                <>
                  <AppTextInput
                    style={styles.form}
                    icon="account"
                    placeholder="User Name"
                    value={values.userName}
                    onChangeText={handleChange("userName")}
                    keyboardType="default"
                    onBlur={() => setFieldTouched("userName")}
                  />
                  <ErrorMessage
                    error={errors.userName}
                    visible={touched.userName}
                  />
                  <AppTextInput
                    icon="email"
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    keyboardType="email-address"
                    onBlur={() => setFieldTouched("email")}
                  />
                  <ErrorMessage error={errors.email} visible={touched.email} />
                  <AppTextInput
                    icon="cellphone"
                    placeholder="Phone Number"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                    keyboardType="decimal-pad"
                    onBlur={() => setFieldTouched("phone")}
                  />
                  <ErrorMessage error={errors.phone} visible={touched.phone} />
                  <AppTextInput
                    icon="home"
                    placeholder="Address"
                    value={values.address}
                    onChangeText={handleChange("address")}
                    keyboardType="default"
                    onBlur={() => setFieldTouched("address")}
                    multiline
                  />
                  <ErrorMessage
                    error={errors.address}
                    visible={touched.address}
                  />

                  <Button
                    title="Place Order"
                    onPress={handleSubmit}
                    color="#ff5959"
                  />
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  halfscreen: {
    maxHeight: "50%",
  },
  headerContainer: {
    alignItems: "center",
    //backgroundColor: "#666666",
    width: "100%",
    padding: 10,
  },
  headerText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#666666",
  },
  tableContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#e0e0e0",
    height: "70%",
  },
  totalItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    //backgroundColor: "#666666",
    width: "100%",
    //height: "15%",
  },
  totalItemText: {
    fontSize: 18,
    fontFamily: "SemiBold",
    color: "#ff5959",
  },
  addressContainer: {
    margin: 10,
    maxHeight: "95%",
    marginBottom: 20,
  },
  addressheader: {
    fontFamily: "medium",
    fontSize: 16,
    textAlign: "center",
    padding: 5,
    color: "#666666",
  },
  form: {},
});

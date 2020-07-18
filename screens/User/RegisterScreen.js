import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AppTextInput from "../../components/AppTextInput";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import Spinner from "react-native-loading-spinner-overlay";
import ErrorMessage from "../../components/ErrorMessage";

import firebase from "firebase";

const validationSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
  phone: Yup.number().required().label("Phone"),
  address: Yup.string().required().label(" Address"),
});

const RegisterScreen = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const CreateUserHandler = (name, email, password, phone, address) => {
    setisLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.database().ref("Users").push({ email, name, phone, address });
        setisLoading(false);
        props.navigation.navigate("LoginNav");
      })
      .catch((err) => {
        var message = err.toString();

        setisLoading(false);
        Alert.alert("Sign up Error", message, [
          {
            text: "Ok",
            style: "default",
          },
        ]);
      });
  };

  return (
    <>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <View style={styles.iconContainer}>
            <Ionicons name="ios-arrow-dropleft" size={26} color="#8e8e8e" />
          </View>
        </TouchableOpacity>
        <View style={styles.screen}>
          <Spinner
            visible={isLoading}
            textContent={"Signing up..."}
            textStyle={styles.spinner}
          />
          <View style={{ width: "90%" }}>
            <Image
              source={require("../../assets/sobjimart-2.png")}
              style={{ width: "100%", height: 70 }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.headerText}>Signup for SobjiMart</Text>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
            <View style={styles.addressBox}>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
                  password: "",
                }}
                onSubmit={(values, actions) => {
                  CreateUserHandler(
                    values.name,
                    values.email.toLowerCase(),
                    values.password,
                    values.phone,
                    values.address
                  );
                  actions.resetForm();
                }}
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
                    <View style={styles.textBox}>
                      <AppTextInput
                        icon="account"
                        placeholder="Your Name"
                        value={values.name}
                        onChangeText={handleChange("name")}
                        keyboardType="default"
                        onBlur={() => setFieldTouched("name")}
                      />
                      <ErrorMessage
                        error={errors.name}
                        visible={touched.name}
                      />
                    </View>
                    <View style={styles.textBox}>
                      <AppTextInput
                        placeholder="Email"
                        icon="email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        keyboardType="email-address"
                        onBlur={() => setFieldTouched("email")}
                      />
                      <ErrorMessage
                        error={errors.email}
                        visible={touched.email}
                      />
                    </View>
                    <View style={styles.textBox}>
                      <AppTextInput
                        placeholder="Password"
                        icon="textbox-password"
                        value={values.password}
                        secureTextEntry
                        onChangeText={handleChange("password")}
                        keyboardType="default"
                        onBlur={() => setFieldTouched("password")}
                      />
                      <ErrorMessage
                        error={errors.password}
                        visible={touched.password}
                      />
                    </View>
                    <View style={styles.textBox}>
                      <AppTextInput
                        placeholder="Phone Number"
                        icon="cellphone"
                        value={values.phone}
                        onChangeText={handleChange("phone")}
                        keyboardType="number-pad"
                        onBlur={() => setFieldTouched("phone")}
                      />
                      <ErrorMessage
                        error={errors.phone}
                        visible={touched.phone}
                      />
                    </View>
                    <View style={styles.textBox}>
                      <AppTextInput
                        placeholder="Address"
                        icon="home"
                        multiline
                        maxLength={100}
                        numberOfLines={5}
                        value={values.address}
                        onChangeText={handleChange("address")}
                        keyboardType="default"
                        retrunKeyType="done"
                        onBlur={() => setFieldTouched("address")}
                      />
                      <ErrorMessage
                        error={errors.address}
                        visible={touched.address}
                      />
                    </View>
                    <View style={styles.innerButtonContainer}>
                      <Button
                        title="Register"
                        color="#ff5959"
                        //onPress={submitHandler}
                        onPress={handleSubmit}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  iconContainer: {
    paddingTop: 60,
    paddingLeft: 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  headerText: {
    fontFamily: "SemiBold",
    fontSize: 20,
    color: "#ff5959",
    marginTop: "5%",
  },
  addressBox: {
    margin: 20,
  },
  textBox: {
    margin: 5,
  },
  spinner: {
    color: "#FFF",
    fontFamily: "medium",
    fontSize: 16,
  },
  innerButtonContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#ff5959",
    marginRight: 5,
    overflow: "hidden",
    marginTop: 10,
  },
});

import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  AsyncStorage,
} from "react-native";
import AppTextInput from "../../components/AppTextInput";
import { Ionicons } from "@expo/vector-icons";

import firebase from "firebase";

import { Formik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "../../components/ErrorMessage";
import AuthContext from "../../context/auth-context";
import Spinner from "react-native-loading-spinner-overlay";

const validationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const LoginScreen = (props) => {
  const storeUser = async (email, password) => {
    try {
      await AsyncStorage.setItem("mail", email);
      await AsyncStorage.setItem("pass", password);
    } catch (err) {}
  };
  const [isLoading, setisLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const userLoginHandler = (email, password) => {
    setisLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentital) => {
        storeUser(email, password);
        setisLoading(false);
        authContext.setUser(true);
      })
      .catch((err) => {
        var message = err.toString();
        setisLoading(false);
        Alert.alert("Login Error", message, [
          {
            text: "Ok",
            style: "default",
          },
        ]);
      });
  };
  return (
    <>
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
          textContent={"Signing in..."}
          textStyle={styles.spinner}
        />
        <View style={{ width: "90%", marginTop: "10%", marginBottom: 70 }}>
          <Image
            source={require("../../assets/sobjimart-2.png")}
            style={{ width: "100%", height: 130 }}
            resizeMode="contain"
          />
        </View>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, actions) => {
              userLoginHandler(values.email, values.password);
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
                <View style={styles.input}>
                  <AppTextInput
                    placeholder="Email"
                    icon="account-arrow-right"
                    value={values.email}
                    onChangeText={handleChange("email")}
                    keyboardType="email-address"
                    onBlur={() => setFieldTouched("email")}
                    style={styles.inputBox}
                  />
                  <ErrorMessage error={errors.email} visible={touched.email} />
                </View>
                <View style={styles.input}>
                  <AppTextInput
                    placeholder="Password"
                    icon="textbox-password"
                    value={values.password}
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    keyboardType="default"
                    onBlur={() => setFieldTouched("password")}
                    style={styles.inputBox}
                  />
                  <ErrorMessage
                    error={errors.password}
                    visible={touched.password}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.innerButtonContainer}>
                    <Button
                      title="Login"
                      color="#ff5959"
                      //onPress={submitHandler}
                      onPress={handleSubmit}
                    />
                  </View>
                  <View style={styles.innerButtonContainer2}>
                    <Button
                      title="Register"
                      color="#003152"
                      onPress={() => {
                        props.navigation.navigate("RegNav");
                      }}
                    />
                  </View>
                </View>
                <View style={styles.forgotPassword}>
                  <TouchableHighlight
                    onPress={() => {
                      props.navigation.navigate("ForgotPassword");
                    }}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableHighlight>
                </View>
              </>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default LoginScreen;

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
    padding: 10,
  },
  spinner: {
    color: "#FFF",
    fontFamily: "medium",
    fontSize: 16,
  },
  input: {
    margin: 10,
  },
  inputBox: {
    margin: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 20,
  },
  error: {
    fontFamily: "regular",
    fontSize: 14,
    color: "red",
  },
  innerButtonContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#ff5959",
    width: "50%",
    marginRight: 5,
    overflow: "hidden",
  },
  innerButtonContainer2: {
    borderWidth: 1,
    borderRadius: 30,

    borderColor: "#003152",
    width: "50%",
    overflow: "hidden",
  },
  forgotPassword: {
    marginTop: 15,
  },
  forgotText: {
    fontFamily: "medium",
    fontSize: 14,
    textDecorationLine: "underline",
    textDecorationColor: "blue",
    color: "blue",
    textAlign: "center",
  },
});

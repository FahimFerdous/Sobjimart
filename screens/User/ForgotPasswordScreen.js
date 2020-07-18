import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import AppTextInput from "../../components/AppTextInput";
import { Ionicons } from "@expo/vector-icons";

import Spinner from "react-native-loading-spinner-overlay";

import firebase from "firebase";

const ForgotPasswordScreen = (props) => {
  const [email, setemail] = useState("");
  const [Error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const resetPasswordHandler = () => {
    setisLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setisLoading(false);
        setError("");
        Alert.alert(
          "Check your Email",
          "An Password Reset Email has been sent to your mail Addrees",
          [
            {
              text: "Ok",
              style: "default",
              onPress: () => {
                props.navigation.navigate("Categories");
                setemail("");
              },
            },
          ]
        );
      })
      .catch((error) => {
        setisLoading(false);
        setError("Wrong Email. Please enter correct email address ");
        setemail("");
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
        <KeyboardAvoidingView>
          <Spinner
            visible={isLoading}
            textContent={"Submitting..."}
            textStyle={styles.spinner}
          />
          <View>
            <Text style={styles.text}>Forgot Your Password?</Text>
          </View>
          <AppTextInput
            icon="email"
            placeholder="Enter your Email"
            value={email}
            onChangeText={(text) => {
              setemail(text);
            }}
            keyboardType="default"
          />
          <Text style={styles.error}>{Error}</Text>

          <View style={styles.innerButtonContainer}>
            <Button
              title="Submit"
              color="#ff5959"
              //onPress={submitHandler}
              onPress={resetPasswordHandler}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  iconContainer: {
    paddingTop: 60,
    paddingLeft: 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",

    margin: 10,
    padding: 15,
  },
  spinner: {
    color: "#FFF",
    fontFamily: "medium",
    fontSize: 16,
  },
  text: {
    fontFamily: "medium",
    fontSize: 16,
    paddingBottom: 10,
    color: "#EA3C53",
    textAlign: "left",
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

    marginRight: 5,
    marginTop: 6,
    overflow: "hidden",
  },
});

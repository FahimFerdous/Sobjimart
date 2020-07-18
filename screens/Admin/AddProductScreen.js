import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
  KeyboardAvoidingView,
  ToastAndroid,
  ScrollView,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Formik } from "formik";
import * as Yup from "yup";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../../components/HeaderButton";
import * as ImagePicker from "expo-image-picker";

import Fire from "../../Firebase";

import ItemImagePicker from "../../components/ItemImagePicker";
import ErrorMessage from "../../components/ErrorMessage";

import AppTextInput from "../../components/AppTextInput";
import CategoryPicker from "../../components/CategoryPicker";

import * as ProductAction from "../../store/action/product";

const validationSchema = Yup.object({
  name: Yup.string().required().label("Product name"),
  Category: Yup.string().required().label("Category"),
  description: Yup.string().required().label("Description"),
  unitPrice: Yup.number().required().label("Unit Price"),
  totalQuantity: Yup.number().required().label("Total Quantity"),
  minOrder: Yup.number().required().label("Min Order"),
});

const AddProductScreen = (props) => {
  const Categories = [
    { label: "Vegetables", value: "Vegetables" },
    { label: "Fruits", value: "Fruits" },
    { label: "Fish & Meat", value: "FishMeat" },
  ];

  let prodId = props.route.params ? props.route.params.prodId : "";

  const EditedProduct = useSelector((state) =>
    state.product.products.find((prod) => prod.id === prodId)
  );

  const [imageLink, setimageLink] = useState(
    EditedProduct ? EditedProduct.imageUrl : null
  );

  const [isSave, setisSave] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.cancelled) {
      setimageLink(result.uri);
    }
  };

  props.navigation.setOptions({
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-list"
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="create" iconName="ios-create" onPress={AddScreenHandler} />
      </HeaderButtons>
    ),
  });

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const dispatch = useDispatch();

  const submitHandler = (
    Category,
    name,
    unitPrice,
    totalQuantity,
    description,
    minOrder
  ) => {
    if (EditedProduct) {
      dispatch(
        ProductAction.updateProduct(
          prodId,
          Category,
          name,
          +unitPrice,
          +totalQuantity,
          description,
          +minOrder
        )
      );
      showToast("Product Updated!");
      props.navigation.goBack();
    } else {
      setisSave(true);
      Fire.shared.uploadPhotoAsync(imageLink).then((value) => {
        dispatch(
          ProductAction.createProducts(
            Category,
            name,
            +unitPrice,
            +totalQuantity,
            value,
            description,
            +minOrder
          )
        );
        setimageLink(null);
        setisSave(false);
        showToast("Product Saved!");
      });
    }
  };

  const cancelHandler = () => {
    props.navigation.goBack();
  };
  const AddScreenHandler = () => {
    props.navigation.navigate("AddProductScreen", {
      prodId: null,
    });
  };

  return (
    <KeyboardAvoidingView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F5FCFF",
        }}>
        <Spinner
          visible={isSave}
          textContent={"SAVING..."}
          textStyle={styles.spinner}
        />
      </View>
      <ScrollView>
        <View style={styles.screen}>
          <Formik
            initialValues={{
              name: EditedProduct ? EditedProduct.name : "",
              Category: EditedProduct ? EditedProduct.category : "",
              description: EditedProduct ? EditedProduct.description : "",

              unitPrice: EditedProduct
                ? EditedProduct.unitPrice.toString()
                : "",
              totalQuantity: EditedProduct
                ? EditedProduct.totalQuantity.toString()
                : "",
              minOrder: EditedProduct ? EditedProduct.minOrder.toString() : "",
            }}
            onSubmit={(values, actions) => {
              submitHandler(
                values.Category,
                values.name,
                values.unitPrice,
                values.totalQuantity,
                values.description,
                values.minOrder
              );
              actions.resetForm();
            }}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
              errors,
              touched,
              setFieldTouched,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <AppTextInput
                    style={styles.inputBox}
                    placeholder="Product Name"
                    value={values.name}
                    icon="alpha-p-circle"
                    onChangeText={handleChange("name")}
                    keyboardType="default"
                    onBlur={() => setFieldTouched("name")}
                  />
                  <ErrorMessage error={errors.name} visible={touched.name} />
                </View>
                <View style={styles.inputContainer}>
                  <CategoryPicker
                    selectedItem={values.Category}
                    //onSelectItem={(item) => setCategory(item.value)}
                    onSelectItem={(item) =>
                      setFieldValue("Category", item.value)
                    }
                    icon="apps"
                    placeHolder="Category"
                    Items={Categories}
                  />
                  <ErrorMessage
                    error={errors.Category}
                    visible={touched.Category}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <AppTextInput
                    style={styles.inputBox}
                    placeholder="Product Description"
                    value={values.description}
                    icon="alpha-d-circle"
                    onChangeText={handleChange("description")}
                    multiline
                    keyboardType="default"
                    onBlur={() => setFieldTouched("description")}
                  />
                  <ErrorMessage
                    error={errors.description}
                    visible={touched.description}
                  />
                </View>
                <View style={styles.inputContainer}>
                  {/* <AppTextInput
                    style={styles.inputBox}
                    placeholder="Image Url"
                    value={values.imageUrl}
                    onChangeText={handleChange("imageUrl")}
                    keyboardType="default"
                    onBlur={() => setFieldTouched("imageUrl")}
                  /> */}
                  {!EditedProduct && (
                    <ItemImagePicker imageUrl={imageLink} onPress={pickImage} />
                  )}
                  {/* <ErrorMessage
                    error={errors.imageUrl}
                    visible={touched.imageUrl}
                  /> */}
                </View>
                <View style={styles.numberContainer}>
                  <View style={styles.inputContainer2}>
                    <AppTextInput
                      style={styles.inputBox}
                      placeholder="Unit Price"
                      value={values.unitPrice}
                      icon="currency-bdt"
                      onChangeText={handleChange("unitPrice")}
                      keyboardType="decimal-pad"
                      onBlur={() => setFieldTouched("unitPrice")}
                    />
                    <ErrorMessage
                      error={errors.unitPrice}
                      visible={touched.unitPrice}
                    />
                  </View>
                  <View style={styles.inputContainer2}>
                    <AppTextInput
                      style={styles.inputBox}
                      placeholder="Total Quantity"
                      value={values.totalQuantity}
                      icon="basket"
                      onChangeText={handleChange("totalQuantity")}
                      keyboardType="decimal-pad"
                      onBlur={() => setFieldTouched("totalQuantity")}
                    />
                    <ErrorMessage
                      error={errors.totalQuantity}
                      visible={touched.totalQuantity}
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <AppTextInput
                    style={styles.inputBox}
                    placeholder="Minimum Order Amount"
                    value={values.minOrder}
                    icon="basket-fill"
                    onChangeText={handleChange("minOrder")}
                    keyboardType="decimal-pad"
                    onBlur={() => setFieldTouched("minOrder")}
                  />
                  <ErrorMessage
                    error={errors.minOrder}
                    visible={touched.minOrder}
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <View style={styles.innerButtonContainer}>
                    <Button
                      title="submit"
                      color="#ff5959"
                      //onPress={submitHandler}
                      onPress={handleSubmit}
                    />
                  </View>
                  <View style={styles.innerButtonContainer2}>
                    <Button
                      title="back"
                      color="#003152"
                      onPress={cancelHandler}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  spinner: {
    color: "#FFF",
    fontFamily: "medium",
    fontSize: 16,
  },
  inputContainer: {
    margin: 10,

    borderColor: "#071a52",
    width: 340,
    maxWidth: "100%",
  },
  inputBox: {
    padding: 5,
    width: "100%",
  },
  numberContainer: {
    flexDirection: "row",
  },
  inputContainer2: {
    margin: 10,

    width: 160,
  },
  buttonContainer: {
    margin: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerButtonContainer: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#ff5959",
    width: "45%",
    overflow: "hidden",
  },
  innerButtonContainer2: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#003152",
    width: "45%",
    overflow: "hidden",
  },
});

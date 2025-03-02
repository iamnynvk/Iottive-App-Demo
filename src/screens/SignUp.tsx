import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Formik, FormikProps } from "formik";
import { object, string } from "yup";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addCurrentUser, addUser } from "../slices/userSlice";
import { useNavigation } from "@react-navigation/native";

// Validation schema using Yup
let signUpValidation = object({
  username: string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: string()
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .required("Password is required"),
});

export interface FormValues {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSignUpHandler = async (values: FormValues) => {
    dispatch(addUser(values));
    dispatch(addCurrentUser(values));
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      });
    }, 1000);
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={signUpValidation}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={onSignUpHandler}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
      }: FormikProps<FormValues>) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Sign-Up</Text>
            <View style={styles.userInputContainer}>
              <TextInput
                label="Username"
                style={{ backgroundColor: "#EFE9ED" }}
                value={values.username}
                onBlur={() => {
                  setFieldTouched("username");
                  handleBlur("username");
                }}
                onChangeText={handleChange("username")}
              />
              {touched.username && errors.username && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errors.username}</Text>
                </View>
              )}

              <TextInput
                label="Email"
                style={{ backgroundColor: "#EFE9ED" }}
                value={values.email}
                onBlur={() => {
                  setFieldTouched("email");
                  handleBlur("email");
                }}
                onChangeText={handleChange("email")}
                style={{ marginTop: 10 }}
              />
              {touched.email && errors.email && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errors.email}</Text>
                </View>
              )}

              <TextInput
                label="Password"
                style={{ backgroundColor: "#EFE9ED" }}
                value={values.password}
                onBlur={() => {
                  setFieldTouched("password");
                  handleBlur("password");
                }}
                onChangeText={handleChange("password")}
                secureTextEntry={true}
                style={{ marginTop: 10 }}
              />
              {touched.password && errors.password && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errors.password}</Text>
                </View>
              )}
            </View>

            <View style={styles.submitContainer}>
              <Button mode="contained" onPress={handleSubmit}>
                Sign Up
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    height: "100%",
  },
  userInputContainer: {
    padding: 8,
  },
  submitContainer: {
    marginTop: 30,
    padding: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    alignItems: "center",
    marginStart: 2,
  },
});

export default SignUp;

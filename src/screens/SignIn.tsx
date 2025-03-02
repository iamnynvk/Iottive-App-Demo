import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Formik, FormikProps } from "formik";
import { object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FormValues } from "./SignUp";
import { addCurrentUser, setIsAuthenticating } from "../slices/userSlice";

// Login validation using yup with email regex
let loginValidation = object({
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

interface IFormValues {
  email: string;
  password: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userData } = useSelector((state: any) => state.user);

  const onSignInHandler = async (values: IFormValues) => {
    const result = userData.filter((records: FormValues) => {
      return (
        values.email === records?.email &&
        values?.password === records?.password
      );
    });
    if (result.length > 0) {
      dispatch(setIsAuthenticating(true));
      dispatch(addCurrentUser(result[0]));
      navigation?.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      alert("User not valid!");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidation}
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={onSignInHandler}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
      }: FormikProps<IFormValues>) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.titleText}>Sign-In</Text>
            <View style={styles.userInputContainer}>
              <TextInput
                label="Email"
                style={{ backgroundColor: "#EFE9ED" }}
                value={values.email}
                onBlur={() => {
                  setFieldTouched("email");
                  handleBlur("email");
                }}
                onChangeText={handleChange("email")}
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

            {/* Submit Button Here */}
            <View style={styles.submitContainer}>
              <Button mode="contained" onPress={handleSubmit}>
                Sign in
              </Button>
              <Text style={styles.signUpText}>
                Don't have an account?{" "}
                <Text
                  onPress={() => navigation?.navigate("SignUp")}
                  style={{ color: "#3E3453", fontWeight: "bold" }}
                >
                  SignUp
                </Text>
              </Text>
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
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    alignItems: "center",
    marginStart: 2,
  },
  signUpText: {
    marginTop: 10,
    textAlign: "center",
  },
});

export default SignIn;

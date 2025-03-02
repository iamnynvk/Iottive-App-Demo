import { Dimensions, Platform } from "react-native";

export const COLORS = {
  white: "#FFFFFF",
  black: "#000000",
  background: "#EEEEEE",
  lightBackground: "#F5F5F5",
  darkBackground: "#CCCCCC",
  primary: "#B3251E",
  primaryLight: "#E14A3C",
  primaryDark: "#801C16",
  secondary: "#424874",
  secondaryLight: "#676A92",
  secondaryDark: "#2E334D",
  success: "#4CAF50",
  warning: "#FFC107",
  danger: "#FF2E63",
  info: "#2196F3",
  text: "#333333",
  mutedText: "#666666",
  labelColor: "#3F72AF",
  lightGray: "#D6D6D6",
  mediumGray: "#A9A9A9",
  darkGray: "#707070",
  buttonPrimary: "#B3251E",
  buttonSecondary: "#424874",
  buttonDisabled: "#A9A9A9",
};

export const SCREEN_HEIGHT: any = Dimensions.get("screen").height;
export const SCREEN_WIDTH: any = Dimensions.get("screen").width;

export const IOS_DEVICE = Platform.OS === "ios";
export const ANDROID_DEVICE = Platform.OS === "android";

const appTheme = { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH };

export default appTheme;

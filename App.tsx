import { StatusBar } from "react-native";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
          <Routes />
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
}

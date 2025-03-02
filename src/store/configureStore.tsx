import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import userReducer from "../slices/userSlice";
import folderReducer from "../slices/folderSlice";

const persistConfig = {
  key: "root",
  whitelist: ["user", "folder"],
  storage: AsyncStorage,
};

const reducer = combineReducers({
  user: userReducer,
  folder: folderReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { store, persistor };

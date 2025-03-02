import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserState {
  userData: User[];
  currentUser: any;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userData: [],
  currentUser: {},
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.userData.push(action.payload);
    },
    addCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setIsAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearData: (state) => {
      state.currentUser = {};
      isAuthenticated = false;
    },
  },
});

export const { addUser, addCurrentUser, setIsAuthenticating, clearData } =
  userSlice.actions;

export default userSlice.reducer;

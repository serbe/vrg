import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../models/user';
import { RootState } from './store';

interface AuthState {
  user: User;
  login: boolean;
  check: boolean;
  fetch: boolean;
}

const initialState: AuthState = {
  user: { role: 0, name: "", token: "" },
  login: false,
  check: false,
  fetch: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //   get getUser(): User {
    //     return this.user;
    //   }

    //   get getLogin(): boolean {
    //     return this.login;
    //   }

    //   get getToken(): string {
    //     return this.user.token;
    //   }

    //   get getRole(): number {
    //     return this.user.role;
    //   }

    //   get isFetching(): boolean {
    //     return this.fetching;
    //   }

    //   get isChecking(): boolean {
    //     return this.check;
    //   }

    setAuth: (state, action: PayloadAction<{ user: User; login: boolean }>) => {
      // setStorage(action.payload.user);
      state.user = action.payload.user;
      state.login = action.payload.login;
      state.check = true;
    },
    clearAuth: (state) => {
      // clearStorage();
      state.user = { role: 0, name: "", token: "" };
      state.login = false;
      state.check = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload;
    },
    setCheck: (state, action: PayloadAction<boolean>) => {
      state.check = action.payload;
    },
    setFetch: (state, action: PayloadAction<boolean>) => {
      state.fetch = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setUser, setLogin, setCheck, setFetch } = authSlice.actions;

export const getUser = (state: RootState) => state.auth.user;
export const getLogin = (state: RootState) => state.auth.login;
export const getToken = (state: RootState) => state.auth.user.token;
export const getRole = (state: RootState) => state.auth.user.role;
export const isFetching = (state: RootState) => state.auth.fetch;
export const isChecking = (state: RootState) => state.auth.check;

export default authSlice.reducer;

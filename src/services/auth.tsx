import type { Dispatch, ReactNode } from 'react';
import { createContext, useContext, useMemo, useReducer } from 'react';
import type { User } from '../models/types';
import { clearStorage, getStorage, setStorage } from './storage';

const checkUrl = (import.meta.env.VITE_APP_CHECKURL as string) || '/go/check';
const loginURL = (import.meta.env.VITE_APP_LOGINURL as string) || '/go/login';
const jsonType = 'application/json';

interface LoginResponse {
  t: string;
  r: number;
}

export const postLogin = async (name: string, pass: string): Promise<LoginResponse> =>
  fetch(loginURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': jsonType,
    },
    body: JSON.stringify({ u: name, p: btoa(pass) }),
  })
    .then(async (response) => response.json())
    .then((jsonResponse) => {
      return jsonResponse as LoginResponse;
    });

interface CheckResponse {
  r: boolean;
}

export const postCheck = async (user: User): Promise<User> => {
  const emptyUser: User = {
    role: 0,
    name: '',
    token: '',
  };
  return fetch(checkUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': jsonType,
    },
    body: JSON.stringify({ t: user.token, r: user.role }),
  })
    .then(async (response) => response.json())
    .then((jsonResponse) => {
      if ((jsonResponse as CheckResponse).r) {
        return user;
      }

      return emptyUser;
    });
};

export type AuthState =
  | {
      state: 'SIGNED_IN';
      currentUser: User;
    }
  | {
      state: 'SIGNED_OUT';
    }
  | {
      state: 'UNKNOWN';
    };

type AuthActions = { type: 'SIGN_IN'; payload: { user: User } } | { type: 'SIGN_OUT' };

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'SIGN_IN':
      return {
        state: 'SIGNED_IN',
        currentUser: action.payload.user,
      };
    case 'SIGN_OUT':
      return {
        state: 'SIGNED_OUT',
      };
  }
};

export const AuthContext = createContext<AuthContextProperties>({
  state: { state: 'UNKNOWN' },
  dispatch: () => undefined,
});

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = useReducer(AuthReducer, { state: 'UNKNOWN' });

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

interface AuthContextProperties {
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}

const useAuthState = (): { state: AuthState } => {
  const { state } = useContext(AuthContext);
  return {
    state,
  };
};

const useAuthDispatch = (): {
  dispatch: Dispatch<AuthActions>;
} => {
  const { dispatch } = useContext(AuthContext);
  return { dispatch };
};

const useAuth = (): AuthContextProperties => {
  const { state, dispatch } = useContext(AuthContext);
  return {
    state,
    dispatch,
  };
};

const useSign = (): {
  signIn: (user: User) => void;
  signOut: () => void;
} => {
  const { dispatch } = useAuthDispatch();
  const signIn = (user: User): void => {
    dispatch({ type: 'SIGN_IN', payload: { user } });
    setStorage(user);
  };

  const signOut = (): void => {
    dispatch({ type: 'SIGN_OUT' });
    clearStorage();
  };

  return {
    signIn,
    signOut,
  };
};

const checkUser = async (): Promise<User> => {
  const user = getStorage();
  return postCheck(user);
};

const useToken = (): {
  token: string;
} => {
  const { state } = useContext(AuthContext);
  const token = state.state === 'SIGNED_IN' ? state.currentUser.token : '';
  return { token };
};

export { useAuth, useAuthState, useToken, useAuthDispatch, useSign, checkUser, AuthProvider };

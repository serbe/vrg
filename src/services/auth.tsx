import type { Dispatch, ReactNode } from 'react';
import { createContext, useContext, useMemo, useReducer } from 'react';
import type { User } from '../models/types';
import { clearStorage, getStorage, setStorage } from './storage';

const checkURL = (import.meta.env.VITE_APP_CHECKURL as string) || '/go/check';

interface CheckResponse {
  r: boolean;
}

export const postCheck = async (user: User): Promise<User> =>
  fetch(checkURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ t: user.token, r: user.role }),
  })
    .then(async (response) => response.json())
    .then((response) => (response as CheckResponse).r)
    .then(() => user);

type AuthState =
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
    default:
      return {
        state: 'SIGNED_OUT',
      };
  }
};

export const AuthContext = createContext<AuthContextProperties>({
  state: { state: 'UNKNOWN' },
  dispatch: () => {
    return;
  },
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

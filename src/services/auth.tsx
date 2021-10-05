import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react';

import { User } from '../models/user';
import { postCheck } from './fetcher';
import { clearStorage, getStorage, setStorage } from './storage';

type AuthState =
  | {
      state: 'SIGNED_IN'
      currentUser: User
    }
  | {
      state: 'SIGNED_OUT'
    }
  | {
      state: 'UNKNOWN'
    }

type AuthActions = { type: 'SIGN_IN'; payload: { user: User } } | { type: 'SIGN_OUT' }

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        state: 'SIGNED_IN',
        currentUser: action.payload.user,
      }
    case 'SIGN_OUT':
      return {
        state: 'SIGNED_OUT',
      }
  }
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, { state: 'UNKNOWN' })

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

type AuthContextProps = {
  state: AuthState
  dispatch: (value: AuthActions) => void
}

export const AuthContext = createContext<AuthContextProps>({ state: { state: 'UNKNOWN' }, dispatch: () => {} })

const useAuthState = () => {
  const { state } = useContext(AuthContext)
  return {
    state,
  }
}

const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthContext)
  return { dispatch }
}

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext)
  return {
    state,
    dispatch,
  }
}

const useSign = () => {
  const { dispatch } = useAuthDispatch()
  const signIn = (user: User) => {
    dispatch({ type: 'SIGN_IN', payload: { user } })
    setStorage(user)
  }
  const signOut = () => {
    dispatch({ type: 'SIGN_OUT' })
    clearStorage()
  }
  return {
    signIn,
    signOut,
  }
}

const checkUser = (): Promise<User> => {
  const user = getStorage()
  return postCheck(user)
}

const useToken = () => {
  const { state } = useContext(AuthContext)
  const token = state.state === 'SIGNED_IN' ? state.currentUser.token : ''
  return { token }
}

export { useAuth, useAuthState, useToken, useAuthDispatch, useSign, checkUser, AuthProvider }

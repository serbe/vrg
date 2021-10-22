import { createContext, ReactNode, useContext, useMemo, useReducer } from 'react'

import { User } from '../models/types'
import { clearStorage, getStorage, setStorage } from './storage'

const checkURL = (import.meta.env.VITE_APP_CHECKURL as string) || '/go/check'

type CheckResponse = {
  r: boolean
}

export const postCheck = (user: User): Promise<User> =>
  fetch(checkURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ t: user.token, r: user.role }),
  })
    .then(response => response.json())
    .then(response => (response as CheckResponse).r)
    .then(() => user)

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
    default:
      return {
        state: 'SIGNED_OUT',
      }
  }
}

export const AuthContext = createContext<AuthContextProperties>({ state: { state: 'UNKNOWN' }, dispatch: () => {} })

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

type AuthContextProperties = {
  state: AuthState
  dispatch: (value: AuthActions) => void
}

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

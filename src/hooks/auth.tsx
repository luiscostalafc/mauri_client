import React, { createContext, useCallback, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'

import api from '../services/api'

interface User {
  id: string
  avatar_url: string
  name: string
  email: string
}

interface AuthState {
  token: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {


  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@Liconnection:token')
    const user = Cookies.get('@Liconnnection:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user) }
    }
    return {} as AuthState

  })


  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', { email, password })

    const { token, user } = response.data

      Cookies.set('@Liconnection:token', token)
      Cookies.set('@Liconnection:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {

      Cookies.remove('@Liconnection:token')
      Cookies.remove('@Liconnection:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {

        Cookies.set('@Liconnection:user', JSON.stringify(user))
      setData({
        token: data.token,
        user
      })
    },
    [setData]
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }

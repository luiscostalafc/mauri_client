import React, { createContext, useCallback, useState, useContext } from 'react'
import { useCookies } from 'react-cookie'
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
  const [cookies, setCookie, removeCookie ] = useCookies(['@Liconnection:token','@Liconnection:user']);



  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('token')
    const user = Cookies.get('user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`
      return { token, user: JSON.parse(user) }
    }
    return {} as AuthState

  })


  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('login', { email, password })

    const { token, user } = response.data
     let expires = new Date()
     expires.setTime(expires.getTime() + (response.data.expires_in * 1000))
     setCookie('@Liconnection:token', token, {path: '/', expires},)
     setCookie('@Liconnection:user', JSON.stringify(user), {path: '/', expires})

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {

      removeCookie('@Liconnection:token', {path: '/'})
      removeCookie('@Liconnection:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {

       setCookie('@Liconnection:user', JSON.stringify(user), {path: '/'})
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

import { takeLatest, call, put, all } from 'redux-saga/effects'
import { } from '../../../hooks/toast'


import api from '../../../services/api'
import { useRouter } from 'next/router'

import { signInSuccess, signFailure, signUpSuccess } from './actions'

const router = useRouter()
const { addToast } = useToast()

export function* singIn({ payload }) {


  try {
    const { email, password } = payload

    const response = yield call(api.post, '/login', {
      email,
      password
    })

    const { token, user } = response.data

    if(user.inactive) {

      addToast({
        type: 'error',
        title: 'Cadastro sob análise',
        description: 'Favor aguardar a liberação do administrador de acesso ao sistema. Obrigado!'
      })
      return
    }

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(signInSuccess(token, user))

    router.push('/')
  } catch (err) {
    console.log('Falha na autenticação')
    yield put(signFailure())
  }
}

export function* singUp({ payload }) {
  try {
    const { name, email, password } = payload

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true
    })
    yield put(signUpSuccess())

    router.push('/')
  } catch (err) {
    console.log('Falha no cadastro')

    yield put(signFailure())
  }
}

function setToken({ payload }) {
  if (!payload) return

  const { token } = payload.auth

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  }
}

export function signOut() {
  router.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', singIn),
  takeLatest('@auth/SIGN_UP_REQUEST', singUp),
  takeLatest('@auth/SIGN_OUT', signOut)
])

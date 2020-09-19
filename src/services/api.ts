import axios from 'axios'
import Cookies from 'js-cookie'
import { useToast } from '../hooks/toast'
import { useRouter } from 'next/router'
import PrettyLog from '@emersonbraun/pretty-log'

const baseURL = 'http://127.0.0.1:3333/api'

declare type Headers = {
  Accept: string,
  'Content-Type': 'application/json' | 'multipart/form-data',
  Authorization: string | null
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: null
} as Headers

function successNotify(msg: string) {
  const { addToast } = useToast()
  return addToast({
    type: 'success',
    title: msg,
  })
}

function errorNotify(msg: string) {
  const { addToast } = useToast()
  return addToast({
    type: 'error',
    title: msg
  })
}


function getToken () {
  const token = Cookies.get('@Liconnection:token')
  return token ? `Bearer ${String(token)}` : null
}

function setHeaders (file = false) {
  headers['Content-Type'] = file ? 'multipart/form-data' : 'application/json'
  headers.Authorization = getToken()
  return headers
}

function showNotify (response: { headers: { message: string }; status: number }) {
  if (response?.headers?.message) {
    if (response.status < 200 || response.status > 299) {
      errorNotify(response.headers.message)
    } else {
      successNotify(response.headers.message)
    }
  }
}
function setResponse (response: any, silent = false) {
  const router = useRouter()
  if (response.status === 403) router.push('/login')
  if (!silent) showNotify(response)
  return response.data
}

export async function get (URL: string, silent = true, debug = false) {
  const headers = setHeaders()
  const completeURL = `${baseURL}/${URL}`
  try {
    const response = await axios.get(completeURL, { headers })
    if (debug) PrettyLog.success(`Response: ${completeURL}`, response)
    return setResponse(response, silent)
  } catch (e) {
    PrettyLog.error(`Error to get ${completeURL}`, e)
  }
}

export async function post (URL: string, data: unknown, file = false, silent = false, debug = false) {
  const headers = setHeaders(file)
  const completeURL = `${baseURL}/${URL}`
  try {
    const response = await axios.post(completeURL, data, { headers })
    if (debug) PrettyLog.success(`Response: ${completeURL}`, response)
    return setResponse(response, silent)
  } catch (e) {
    PrettyLog.error(`Error to post ${completeURL}`, e)
  }
}

export async function put (URL: string, data: unknown, silent = false, debug = false) {
  const headers = setHeaders()
  const completeURL = `${baseURL}/${URL}`
  try {
    const response = await axios.put(completeURL, data, { headers })
    if (debug) PrettyLog.success(`Response: ${completeURL}`, response)
    return setResponse(response, silent)
  } catch (e) {
    PrettyLog.error(`Error to put ${completeURL}`, e)
  }
}

export async function deleteData (URL: string, silent = false, debug = false) {
  const headers = setHeaders()
  const completeURL = `${baseURL}/${URL}`
  try {
    const response = await axios.delete(completeURL, { headers })
    if (debug) PrettyLog.success(`Response: ${completeURL}`, response)
    return setResponse(response, silent)
  } catch (e) {
    PrettyLog.error(`Error to delete ${completeURL}`, e)
  }
}


 /* ------ original ------*/
const api = axios.create({
  baseURL: 'http://localhost:3333/api'
})

export default api

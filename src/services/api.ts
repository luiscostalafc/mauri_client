// import React from 'react';
// import ReactLoading from 'react-loading'

import axios from 'axios'
import Cookies from 'js-cookie'
import { useToast } from '../hooks/toast'
import { useRouter } from 'next/router'
// import PrettyLog from '@emersonbraun/pretty-log/src'

const { addToast } = useToast()
const router = useRouter()

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
  return addToast({
    type: 'success',
    title: msg,
  })
}

function errorNotify(msg: string) {
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
  if (response.status === 403) router.push('/login')
  if (!silent) showNotify(response)
  return response.data
}

export async function get (URL: string, silent = true, debug = false) {
  // setar loadding no estado global como true
  const headers = setHeaders()
  const completeURL = `${baseURL}/${URL}`
  try {
    const response = await axios.get(completeURL, { headers })
    if (debug) console.log(`Response: ${completeURL}`, response)
    // setar loadding no estado global como false
    console.log(response)
    return setResponse(response, silent)
  } catch (e) {
    console.error(`Error to get ${completeURL}`, e)
    // setar loadding no estado global como false
  }
}

export async function post (URL: string, data: unknown, file = false, silent = false, debug = false) {
  // setar loadding no estado global como true
  const headers = setHeaders(file)
  const completeURL = `${baseURL}/${URL}`
  try {
    const response = await axios.post(completeURL, data, { headers })
    if (debug) console.log(`Response: ${completeURL}`, response)
    // setar loadding no estado global como false
    return setResponse(response, silent)
  } catch (e) {
    console.error(`Error to post ${completeURL}`, e)
    // setar loadding no estado global como false
  }
}

export async function put (URL: string, data: unknown, silent = false, debug = false) {
  // setar loadding no estado global como true
  const headers = setHeaders()
  const completeURL = `${baseURL}/${URL}`
  try {
    const response = await axios.put(completeURL, data, { headers })
    if (debug) console.log(`Response: ${completeURL}`, response)
    // setar loadding no estado global como false
    return setResponse(response, silent)
  } catch (e) {
    console.error(`Error to put ${completeURL}`, e)
    // setar loadding no estado global como false
  }
}

export async function deleteData (URL: string, silent = false, debug = false) {
  // setar loadding no estado global como true
  const headers = setHeaders()
  const completeURL = `${baseURL}/${URL}`
  try {
    const response = await axios.delete(completeURL, { headers })
    if (debug) console.log(`Response: ${completeURL}`, response)
    // setar loadding no estado global como false
    return setResponse(response, silent)
  } catch (e) {
    console.error(`Error to delete ${completeURL}`, e)
    // setar loadding no estado global como false
  }
}
 /* ------ original ------*/
const api = axios.create({
  baseURL: 'http://localhost:3333/api'
})

export default api

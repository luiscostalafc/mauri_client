/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
//import PrettyLog from '@emersonbraun/pretty-log';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useToast } from '../hooks/toast';

const completeURL = (URL: string) => {
  const cleanURL = URL.charAt(0) === '/' ? URL.slice(1, URL.length) : URL;
  const baseUrl = process.env.REACT_APP_API_URL ?? 'https://api-liconection.com.br';
  return `${baseUrl}/api/${cleanURL}`;
};

declare type Headers = {
  Accept: string;
  'Content-Type': 'application/json' | 'multipart/form-data';
  Authorization: string | null;
};

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: null,
} as Headers;

function successNotify(msg: string) {
  const { addToast } = useToast();
  return addToast({
    type: 'success',
    title: msg,
  });
}

function errorNotify(msg: string) {
  const { addToast } = useToast();
  return addToast({
    type: 'error',
    title: msg,
  });
}

function getToken() {
  const token = Cookies.get('@Liconnection:token');
  return token ? `Bearer ${String(token)}` : null;
}

function setHeaders(file = false) {
  headers['Content-Type'] = file ? 'multipart/form-data' : 'application/json';
  headers.Authorization = getToken();
  return headers;
}

function showNotify(response: {
  headers: { message: string };
  status: number;
}) {
  if (response?.headers?.message) {
    if (response.status < 200 || response.status > 299) {
      errorNotify(response.headers.message);
    } else {
      successNotify(response.headers.message);
    }
  }
}

function redirectIfNotLogged(response: { status: number }) {
  if (response.status === 403) window.location.replace('/login');
  return true;
}

function logResponse(response: any) {
  const mainData = {
    method: response.config.method,
    path: response.request.path,
    status: response.status,
    returntype: response.headers.returntype,
    message: response.headers.message,
    'data (count)': response?.data?.length || 0,
  };
  // PrettyLog.success(`Response ${mainData.path}:`);
  // console.table(mainData);
}

function setResponse(response: any, silent = false, debug = false) {
  redirectIfNotLogged(response);
  if (debug) logResponse(response);
  if (!silent) showNotify(response);
  return response.data ?? [];
}

export async function get(URL: string, silent = true, debug = false) {
  headers = setHeaders();
  if (debug) console.time('⌚️ time to get request');
  try {
    const response = await axios.get(completeURL(URL), { headers });
    if (debug) console.timeEnd('⌚️ time to get request');
    return setResponse(response, silent, debug);
  } catch (e) {
    if (debug) console.timeEnd('⌚️ time to get request');
    // PrettyLog.error(`Error to get ${URL}`, e);
  }
}

export async function post(
  URL: string,
  data: unknown,
  file = false,
  silent = false,
  debug = false,
) {
  headers = setHeaders(file);
  if (debug) console.time('⌚️ time to post request');
  try {
    const response = await axios.post(completeURL(URL), data, { headers });
    if (debug) console.timeEnd('⌚️ time to post request');
    return setResponse(response, silent, debug);
  } catch (e) {
    if (debug) console.timeEnd('⌚️ time to post request');
    // PrettyLog.error(`Error to post ${URL}`, e);
  }
}

export async function put(
  URL: string,
  data: unknown,
  silent = false,
  debug = false,
) {
  headers = setHeaders();
  if (debug) console.time('⌚️ time to put request');
  try {
    const response = await axios.put(completeURL(URL), data, { headers });
    if (debug) console.timeEnd('⌚️ time to put request');
    return setResponse(response, silent, debug);
  } catch (e) {
    if (debug) console.timeEnd('⌚️ time to put request');
    // PrettyLog.error(`Error to put ${URL}`, e);
  }
}

export async function deleteData(URL: string, silent = false, debug = false) {
  headers = setHeaders();
  if (debug) console.time('⌚️ time to delete request');
  try {
    const response = await axios.delete(completeURL(URL), { headers });
    if (debug) console.timeEnd('⌚️ time to delete request');
    return setResponse(response, silent, debug);
  } catch (e) {
    if (debug) console.timeEnd('⌚️ time to delete request');
    // PrettyLog.error(`Error to delete ${URL}`, e);
  }
}

/* ------ original ------*/
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? 'https://api-liconection.com.br',
});

export default api;

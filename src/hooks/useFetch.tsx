import api from '../services/api'
import useSWR from 'swr'

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, mutate} = useSWR<Data, Error>(url, async url => {
    const response = await api(url);


    return response.data;
  })

  return { data, error, mutate}
}

import axios from 'axios'
import {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from "axios"
import { apiUrl } from "../config/environments"
import { AppStore } from '../../store/store'

const defaultErrorMessage = `Lo sentimos! Tenemos un error inesperado. Por favor intentelo más tarde.`

interface ErrorMsgResponse {
  message: string | []
}

let store: AppStore

export const injectStore = (_store: AppStore) => {
  store = _store
}

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.baseURL = apiUrl
  config.headers.set({
    'Authorization': `Bearer ${store.getState().auth.accessToken}`,
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  const errorMsg = error.response?.data || defaultErrorMessage
  return Promise.reject(errorMsg)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = (error: AxiosError<ErrorMsgResponse>): Promise<string> => {
  const errorMsg = error.response?.data?.message || defaultErrorMessage

  if (Array.isArray(errorMsg))
    return Promise.reject(errorMsg.join('\n'))

  return Promise.reject(errorMsg)
}

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

export const apiInstence = axios.create()
setupInterceptorsTo(apiInstence)
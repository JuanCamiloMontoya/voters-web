import axios from 'axios'
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { ErrorMsgResponse } from '../models/interfaces/Common'
import { apiUrl } from "../config/Environments"

const defaultErrorMessage = `Lo sentimos! Tenemos un error inesperado. Por favor intentelo más tarde.`

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.baseURL = apiUrl
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
  return Promise.reject(errorMsg)
}

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

export const apiInstence = axios.create()
setupInterceptorsTo(apiInstence)
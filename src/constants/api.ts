import axios from "axios";
import { Api } from "../constants/apiUrl";
import { useAuthStore } from "../store/useAuthStore";

export const axiosapi = axios.create({
  baseURL: Api.ENVIROMENT.DEVELOPMENT,
  timeout: 8000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

axiosapi.interceptors.request.use((config)=>{
  const token = useAuthStore.getState().token;
  if(token){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
  },
  (error)=>{
    return Promise.reject(error);
  }
)

axiosapi.interceptors.response.use(
  (response) => response,
  (error)=>{
    if(error.response?.status === 401){
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
)
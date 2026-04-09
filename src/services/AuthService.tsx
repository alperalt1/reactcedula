import type { LoginInterface, LoginResponse } from "../interfaces/authInterface";
import type { ApiResponse } from "../interfaces/ApiResponse";
import { Api } from "../constants/apiUrl";
import { axiosapi } from "../constants/api";


export const login = async ({email, password}: LoginInterface) : Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await axiosapi.post(Api.LOGIN, {
      'email': email,
      'password': password
    });
    return response.data;

  }catch (error){
    throw error;
  }
}
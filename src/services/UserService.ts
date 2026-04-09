
import type { ApiResponse } from "../interfaces/ApiResponse";
import { Api } from "../constants/apiUrl";
import { axiosapi } from "../constants/api";
import type { SuscripcionResponse } from "../interfaces/usersuscripcionInterface";


export const suscripcion = async () : Promise<ApiResponse<SuscripcionResponse>> => {
  try {
    const response = await axiosapi.get(Api.SUSCRIPCION);
    return response.data;
  }catch (error){
    throw error;
  }
}
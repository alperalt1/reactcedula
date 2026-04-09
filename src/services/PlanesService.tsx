
import type { ApiResponse } from "../interfaces/ApiResponse";
import { Api } from "../constants/apiUrl";
import { axiosapi } from "../constants/api";
import type { ComprarResponse, HistorialPagoResponse, PlanesResponse } from "../interfaces/planesInterface";


export const planes = async () : Promise<ApiResponse<PlanesResponse[]>> => {
  try {
    const response = await axiosapi.get(Api.PLANES);
    return response.data;
  }catch (error){
    throw error;
  }
}

export const comprar = async (plan_id: number) : Promise<ApiResponse<ComprarResponse>> =>{
  try {
    const response = await axiosapi.post(Api.GENERARORDEN, {plan_id});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const verificarPago = async (transactionId: string) : Promise<ApiResponse<ComprarResponse>> =>{
  try {
    const response = await axiosapi.get(`${Api.VALIDARPAGO}/${transactionId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const historialPago = async () : Promise<HistorialPagoResponse> =>{
  try {
    const response = await axiosapi.get(Api.HISTORIALPAGO);
    return response.data;
  } catch (error) {
    throw error;
  }
}
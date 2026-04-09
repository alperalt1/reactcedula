export interface PlanesResponse {
  id: number;
  name: string;
  price: string;
  limit_consultas: number
}

export interface ComprarResponse {
  redirectUrl: string;
  transactionId: string;
}

export interface Plan {
  id: number;
  name: string;
}

export interface HistorialPago {
  id: number;
  plan_id: number;
  monto: string;
  referencia_pago: string;
  estado: 'pendiente' | 'completado' | 'fallido';
  created_at: string;
  plan: Plan;
}

export interface HistorialPagoResponse {
  status: string;
  message: string;
  data: HistorialPago[];
  errors: any | null;
}
export interface Information {
  soporte: string;
  description: string;
}

export interface Plan {
  id: number;
  name: string;
  price: string;
  limit_consultas: number;
  duration_days: number;
  information: Information;
  created_at: string;
  updated_at: string;
}

export interface SuscripcionResponse {
  id: number;
  user_id: number;
  plan_id: number;
  consultas_disponibles: number;
  fecha_inicio: string;
  fecha_vencimiento: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  plan: Plan;
}
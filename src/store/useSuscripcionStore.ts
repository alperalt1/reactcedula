import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SuscripcionResponse } from "../interfaces/usersuscripcionInterface";

interface SuscripcionState {
  suscripcion: SuscripcionResponse | null;
  suscripcionStore: (data: SuscripcionResponse) => void;
  limpiarSuscripcion: ()=> void;
}

export const useSuscripcionStore = create<SuscripcionState>()(
  persist(
    (set)=>({
      suscripcion: null,
      suscripcionStore: (data)=> set({
        suscripcion: data,
      }),
      limpiarSuscripcion: ()=> set({
        suscripcion: null,
      })
    }),
    {
      name: 'suscripcion-storage'
    }
  )
)
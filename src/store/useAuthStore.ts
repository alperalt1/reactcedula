import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserResponse } from "../interfaces/authInterface";

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  loginStore: (data: { user: UserResponse; access_token: string }) => void;
  logout: ()=> void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set)=>({
      user: null,
      token: null,
      loginStore: (data)=> set({
        user: data.user,
        token: data.access_token
      }),
      logout: ()=> set({
        user: null,
        token: null
      })
    }),
    {
      name: 'auth-storage'
    }
  )
)
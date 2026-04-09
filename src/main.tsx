import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthLayout from './components/AuthLayout.tsx'
import LoginView from './view/LoginView.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import PlanesView from './view/PlanesView.tsx'
import InitLayout from './components/InitLayout.tsx'
import HomeView from './view/HomeView.tsx'
import PerfilView from './view/PerfilView.tsx'
import HistorialView from './view/HistorialView.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<LoginView />} />
          <Route path="login" element={<LoginView />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<InitLayout />}>
            <Route index element={<HomeView />} />
            <Route path="planes" element={<PlanesView />} />
            <Route path="historial" element={<HistorialView />} />
            <Route path="perfil" element={<PerfilView/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

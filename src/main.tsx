import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import MaintenancePage from './maintenance/MaintenancePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.VITE_MAINTENANCE_MODE === '1' ? <MaintenancePage /> : <App />}
  </StrictMode>,
)

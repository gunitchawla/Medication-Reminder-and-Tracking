import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { MedicationProvider } from './context/MedicationContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MedicationProvider>
      <App />
    </MedicationProvider>
  </StrictMode>,
)

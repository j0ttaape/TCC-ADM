import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Inicio from './pages/inicio/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Inicio />
  </StrictMode>,
)

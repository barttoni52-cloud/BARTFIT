import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BartFit from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BartFit />
  </StrictMode>,
)

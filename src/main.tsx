import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.js'
// import "./styles/tailwind.css"
import './styles/index.css' 



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

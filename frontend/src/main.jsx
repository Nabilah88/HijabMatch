import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Grommet } from "grommet";


createRoot(document.getElementById('root')).render(
  <Grommet full>
    <App />
  </Grommet>,
)

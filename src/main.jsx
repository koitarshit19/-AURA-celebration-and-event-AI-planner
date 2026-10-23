import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Note: StrictMode is off on purpose. The Stitch click-scripts attach listeners
// once per page, and StrictMode would attach them twice in dev.
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

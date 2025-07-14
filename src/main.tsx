import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PersonaProvider } from './context/PersonaContext';
import { HistoryProvider } from './context/HistoryContext';

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersonaProvider>
      <HistoryProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HistoryProvider>
    </PersonaProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { CategoryProvider } from './context/CategoryContext.jsx'
import { CommentaryProvider } from './context/CommentaryContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CategoryProvider>
      <CommentaryProvider>
        <App />
      </CommentaryProvider>
    </CategoryProvider>
  </StrictMode>,
)

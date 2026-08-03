import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import SmoothScroll from './components/SmoothScroll.tsx'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </HashRouter>,
)

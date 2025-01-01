import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './core/index.css'
import App from './core/App.tsx'
import {store} from "./core/store.ts";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)

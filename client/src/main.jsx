import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import global from './global.js'
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./modules/shopify/providers";
import 'animate.css';

const root = createRoot(document.getElementById("root"));

if(global.IS_SHOPIFY){
  root.render(
    <StrictMode>
       <PolarisProvider>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <App />
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
       </PolarisProvider>
    </StrictMode>,
  )
} else {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}



import { StrictMode } from "react"
import { createRoot } from 'react-dom/client'
import './index.css'

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

import App from './App';

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

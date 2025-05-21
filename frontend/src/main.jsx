import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import SocketContext from './context/SocketContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import "leaflet/dist/leaflet.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CaptainContext>
      <UserContext>
        <SocketContext>
          <StrictMode>
            <App />
          </StrictMode>
        </SocketContext>
      </UserContext>
    </CaptainContext>
  </BrowserRouter>
);

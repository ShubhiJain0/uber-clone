import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext.jsx'
import SocketContext from './context/SocketContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
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

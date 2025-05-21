import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine"; // Ensure you import leaflet-routing-machine
// Custom component to handle map centering
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
const CenterMap = ({ position }) => {

  const map = useMap(); // Access the map instance directly
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom()); // Set the map center dynamically
    }
  }, [position, map]);

  return null;
};

const RouteMap = ({desCor}) => {
  console.log(desCor);
  
  const [currentPosition, setCurrentPosition] = useState({
    lat: 23.2599, // Fallback location for current position
    lng: 77.4126,
  });

  const destination = {
    lat: desCor?.lat? desCor.lat: 23.2599, // Destination latitude
    lng: desCor?.lng?desCor.lng: 77.4126, // Destination longitude
  };

  // Function to calculate the midpoint between two coordinates
  const calculateMidpoint = (lat1, lng1, lat2, lng2) => {
    const midLat = (lat1 + lat2) / 2;
    const midLng = (lng1 + lng2) / 2;
    return { lat: midLat, lng: midLng };
  };

  useEffect(() => {
    // Get the initial position when the component mounts
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });
    });

    // Watch the position to update in real-time
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });
    });

    // Clean up the watch when the component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Calculate the midpoint between current position and destination
  const midpoint = calculateMidpoint(
    currentPosition.lat,
    currentPosition.lng,
    destination.lat,
    destination.lng
  );

  return (
    <MapContainer
      center={[midpoint.lat, midpoint.lng]} // Set map center to midpoint
      zoom={13}
      style={{ height: "65vh", width: "100vw", zIndex:0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Dynamically update map center */}
      <CenterMap position={[midpoint.lat, midpoint.lng]} />
      {/* Marker for current position */}
      <Marker position={[currentPosition.lat, currentPosition.lng]}>
        <Popup>Your Current Location</Popup>
      </Marker>
      {/* Marker for destination */}
      <Marker position={[destination.lat, destination.lng]}>
        <Popup>Destination</Popup>
      </Marker>
      {/* Add Routing control only when position is updated */}
      <RoutingControl
        currentPosition={currentPosition}
        destination={destination}
      />
    </MapContainer>
  );
};

// Create a separate component for the routing control
const RoutingControl = ({ currentPosition, destination }) => {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    if (currentPosition && destination) {
      // Create the route using Leaflet Routing Machine
     
      const route = L.Routing.control({
        waypoints: [
          L.latLng(currentPosition.lat, currentPosition.lng), // Current Position
          L.latLng(destination.lat, destination.lng), // Destination
        ],
        createMarker: () => null, // Disable markers on the route
        routeWhileDragging: true, // Allow dragging the route

      }).addTo(map);

      // Ensure to clean up the route correctly
      
    }
  }, [currentPosition, destination, map]);

  return null;
};

export default RouteMap;

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBus } from "react-icons/fa";

// Custom Zoom Buttons
function ZoomButtons() {
  const map = useMap();
  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
      <button
        onClick={() => map.zoomIn()}
        style={{ display: "block", marginBottom: "5px", padding: "5px 10px" }}
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        style={{ padding: "5px 10px" }}
      >
        -
      </button>
    </div>
  );
}

// Create bus icon with text
function createBusIconWithText(busNumber) {
  return new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <div style={{ textAlign: "center" }}>
        <FaBus style={{ fontSize: "32px", color: "#FF6600" }} />
        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000" }}>
          {busNumber}
        </div>
      </div>
    ),
    className: "",
    iconSize: [40, 50],   // icon + text height
    iconAnchor: [20, 40],
  });
}

// Component to recenter map automatically
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);
  return null;
}

export default function Maplocation() {
  const [position, setPosition] = useState([24.451556, 89.702121]);
  const [prevPosition, setPrevPosition] = useState(null);
  const [rotation, setRotation] = useState(0);
  const markerRef = useRef(null);

  const busNumber = "KYAU_BUS"; // Bus number পরিবর্তন করতে পারেন

  useEffect(() => {
    const gpsRef = ref(db, "gps");
    const unsubscribe = onValue(gpsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newPos = [data.latitude, data.longitude];

        // Calculate angle for rotation
        if (prevPosition) {
          const dx = newPos[1] - prevPosition[1];
          const dy = newPos[0] - prevPosition[0];
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          setRotation(angle);
        }

        // Update positions
        setPrevPosition(newPos);
        setPosition(newPos);
      }
    });

    return () => unsubscribe();
  }, [prevPosition]); // position remove from dependency

  // Apply rotation to marker using CSS transform
  useEffect(() => {
    if (markerRef.current) {
      const markerEl = markerRef.current.getElement();
      if (markerEl) {
        markerEl.style.transform = `rotate(${rotation}deg)`;
      }
    }
  }, [rotation]);

  return (
    <div style={{ height: "500px", width: "80%", margin: "auto" }}>
      <MapContainer
        center={position}
        zoom={16}       // Default zoom
        maxZoom={20}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <Marker
          position={position}
          icon={createBusIconWithText(busNumber)}
          ref={markerRef}
        />

        <ZoomButtons />
        <Recenter position={position} />
      </MapContainer>
    </div>
  );
}

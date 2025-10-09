import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSide } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // ✅ Leaflet CSS import

// Custom Zoom Buttons
function ZoomButtons() {
  const map = useMap();
  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
      <button onClick={() => map.zoomIn()} style={{ display: "block", marginBottom: "5px" }}>+</button>
      <button onClick={() => map.zoomOut()}>-</button>
    </div>
  );
}

// Orange Bus Icon
const busIcon = new L.DivIcon({
  html: ReactDOMServer.renderToString(
    <FontAwesomeIcon
      icon={faBusSide}
      className="text-orange-500 text-xl transform rotate-90"
    />
  ),
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// ✅ Component to recenter map on position change
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
}

export default function Maplocation() {
  const [position, setPosition] = useState([24.451556, 89.702121]);

  useEffect(() => {
    const gpsRef = ref(db, "gps");
    onValue(gpsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPosition([data.latitude, data.longitude]);
      }
    });
  }, []);

  return (
    <div style={{ height: "500px", width: "80%", margin: "auto" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <Marker position={position} icon={busIcon} />
        <ZoomButtons />
        <Recenter position={position} /> {/* ✅ auto recenter */}
      </MapContainer>
    </div>
  );
}


import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaBus } from "react-icons/fa";

// ✅ Custom Zoom Buttons
function ZoomButtons() {
  const map = useMap();
  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}>
      <button
        onClick={() => map.zoomIn()}
        style={{
          display: "block",
          marginBottom: "5px",
          padding: "5px 10px",
          borderRadius: "4px",
        }}
      >
        +
      </button>
      <button
        onClick={() => map.zoomOut()}
        style={{ padding: "5px 10px", borderRadius: "4px" }}
      >
        -
      </button>
    </div>
  );
}

// ✅ Create bus icon with number
function createBusIconWithText(busNumber, rotation = 0) {
  return new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <div style={{ textAlign: "center", transform: `rotate(${rotation}deg)` }}>
        <FaBus style={{ fontSize: "32px", color: "#FF6600" }} />
        <div
          style={{ fontSize: "12px", fontWeight: "bold", color: "#000" }}
        >
          {busNumber}
        </div>
      </div>
    ),
    className: "",
    iconSize: [40, 50],
    iconAnchor: [20, 40],
  });
}

// ✅ Auto recenter when position changes
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);
  return null;
}
//24.468540,89.713371// home 
  //24.2240585 ,89.7056825//
//24.395111, 89.691706// kodda
//24.451556, 89.702121// bazzar station
// ✅ Main component
export default function Maplocation() {
  const [position, setPosition] = useState([24.451556, 89.702121]); // initial position
  const [rotation, setRotation] = useState(0);
  const prevPositionRef = useRef(null);
  const busNumber = "KYAU_BUS";

    console.log(position)
  useEffect(() => {
    const gpsRef = ref(db, "gps");
    const unsubscribe = onValue(gpsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newPos = [data.latitude, data.longitude];

        // Calculate rotation angle
        if (prevPositionRef.current) {
          const dx = newPos[1] - prevPositionRef.current[1];
          const dy = newPos[0] - prevPositionRef.current[0];
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          setRotation(angle);
        }

        prevPositionRef.current = newPos;
        setPosition(newPos);
      }
    });

    return () => unsubscribe();
  }, []); // no dependency loop


  return (
    <div style={{ height: "500px", width: "100%", margin: "auto" }}>
      <MapContainer
        center={position}
        zoom={17}
        maxZoom={20}
        style={{ height: "100%", width: "80%",margin:"auto" }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <Marker
          position={position}
          icon={createBusIconWithText(busNumber, rotation)}
        />

        <ZoomButtons />
        <Recenter position={position} />
      </MapContainer>
    </div>
  );
}

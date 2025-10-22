import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSide } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { getDatabase, ref, onValue } from "firebase/database";

// === Haversine Distance Formula ===
function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Manualbus() {
  const [routes, setRoutes] = useState([]);
  const { busId } = useParams();

  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [prev, setPrev] = useState(null);
  const [distance, setDistance] = useState(0);
  const [eta, setEta] = useState(null);
  const [busPosition, setBusPosition] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [completedStops, setCompletedStops] = useState([]);

  // === Load route data ===
  useEffect(() => {
    fetch("/routeApi.json")
      .then((res) => res.json())
      .then((data) => setRoutes(data));
  }, []);

  const routeData = routes.find((data) => data.id == busId);

  // === Firebase live update ===
  useEffect(() => {
    if (!routeData) return;
    const db = getDatabase();
    const busRef = ref(db, "bus/currentLocation");

    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const now = Date.now();

      if (prev) {
        const timeDiff = (now - prev.time) / 1000;
        const dist = getDistanceFromLatLon(prev.lat, prev.lng, data.lat, data.lng);
        const newSpeed = dist / (timeDiff / 3600);
        setSpeed(newSpeed);

        // Find nearest stop
        const nearestIndex = routeData.Rute.reduce(
          (closest, stop, idx) => {
            const d = getDistanceFromLatLon(data.lat, data.lng, stop.latitude, stop.longitude);
            return d < closest.dist ? { index: idx, dist: d } : closest;
          },
          { index: 0, dist: Infinity }
        ).index;

        // Direction check
        if (nearestIndex > currentStopIndex) setDirection("forward");
        else if (nearestIndex < currentStopIndex) setDirection("backward");

        // ✅ Mark overtaken stops as completed
        if (nearestIndex > currentStopIndex) {
          const overtaken = Array.from({ length: nearestIndex }, (_, i) => i);
          setCompletedStops((prev) => [...new Set([...prev, ...overtaken])]);
        }

        setCurrentStopIndex(nearestIndex);

        // ETA Calculation
        if (nearestIndex < routeData.Rute.length - 1) {
          const nextStop = routeData.Rute[nearestIndex + 1];
          const distToNext = getDistanceFromLatLon(
            data.lat,
            data.lng,
            nextStop.latitude,
            nextStop.longitude
          );
          setDistance(distToNext);
          if (newSpeed > 0) {
            const timeHr = distToNext / newSpeed;
            setEta((timeHr * 60).toFixed(1));
          } else setEta(null);
        }

        // Smooth progress update (0-100%)
        const progress = (nearestIndex / (routeData.Rute.length - 1)) * 100;
        setBusPosition(progress);
      }

      setPrev({ lat: data.lat, lng: data.lng, time: now });
    });

    return () => unsubscribe();
  }, [prev, routeData, currentStopIndex]);

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-6">{routeData?.Location} Route</p>

      {routeData?.Rute?.length ? (
        <div className="relative flex flex-col">
          {/* === Horizontal route line === */}
         <div className="flex  md:flex-col">
           <div className="relative h-full md:w-full md:h-2 bg-gray-300 rounded-full mb-8">
            {/* Green progress bar */}
            <motion.div
              className="absolute left-0 top-0 h-2 bg-green-500 rounded-full origin-left"
              animate={{
                scaleX:
                  direction === "forward"
                    ? busPosition / 100
                    : (100 - busPosition) / 100,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />

            {/* Bus icon moving along the line */}
            <motion.div
              className="absolute -top-1 md:top-[-20px] w-6 h-6 flex justify-center items-center z-10 md:z-20"
              animate={{
                left:
                  direction === "forward"
                    ? `${busPosition}%`
                    : `${100 - busPosition}%`,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <FontAwesomeIcon
                icon={faBusSide}
                className={`text-orange-500 text-2xl ${
                  direction === "backward" ? "rotate-180" : ""
                }`}
              />
            </motion.div>
          </div>

          {/* === Stops === */}
{/* === Stops === */}
<div className="w-full flex flex-col md:flex-row justify-between items-center">
  {routeData.Rute.map((stop, index) => (
    <div key={index} className="flex flex-col items-center mb-4 md:mb-0">
      <FaMapMarkerAlt
        className={`text-xl mb-1 ${
          index === currentStopIndex
            ? "text-yellow-500"
            : completedStops.includes(index)
            ? "text-green-600"
            : "text-gray-400"
        }`}
      />
      <span
        className={`text-[10px] md:text-xs text-center ${
          completedStops.includes(index)
            ? "text-green-700 font-semibold"
            : index === currentStopIndex
            ? "text-yellow-500 font-semibold"
            : "text-gray-600"
        }`}
      >
        {stop.name}
      </span>
    </div>
  ))}
</div>
         </div>


          {/* === Live Info Panel === */}
          <div className="mt-8 bg-white p-4 rounded-xl shadow-md w-full max-w-sm">
            <h2 className="text-md font-bold text-gray-700">🚍 Live Status</h2>
            <p className="mt-2 text-gray-600">
              Speed:{" "}
              <span className="font-semibold text-orange-500">
                {speed.toFixed(2)} km/h
              </span>
            </p>
            <p className="mt-1 text-gray-600">
              Stop:{" "}
              <span className="font-semibold text-blue-600">
                {routeData?.Rute?.[currentStopIndex]?.name}
              </span>
            </p>
            <p className="mt-1 text-gray-600">
              Distance to next:{" "}
              <span className="font-semibold text-green-600">
                {distance.toFixed(2)} km
              </span>
            </p>
            <p className="mt-1 text-gray-600">
              ETA:{" "}
              <span className="font-semibold text-purple-600">
                {eta ? `${eta} min` : "Calculating..."}
              </span>
            </p>
            <p className="mt-1 text-gray-600">
              Direction:{" "}
              <span className="font-semibold text-pink-600">
                {direction === "forward"
                  ? "Campus → Bazar_Station"
                  : "Bazar_Station → Campus"}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p>Bus not found or route is empty</p>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
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
  return R * c; // km
}

export default function Manualbus() {
  const [routes, setRoutes] = useState([]);
  const { busId } = useParams();

  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [prev, setPrev] = useState(null);
  const [distance, setDistance] = useState(0);
  const [eta, setEta] = useState(null);
  const [busPosition, setBusPosition] = useState(0); // for smooth animation

  // === Load route data ===
  useEffect(() => {
    fetch("/routeApi.json")
      .then((res) => res.json())
      .then((data) => setRoutes(data));
  }, []);

  const routeData = routes.find((data) => data.id == busId);

  // === Firebase Live Location Listener ===
  useEffect(() => {
    if (!routeData) return;
    const db = getDatabase();
    const busRef = ref(db, "bus/currentLocation");

    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const now = Date.now();

      if (prev) {
        const timeDiff = (now - prev.time) / 1000; // seconds
        const dist = getDistanceFromLatLon(prev.lat, prev.lng, data.lat, data.lng);
        const newSpeed = (dist / (timeDiff / 3600)); // km/h
        setSpeed(newSpeed);

        // Find nearest stop based on live GPS
        const nearestIndex = routeData.Rute.reduce((closest, stop, idx) => {
          const stopLat = stop.latitude;
          const stopLng = stop.longitude;
          const d = getDistanceFromLatLon(data.lat, data.lng, stopLat, stopLng);
          return d < closest.dist ? { index: idx, dist: d } : closest;
        }, { index: 0, dist: Infinity }).index;

        setCurrentStopIndex(nearestIndex);

        // Next Stop Distance
        if (nearestIndex < routeData.Rute.length - 1) {
          const nextStop = routeData.Rute[nearestIndex + 1];
          const distToNext = getDistanceFromLatLon(
            data.lat,
            data.lng,
            nextStop.latitude,
            nextStop.longitude
          );
          setDistance(distToNext);

          // ETA Calculation
          if (newSpeed > 0) {
            const timeHr = distToNext / newSpeed;
            const timeMin = timeHr * 60;
            setEta(timeMin.toFixed(1));
          } else {
            setEta(null);
          }
        }

        // Smooth animation progress (based on distance ratio)
        const progress = (nearestIndex / (routeData.Rute.length - 1)) * 100;
        setBusPosition(progress);
      }

      setPrev({ lat: data.lat, lng: data.lng, time: now });
    });

    return () => unsubscribe();
  }, [prev, routeData]);

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">
        {routeData?.Location} Route
      </p>

      <div className="flex flex-row md:flex-col items-start gap-4 relative">
        {routeData?.Rute?.length ? (
          <ul className="flex flex-col w-[150px] md:w-auto sm:flex-row sm:flex-wrap sm:items-start relative">
            {routeData.Rute.map((stop, index) => (
              <li key={index} className="flex flex-col items-start ml-4 py-3 relative">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt
                    className={`${
                      index === currentStopIndex ? "text-green-600" : "text-red-500"
                    }`}
                  />
                  <span
                    className={`${
                      routeData.Rute.length <= 10 ? "text-sm" : "text-xs"
                    }`}
                  >
                    {stop.name}
                  </span>
                </div>
                {stop.Distance && (
                  <span className="text-gray-500 block text-xs mt-1 ml-10 sm:ml-0 text-center">
                    {stop.Distance}
                    <HiOutlineArrowNarrowRight className="ml-1 rotate-90 sm:rotate-0 text-gray-400 inline" />
                  </span>
                )}
              </li>
            ))}

            {/* === Animated Bus Icon === */}
            <motion.div
              className="absolute left-[100px] md:left-[16px] top-0"
              animate={{ top: (busPosition / 100) * (routeData.Rute.length * 60) }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <FontAwesomeIcon
                icon={faBusSide}
                className="text-orange-500 text-2xl block transform rotate-90 sm:rotate-0"
              />
            </motion.div>
          </ul>
        ) : (
          <p>Bus not found or route is empty</p>
        )}

        {/* === Live Info Panel === */}
        <div className="flex-shrink-0 mt-4 md:mt-0 bg-white p-4 rounded-xl shadow-md">
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
        </div>
      </div>
    </div>
  );
}

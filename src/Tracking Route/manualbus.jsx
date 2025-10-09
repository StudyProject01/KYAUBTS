import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSide } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { getDatabase, ref, onValue } from "firebase/database";

// === Distance Calculation (Haversine Formula) ===
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
  const [RouteTack, SetRoute] = useState([]);
  const { busId } = useParams();

  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [prev, setPrev] = useState(null);
  const [distance, setDistance] = useState(0);
  const [eta, setEta] = useState(null);

  // === Load Route JSON ===
  useEffect(() => {
    fetch("/routeApi.json")
      .then((res) => res.json())
      .then((data) => SetRoute(data));
  }, []);

  const findData = RouteTack.find((data) => data.id == busId);

  // === Firebase থেকে Bus live location ===
  useEffect(() => {
    const db = getDatabase();
    const busRef = ref(db, "bus/currentLocation");

    const unsubscribe = onValue(busRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      const now = Date.now();

      if (prev) {
        const timeDiff = (now - prev.time) / 1000; // sec
        const dist = getDistanceFromLatLon(prev.lat, prev.lng, data.lat, data.lng);

        const newSpeed = (dist / (timeDiff / 3600)); // km/h
        setSpeed(newSpeed);

        // Next stop এর distance বের করা
        if (findData?.Rute?.length && currentStopIndex < findData.Rute.length - 1) {
          // Example default coordinate for stops (আপনার JSON-এ রাখতে হবে)
          const nextStop = findData.Coordinates?.[currentStopIndex + 1];
          if (nextStop) {
            const distToNext = getDistanceFromLatLon(
              data.lat, data.lng,
              nextStop.lat, nextStop.lng
            );
            setDistance(distToNext);

            // ETA = Distance / Speed
            if (newSpeed > 0) {
              const timeHr = distToNext / newSpeed;
              const timeMin = timeHr * 60;
              setEta(timeMin.toFixed(1)); // মিনিটে দেখাব
            } else {
              setEta(null);
            }
          }
        }

        // Stop index increase করা (dummy logic)
        if (findData?.Rute?.length) {
          setCurrentStopIndex((prevIdx) =>
            prevIdx < findData.Rute.length - 1 ? prevIdx + 1 : 0
          );
        }
      }

      setPrev({ lat: data.lat, lng: data.lng, time: now });
    });

    return () => unsubscribe();
  }, [prev, findData, currentStopIndex]);

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-4">
        {findData?.Location} Route
      </p>

      <div className="flex flex-row md:flex-col items-start gap-4 relative">
        {/* === Route List === */}
        {findData?.Rute?.length ? (
          <ul className="flex flex-col w-[120px] md:w-auto  sm:flex-row sm:flex-wrap sm:items-start relative">
            {findData.Rute.map((stop, index) => (
              <li key={index} className="flex flex-col items-start ml-4 py-3 relative">
                <div className="block items-center gap-2">
                  <FaMapMarkerAlt
                    className={`${
                      index === currentStopIndex ? "text-green-600" : "text-red-500"
                    }`}
                  />
                  <span
                    className={`${
                      findData.Rute.length <= 10 ? "text-sm" : "text-xs"
                    }`}
                  >
                    {stop}
                  </span>
                </div>

                {findData.Distance?.[index] && (
                  <span className="text-gray-500 block text-xs mt-1 ml-10 sm:ml-0 text-center">
                    {findData.Distance[index]}
                    <HiOutlineArrowNarrowRight className="ml-1 rotate-90 sm:rotate-0 text-gray-400 inline" />
                  </span>
                )}
              </li>
            ))}

            {/* === Bus Icon (Animated Move) === */}
            <motion.div
              className="absolute left-[100px] md:left-[16px] top-0"
              animate={{ top: currentStopIndex * 60 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
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
              {findData?.Rute?.[currentStopIndex]}
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

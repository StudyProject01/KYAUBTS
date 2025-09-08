import React, { useState } from "react";
import { FaAmbulance } from "react-icons/fa";
import { MdFireTruck, MdLocalPolice } from "react-icons/md";

const HelpLine = () => {
  const helplines = [
    { id: "ambulance", label: "Hospital", phone: "+8801999000001", icon: <FaAmbulance className="inline text-red-600 mr-2" /> },
    { id: "police", label: "Police Station", phone: "+8801999000002", icon: <MdLocalPolice className="inline text-blue-600 mr-2" /> },
    { id: "fire", label: "Fire Service", phone: "+8801999000003", icon: <MdFireTruck className="inline text-orange-600 mr-2" /> },
  ];

  const [selectedId, setSelectedId] = useState(helplines[0].id);
  const selected = helplines.find((h) => h.id === selectedId);

  // Emergency number (Ambulance by default)
  const emergencyNumber = helplines.find((h) => h.id === "ambulance").phone;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Helpline_Key</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Helpline Section */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Helpline</h2>

          {/* Dropdown */}
          <label className="block mb-3">
            <span className="text-sm text-gray-600">Select Service</span>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="block w-full mt-1 p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              {helplines.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.label}
                </option>
              ))}
            </select>
          </label>

          {/* Info with icon */}
          <div className="mt-3 flex items-center">
            {selected.icon}
            <div>
              <p className="font-medium text-gray-800">{selected.label}</p>
              <p className="text-sm text-gray-600">Phone: {selected.phone}</p>
            </div>
          </div>

          {/* Call Button */}
          <a
            href={`tel:${selected.phone}`}
            className="mt-4 inline-block px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Call Now
          </a>
        </div>

        {/* Emergency Section */}
        <div className="flex items-center justify-center">
          <a
            href={`tel:${emergencyNumber}`}
            className="px-6 py-4 rounded-2xl bg-red-600 text-white text-lg font-bold hover:bg-red-700 shadow-lg w-full text-center"
          >
            🚨 Emergency_Key
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpLine;

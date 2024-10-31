"use client";

import { useState } from "react";
import { fetchCityByTag, calculateDistance } from "../utils/api";
import addresses from "../utils/data/address.json";

export default function Home() {
  const [cityData, setCityData] = useState<any>(null);
  const [distanceData, setDistanceData] = useState<any>(null);
  const [fromCityGuid, setFromCityGuid] = useState<string>("");
  const [toCityGuid, setToCityGuid] = useState<string>("");
  const cities = addresses.cities;

  const handleFetchCity = async () => {
    try {
      const data = await fetchCityByTag("excepteurus", true);
      setCityData(data);
    } catch (error) {
      console.error("Error fetching city by tag:", error);
    }
  };

  const handleCalculateDistance = async () => {
    if (!fromCityGuid || !toCityGuid) {
      alert("Please provide GUIDs for both 'from' and 'to' cities.");
      return;
    }

    try {
      const data = await calculateDistance(fromCityGuid, toCityGuid);
      setDistanceData(data);
    } catch (error) {
      console.error("Error calculating distance:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">City Explorer</h1>

        <div className="mb-6">
          <button
            onClick={handleFetchCity}
            className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600"
          >
            Fetch City by Tag
          </button>
          {cityData && (
            <div className="mt-4 rounded-lg border bg-gray-50 p-4">
              <h2 className="mb-2 font-semibold">City Data:</h2>
              <pre className="text-sm text-gray-700">
                {JSON.stringify(cityData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <h2 className="mb-4 text-xl font-semibold">Calculate Distance</h2>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <select
            value={fromCityGuid}
            onChange={(e) => setFromCityGuid(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select From City</option>
            {cities.map((city) => (
              <option key={city.guid} value={city.guid}>
                {city.name}
              </option>
            ))}
          </select>
          <select
            value={toCityGuid}
            onChange={(e) => setToCityGuid(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select To City</option>
            {cities.map((city) => (
              <option key={city.guid} value={city.guid}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCalculateDistance}
          className="w-full rounded-lg bg-green-500 py-2 font-semibold text-white transition hover:bg-green-600"
        >
          Calculate Distance
        </button>
        {distanceData && (
          <div className="mt-4 rounded-lg border bg-gray-50 p-4">
            <h2 className="mb-2 font-semibold">Distance Data:</h2>
            <pre className="text-sm text-gray-700">
              {JSON.stringify(distanceData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

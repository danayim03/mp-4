"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const base = city1 && city2 && city1 !== city2
      ? `/forecast/compare?city=${encodeURIComponent(city1)}&compare=${encodeURIComponent(city2)}`
      : `/forecast/single?city=${encodeURIComponent(city1)}`;
    const full = date ? `${base}&date=${date}` : base;
    router.push(full);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-6 text-gray-800">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text">Weather Forecast 🪄</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-l font-medium text-gray-700">🏙️ Select a City</label>
            <input
              type="text"
              value={city1}
              onChange={(e) => setCity1(e.target.value)}
              required
              placeholder="e.g. Boston"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-l font-medium text-gray-700">🔄 Compare With (optional)</label>
            <input
              type="text"
              value={city2}
              onChange={(e) => setCity2(e.target.value)}
              placeholder="e.g. New York"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-l font-medium text-gray-700">📅 Specific Date (optional)</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white rounded-lg py-3 hover:bg-orange-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
          >
            Click to View Forecast
          </button>
        </form>
      </div>
    </main>
  );
}
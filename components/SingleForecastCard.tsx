import type { ForecastData, WeatherDay } from "@/types/weather";
import Image from "next/image";

export default function SingleForecastCard({
forecast,
date,
}: {
forecast: ForecastData;
date: string | null;
}) {
const day: WeatherDay | undefined = date
    ? forecast.days.find((d) => d.datetime === date)
    : forecast.days[0];

if (!day)
    return (
    <p style={{ textAlign: "center" }}>
        No forecast available for selected date.
    </p>
    );

return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        {forecast.resolvedAddress}
    </h2>
    <p className="text-center text-gray-600 mb-4">
        Date: <strong>{day.datetime}</strong>
    </p>

    <div className="text-center mb-8">
        <Image
        src={`/icons/${day.icon}.png`}
        alt={day.conditions}
        width={80}
        height={80}
        className="mx-auto mb-3"
        onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <p className="text-lg text-orange-700 mt-2">{day.conditions}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6 bg-orange-50 p-4 rounded-lg">
        <p className="text-gray-700">
        <span className="font-medium">Temperature 🌡️:</span> {day.temp}°F
        </p>
        <p className="text-gray-700">
        <span className="font-medium">Feels Like 🎯:</span> {day.feelslike}°F
        </p>
        <p className="text-gray-700">
        <span className="font-medium">Humidity 💧:</span> {day.humidity}%
        </p>
        <p className="text-gray-700">
        <span className="font-medium">Wind 💨:</span> {day.windspeed} mph
        </p>
        <p className="text-gray-700">
        <span className="font-medium">Cloud Cover ☁️:</span> {day.cloudcover ?? "N/A"}%
        </p>
        <p className="text-gray-700">
        <span className="font-medium">Precipitation 🌧️:</span> {day.precipprob ?? 0}%
        </p>
        <p className="text-gray-700">
        <span className="font-medium">Sunrise 🌅:</span> {day.sunrise ?? "N/A"}
        </p>
        <p className="text-gray-700">
        <span className="font-medium">Sunset 🌇:</span> {day.sunset ?? "N/A"}
        </p>
    </div>

    <h3 className="text-xl font-semibold mb-3 text-orange-700">This Week</h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {forecast.days.slice(0, 7).map((d, i) => (
        <div
            key={i}
            className="bg-orange-50 p-4 rounded-lg text-center hover:bg-orange-100 transition-colors"
        >
            <div className="font-medium text-orange-600 mb-2">{d.datetime.slice(5)}</div>
            <Image
            src={`/icons/${d.icon}.png`}
            alt={d.conditions}
            width={44}
            height={44}
            className="mx-auto mb-2"
            onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="text-sm text-orange-700 font-medium">{d.temp}°</div>
            <div className="text-xs text-orange-600">{d.conditions.split(",")[0]}</div>
        </div>
        ))}
    </div>
    </div>
);
}
import type { ForecastData, WeatherFactorKey } from "@/types/weather";
import { weatherFactors } from "@/types/weather";
import Image from "next/image";


type ForecastComparatorProps = {
    city1: string;
    city2: string;
    data1: ForecastData;
    data2: ForecastData;
    date: string | null;
};

export default function ForecastComparator({
    city1,
    city2,
    data1,
    data2,
    date,
}: ForecastComparatorProps) {
    const day1 = date ? data1.days.find(d => d.datetime === date) : data1.days[0];
    const day2 = date ? data2.days.find(d => d.datetime === date) : data2.days[0];

    if (!day1 || !day2) {
        return <p className="text-center text-gray-600">No forecast data available for the selected date.</p>;
    }

    const renderBar = (value: number, max: number, color: string) => {
        const width = `${(value / max) * 100}%`;
        return (
            <div className="w-full h-4 bg-gray-100 rounded overflow-hidden">
                <div 
                    className="h-full"
                    style={{ width, backgroundColor: color }}
                />
            </div>
        );
    };

    return (
        <div className="flex flex-wrap mt-6">
            {[
                { city: city1, day: day1, color: "#ea580c" },
                { city: city2, day: day2, color: "#f97316" }
            ].map(({ city, day, color }) => (
                <div 
                    key={city} 
                    className="w-1/2 p-4"
                >
                    <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-orange-700">{city}</h3>
                        <p className="text-sm text-orange-600 mb-2">{day.datetime}</p>
                        
                        <Image
                            src={`/icons/${day.icon}.png`}
                            alt={day.conditions}
                            width={48}
                            height={48}
                            className="mx-auto mb-4"
                            onError={(e) => ((e.currentTarget.style.display = "none"))}
                        />
                        
                        <p className="italic text-sm text-orange-600 mb-4">{day.conditions}</p>

                        <div className="text-left space-y-3 bg-orange-50 p-4 rounded-lg">
                            {weatherFactors.map(({ key, label, max }) => {
                                const value = day[key as WeatherFactorKey] ?? 0;
                                return (
                                    <div key={key}>
                                        <p className="text-sm mb-1 text-orange-700">
                                            {label}: <span className="font-medium">{value}</span>
                                        </p>
                                        {renderBar(Number(value), max, color)}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
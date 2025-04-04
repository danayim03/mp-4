import { Suspense } from "react";
import CompareForecastPage from "./ComparisonView";

export default function CompareWrapper() {
return (
    <Suspense fallback={<p className="p-6">Loading comparison...</p>}>
    <CompareForecastPage />
    </Suspense>
);
}
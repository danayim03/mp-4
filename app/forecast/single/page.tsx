import { Suspense } from "react";
import SingleForecastPage from "./ForecastPage";

export default function Wrapper() {
    return (
        <Suspense fallback={<p className="p-6">Loading forecast...</p>}>
        <SingleForecastPage />
        </Suspense>
    );
}
import Image from "next/image";

export default function Home() {
  // Sample AQI data
  const aqiData = {
    location: "RSET Campus",
    pm25: 42,
    pm10: 55,
    co: 0.6,
    no2: 30,
    o3: 50,
    timestamp: "2025-02-21 10:30 AM",
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h2 className="text-xl font-bold">Live Air Quality Index (AQI)</h2>
        
        <table className="border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Parameter</th>
              <th className="border border-gray-300 px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Location</td>
              <td className="border border-gray-300 px-4 py-2">{aqiData.location}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">PM2.5</td>
              <td className="border border-gray-300 px-4 py-2">{aqiData.pm25} µg/m³</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">PM10</td>
              <td className="border border-gray-300 px-4 py-2">{aqiData.pm10} µg/m³</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">CO</td>
              <td className="border border-gray-300 px-4 py-2">{aqiData.co} ppm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">NO₂</td>
              <td className="border border-gray-300 px-4 py-2">{aqiData.no2} ppb</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">O₃</td>
              <td className="border border-gray-300 px-4 py-2">{aqiData.o3} ppb</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Timestamp</td>
              <td className="border border-gray-300 px-4 py-2">{aqiData.timestamp}</td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm text-gray-500">
          * Data is for demonstration. Skibidi Hari sir.
        </p>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
      </footer>
    </div>
  );
}

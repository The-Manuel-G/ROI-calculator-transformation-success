import { useEffect, useState } from "react";

const messages = [
  "Analyzing data...",
  "Extracting key features...",
  "Performing ROI calculations...",
  "Generating recommendations...",
];

export function Loader() {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setCurrentMessage(messages[index]);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <div className="loader mb-4 w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-muted-foreground mb-2">{currentMessage}</p>
        <p className="text-sm text-gray-500">Please wait while we process your data...</p>
      </div>
    </div>
  );
}
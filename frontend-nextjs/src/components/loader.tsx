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
    }, 2000); // Cambiar mensaje cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="loader mb-4"></div> {/* Puedes usar un spinner aquí */}
      <p className="text-lg font-medium text-muted-foreground">{currentMessage}</p>
    </div>
  );
}

import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend connection failed!"));
  }, []);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        Bonjour AI
      </h1>

      <h2 className="mt-5 text-xl">
        {message}
      </h2>
    </div>
  );
}

export default App;

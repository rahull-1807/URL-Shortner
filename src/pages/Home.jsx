import { useState } from "react";
import { shortenUrl } from "../services/api";

function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
    if (!originalUrl) {
      alert("Please enter a URL");
      return;
    }

    try {
      const data = await shortenUrl({ originalUrl, customAlias });
      setShortUrl(`http://localhost:5000/r/${data.id}`);
    } catch (err) {
      alert("Alias already taken or error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          URL Shortener
        </h2>

        {/* Original URL */}
        <input
          type="text"
          placeholder="Enter long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-gray-700 border border-gray-600"
        />

        {/* Custom Alias */}
        <input
          type="text"
          placeholder="Custom alias (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-700 border border-gray-600"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="mt-4 p-3 bg-gray-900 rounded border border-gray-700">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

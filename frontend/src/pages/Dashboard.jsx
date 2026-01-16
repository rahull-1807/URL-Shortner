import { useEffect, useState } from "react";
import { getMyUrls } from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchUrls() {
      try {
        const data = await getMyUrls();
        setUrls(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUrls();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6">My URLs</h2>

        {/* Empty State */}
        {urls.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center text-gray-400">
            No URLs created yet
          </div>
        ) : (
          <div className="overflow-x-auto bg-gray-800 border border-gray-700 rounded-xl">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-700 text-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left">Original URL</th>
                  <th className="px-6 py-4 text-left">Short URL</th>
                  <th className="px-6 py-4 text-center">Clicks</th>
                </tr>
              </thead>

              <tbody>
                {urls.map((url) => (
                  <tr
                    key={url._id}
                    className="border-t border-gray-700 hover:bg-gray-700 transition"
                  >
                    {/* Original URL */}
                    <td className="px-6 py-4 max-w-md truncate text-gray-300">
                      {url.redirectURL}
                    </td>

                    {/* Short URL */}
                    <td className="px-6 py-4">
                      <a
                        href={`http://localhost:5000/r/${url.shortID}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 hover:underline break-all"
                      >
                        /r/{url.shortID}
                      </a>
                    </td>

                    {/* Click Count */}
                    <td className="px-6 py-4 text-center font-semibold">
                      {url.visitHistory.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;

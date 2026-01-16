const BASE_URL = process.env.REACT_APP_BACKEND_URL;


export const shortenUrl = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`   // 🔥 THIS LINE FIXES IT
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Unauthorized or failed");
  }

  return res.json();
};

export const getMyUrls = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch URLs");
  }

  return res.json();
};


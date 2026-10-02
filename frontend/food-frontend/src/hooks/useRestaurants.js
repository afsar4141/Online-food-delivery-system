import { useEffect, useState } from "react";
import { getRestaurants } from "../api/client";

export default function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRestaurants()
      .then((d) => setRestaurants(d.resturants || []))
      .catch(() => setError("Could not reach the server. Make sure the backend is running."))
      .finally(() => setLoading(false));
  }, []);

  return { restaurants, loading, error };
}

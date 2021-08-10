import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserSearch(query) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findUsers = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: "/api/users",
          params: { q: query },
        });
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log("error from useEffect", err.response.data.msg);
        setError(err.response.data.msg);
      }
    };
    findUsers();
  }, [query]);

  return {
    data,
    loading,
    setData,
    error,
  };
}

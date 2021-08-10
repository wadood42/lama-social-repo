import React, { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      try {
        const res = await axios.get(url);
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    loading,
    error,
    data,
  };
};

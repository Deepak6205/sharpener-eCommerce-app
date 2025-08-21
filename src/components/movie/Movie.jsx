import React, { useEffect, useState } from "react";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(true); 

  const fetchMovies = async () => {
    try {
      setError("");
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setMovies(data.results);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Something went wrong... Retrying");
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (retry) {
      fetchMovies();
      timer = setInterval(() => {
        fetchMovies();
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [retry]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Star Wars Movies</h1>

      {loading && <p>Loading...</p>}

      {!loading && error && (
        <div>
          <h2>{error}</h2>
          <button onClick={() => setRetry(false)}>Cancel Retry</button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <h2>Sorry this api is expired</h2>
      )}

      {!loading && !error && movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.episode_id}>
              {movie.title} ({movie.release_date})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Movie;

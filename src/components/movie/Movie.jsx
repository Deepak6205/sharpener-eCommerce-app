import React, { useEffect, useState } from "react";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/films");
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Star Wars Movies</h1>
      {loading ? (
        <p>Loading...</p>
      ) : movies.length === 0 ? (
        <h1>sorry this api is expired</h1>
      ) : (
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

import React, { useState, useCallback, useMemo, useEffect } from "react";
import "../../styles/Movie.css";
import MovieForm from "./MovieForm";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const response = await fetch(
        "https://http-request-movie-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          opening_crawl: data[key].opening_crawl,
          release_date: data[key].release_date,
        });
      }
      setMovies(loadedMovies);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Something went wrong, please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);


  async function addMovieHandler(movie) {
    try {
      const response = await fetch(
        "https://http-request-movie-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to add movie");
      fetchMovies(); 
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  }

  
  async function deleteMovieHandler(id) {
    try {
      await fetch(
        `https://http-request-movie-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE",
        }
      );
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id)); // update UI
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  }

  const movieList = useMemo(
    () =>
      movies.map((movie) => (
        <li className="movie-item" key={movie.id}>
          <h2>{movie.title}</h2>
          <h3>
            <strong>Release Date:</strong> {movie.release_date}
          </h3>
          <p className="opening-text">{movie.opening_crawl}</p>
          <button
            className="delete-btn"
            onClick={() => deleteMovieHandler(movie.id)}
          >
            Delete
          </button>
        </li>
      )),
    [movies]
  );

  return (
    <div className="movie-container">
      <MovieForm onAddMovie={addMovieHandler} />
      <button className="fetch-btn" onClick={fetchMovies}>
        Fetch Movies
      </button>

      <div className="movie-content">
        {loading && <p className="loading">Loading...</p>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && movies.length === 0 && (
          <p className="no-data">No movies yet. Click the button above!</p>
        )}
        {!loading && !error && movies.length > 0 && (
          <ul className="movie-list">{movieList}</ul>
        )}
      </div>
    </div>
  );
};

export default Movie;

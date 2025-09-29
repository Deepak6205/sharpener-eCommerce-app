import React, { useState, useCallback, useMemo, useEffect } from "react";
import "../../styles/Movie.css";
import MovieForm from "./MovieForm";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null); 

  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.email);
        setUser(user);
      } else {
        console.log("No user logged in");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Helper to get token
  const getToken = async () => {
    if (!user) throw new Error("No user logged in yet");
    return await user.getIdToken(true); 
  };

  // Fetch movies
  const fetchMovies = useCallback(async () => {
    try {
      if (!user) return; 

      setError("");
      setLoading(true);

      const token = await getToken();

      const response = await fetch(
        `https://http-request-movie-default-rtdb.firebaseio.com/movies.json?auth=${token}`
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
  }, [user]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  
  async function addMovieHandler(movie) {
    try {
      const token = await getToken();

      const response = await fetch(
        `https://http-request-movie-default-rtdb.firebaseio.com/movies.json?auth=${token}`,
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
      const token = await getToken();

      await fetch(
        `https://http-request-movie-default-rtdb.firebaseio.com/movies/${id}.json?auth=${token}`,
        {
          method: "DELETE",
        }
      );

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
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
      {!user && <p className="error">Please log in to manage movies.</p>}

      {user && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Movie;

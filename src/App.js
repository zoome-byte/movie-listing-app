import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const apiKey = 'your_actual_omdb_api_key'; // 🔑 Replace with your OMDB API key

  const searchMovies = async () => {
    if (!query) {
      setError('Please enter a movie name.');
      return;
    }

    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setError('');
      } else {
        setMovies([]);
        setError('No results found.');
      }
    } catch (err) {
      setError('Error fetching data. Please try again later.');
    }
  };

  return (
    <div className="app">
      <h1>🎬 Movie Listing App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <MovieList movies={movies} />
    </div>
  );
};

export default App;

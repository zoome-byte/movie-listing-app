import React, { useState } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovies = async () => {
    const apiKey = process.env.REACT_APP_OMDB_API_KEY;
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    setMovies(response.data.Search || []);
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
      <MovieList movies={movies} />
    </div>
  );
};

export default App;

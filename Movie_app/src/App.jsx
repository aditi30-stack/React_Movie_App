import React, { useEffect, useState } from 'react';
import MovieList from './Components/MovieList';
import { Error } from './Components/Error';
import './App.css';
import axios from 'axios';


function App() {
  const [movies, setMovies] = useState([]);
  const [inputbox, setInputBox] = useState('');
  const [previousMovie, setPreviousMovie] = useState([]);
  const [error, setError] = useState('');
  const [favourites, setFavourites] = useState([]);
  

  useEffect(() => {
    if (inputbox) {
      const timeout = setTimeout(() => {
        axios
          .get(`http://www.omdbapi.com/?s=${inputbox}&apikey=c6b3f551`)
          .then((response) => {
            if (response.data.Search) {
              setPreviousMovie(response.data.Search);
              setMovies(response.data.Search);
              setError('');
            } else {
              setMovies([]);
              setError('No movie found');
            }
          })
          .catch(() => {
            console.log('Error while fetching movies');
            setMovies([]);
            setError('Error while fetching movies');
          });
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [inputbox]);


 

  const handleInputChange = (e) => {
    setInputBox(e.target.value);
    setError('');
    if (!e.target.value) {
      setMovies(previousMovie);
    }
  };

  useEffect(()=>{
    const moviesFavourites = JSON.parse(localStorage.getItem('movie-app'))

    setFavourites(moviesFavourites)
  }, [])

  const saveToLocalStorage = (items) =>{
    localStorage.setItem('movie-app', JSON.stringify(items) )
  }

  const addfavourite = (movie, addToFavourites) => {
    if (addToFavourites) {
      const newFavourites = [...favourites, movie];
      setFavourites(newFavourites);
      saveToLocalStorage(newFavourites)
    } else {
      const updatedFavourites = favourites.filter((fav) => fav.imdbID !== movie.imdbID);
      setFavourites(updatedFavourites);
      
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="h-full">
        <div className="flex justify-end border-2 border-white p-4 bg-gray-400 mb-4">
          <input
            type="text"
            className="px-4 py-1 rounded-lg border-2 focus:outline-none text-semibold"
            placeholder="Search movies here"
            onChange={handleInputChange}
          />
          <Error error={error} setError={setError} />
        </div>
      </div>

      {!error && movies.length > 0 && (
        <div className="flex overflow-x-scroll flex-nowrap">
          <MovieList
            movies={movies}
            favourites={favourites}
            addfavourite={addfavourite}
            title={'Movies'}
            label={'Add to favourites'}
          />
        </div>
      )}

      <div className="flex overflow-x-scroll flex-nowrap">
        <MovieList movies={favourites} favourites={favourites} addfavourite={addfavourite} title={'Favourites'} label={'Remove from favourites'} />
      </div>
    </div>
  );
}

export default App;

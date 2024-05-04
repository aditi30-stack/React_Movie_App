import React from 'react';

const MovieList = ({ movies, favourites, addfavourite, title }) => {
  const isFavourite = (movie) => favourites.some((fav) => fav.imdbID === movie.imdbID);

  const toggleFavourite = (movie) => {
    if (isFavourite(movie)) {
      addfavourite(movie, false); 
    } else {
      addfavourite(movie, true); 
    }
  };

  return (
    <div>
      <h1 className="text-white p-2 text-xl font-semibold">{title}</h1>
      <div className="flex space-x-4 ml-1">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="relative" style={{ width: '200px', height: '300px' }}>
            <img className="hover:scale-125" src={movie.Poster} alt={movie.Title} style={{ width: '100%', height: '100%' }} />
            
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div className="flex justify-between items-center">
                <span>{isFavourite(movie) ? 'Remove from favorites' : 'Add to favorites'}</span>
                <button onClick={() => toggleFavourite(movie)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

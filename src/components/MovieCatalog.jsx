// MovieCatalog.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './MovieCatalog.css'

const MovieCatalog = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Lógica para obtener datos de la API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '4cf8e3af67a501aff96025ff92c0f395'
            // Otros parámetros según la API
          }
        })

        setMovies(response.data.results)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='movie-catalog'>
      <h1>🎬MOVIES</h1>
      <div className='search-bar'>
        <input
          type='text'
          className='form-control'
          placeholder='Buscar películas...'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className='movie-list'>
        {filteredMovies.map((movie) => (
          <li key={movie.id} className='movie-item'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieCatalog

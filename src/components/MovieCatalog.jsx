// En MovieCatalog.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './MovieCatalog.css'

const MovieCatalog = () => {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '4cf8e3af67a501aff96025ff92c0f395',
            page
          }
        })

        // Verificar si hay nuevas películas únicas antes de actualizar el estado
        const newMovies = response.data.results.filter(movie => !movies.some(existingMovie => existingMovie.id === movie.id))

        setMovies(prevMovies => [...prevMovies, ...newMovies])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error al cargar las películas. Inténtalo de nuevo más tarde.')
        setLoading(false)
      }
    }

    fetchData()
  }, [page, movies])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
  }

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
          id='searchInput'
          placeholder='Buscar películas...'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
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
      {!loading && !error && (
        <button onClick={loadMore}>Cargar más</button>
      )}
    </div>
  )
}

export default MovieCatalog

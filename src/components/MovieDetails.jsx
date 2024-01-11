// En MovieDetails.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './MovieDetails.css' // Agrega un archivo CSS para los estilos

const MovieDetails = () => {
  const { movieId } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: '4cf8e3af67a501aff96025ff92c0f395'
          }
        })

        setMovieDetails(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movie details:', error)
        setError('Error al cargar los detalles de la película. Inténtalo de nuevo más tarde.')
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [movieId])

  if (loading) {
    return <p>Cargando...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className='movie-details-container'>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className='movie-details-image'
      />
      <div className='movie-details-info'>
        <h2>{movieDetails.title}</h2>
        <p>{movieDetails.overview}</p>
        {/* Otros detalles de la película según tus necesidades */}
      </div>
    </div>
  )
}

export default MovieDetails

// En MovieDetails.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './MovieDetails.css'

const MovieDetails = () => {
  const { movieId } = useParams()
  const [movieDetails, setMovieDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Obtener información detallada de la película
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: '4cf8e3af67a501aff96025ff92c0f395',
            append_to_response: 'credits,videos'
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
        <p>
          <strong>Puntuación:</strong> {movieDetails.vote_average}
        </p>
        <p>
          <strong>Clasificación:</strong> {getMovieRating(movieDetails)}
        </p>
        <p>
          <strong>Duración:</strong> {movieDetails.runtime} minutos
        </p>
        <p>
          <strong>Géneros:</strong> {movieDetails.genres.map((genre) => genre.name).join(', ')}
        </p>
        <p>
          <strong>Director:</strong> {getDirector(movieDetails.credits)}
        </p>
        <p>
          <strong>Elenco:</strong> {getFormattedCast(movieDetails.credits)}
        </p>
        <p>
          <strong>Reproducir Trailer:</strong>{' '}
          {movieDetails.videos?.results.length > 0
            ? (
              <a
                href={`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Ver Trailer
              </a>
              )
            : (
                'No disponible'
              )}
        </p>
        {/* Otros detalles de la película según tus necesidades */}
      </div>
    </div>
  )
}

const getMovieRating = (movieDetails) => {
  if (movieDetails.adult) {
    return 'Adulto'
  } else {
    return 'Para todo público'
  }
}

const getDirector = (credits) => {
  const director = credits?.crew.find((person) => person.job === 'Director')
  return director?.name || 'No disponible'
}

const getFormattedCast = (credits) => {
  if (credits?.cast && credits.cast.length > 0) {
    const castNames = credits.cast.map((person) => person.name)
    return castNames.join(', ')
  } else {
    return 'No disponible'
  }
}

export default MovieDetails

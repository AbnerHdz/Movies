// MovieCarousel.jsx
import React from 'react'
import Carousel from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MovieCarousel = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Ajusta según tus necesidades
    slidesToScroll: 1
  }

  return (
    <div className='movie-carousel'>
      <h1>🎬Carousel</h1>
      <Carousel {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            {/* Agrega más información si es necesario */}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default MovieCarousel

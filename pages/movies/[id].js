import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '../../components/ListMoviesAndTv';
import axios from 'axios';
import MovieIdAndCardId from '../../components/MovieIdAndCardId';
const Pelicula = () => {
  //Variables de estado
  const [data, setData] = useState([])
  const [similar, setSimilar] = useState([])
  const [images, setImages] = useState([])
  const [moviesRecomendation, setMoviesRecomendeation] = useState([])
  //Variables Url
  const ApiUrl = 'https://api.themoviedb.org/3'
  const KeyApi = '3883721a9564ae460e37b119f2483909'
  const UrlImage = 'https://image.tmdb.org/t/p/original'
  //Variables
  const router = useRouter()
  const pelicula = router.query.id
  //Funciones
  const LoadData = async () => {
    const seasons = await axios.get(ApiUrl + `/movie/${pelicula}/videos`, {
      params: {
        api_key: KeyApi,
        language: 'es',
      }
    })
    console.log(seasons.data)
    const { data } = await axios.get(`${ApiUrl}/movie/${pelicula}`, {
      params: {
        api_key: KeyApi,
        language: 'es',
        append_to_response: 'videos'
      }
    })
    setData(data)
    console.log(data)
    const similar = await axios.get(`${ApiUrl}/movie/${pelicula}/similar`, {
      params: {
        api_key: KeyApi,
        language: 'es',
      }
    })
    setSimilar(similar.data.results)

    const { data: { results } } = await axios.get(`${ApiUrl}/movie/${pelicula}/recommendations`, {
      params: {
        api_key: KeyApi,
        language: 'es',
      }
    })
    setMoviesRecomendeation(results)

  }
  useEffect(() => { LoadData() }, [pelicula])
  return (

    <div className='MovieId' >
      {
        data.backdrop_path == null ? '' :
          <div className='content-background-image'>
            <div className='background-dark'></div>
            <img src={UrlImage + data.backdrop_path} />

          </div>
      }

      <MovieIdAndCardId data={data} UrlImage={UrlImage} />
      {moviesRecomendation.length == 0 ? '' :
        <List
          tipoDeCarta={true}
          Data={moviesRecomendation}
          Title='Peliculas recomendadas'
          UrlImage={UrlImage}
          limite={4}
          direccion='movies'
        />}
      {similar.length == 0 ? '' :
        <List
          tipoDeCarta={true}
          Data={similar}
          Title='Peliculas similares'
          UrlImage={UrlImage}
          limite={4}
          direccion='movies'
        />}
    </div>
  );
};

export default Pelicula;
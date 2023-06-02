import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '../../components/ListMoviesAndTv';
import axios from 'axios';
import MovieIdAndCardId from '../../components/MovieIdAndCardId';
import Head from 'next/head';
const Pelicula = () => {
  //Variables de estado
  const [data, setData] = useState([])
  const [similar, setSimilar] = useState([])
  const [trailer, setTrailer] = useState([])
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(true)

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
    setLoading(true)
    const { data } = await axios.get(`${ApiUrl}/movie/${pelicula}`, {
      params: {
        api_key: KeyApi,
        language: 'es',
        append_to_response: 'videos'
      }
    })
    const trailer = data.videos.results.filter(i => i.name.includes('Trailer') || i.name.includes('Tráiler'))
    setTrailer(trailer)
    setData(data)

    setLoading(false)
  }
  const LoadList = async () => {
    setLoading2(true)
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
    setLoading2(false)

  }
  useEffect(() => { LoadData(), LoadList() }, [pelicula])


  return (

    <div className='MovieId' >
      <Head>
      <meta name="description" content='esta es la descripcion de una pelicula' />
      <meta property='og:image' content={'https://image.tmdb.org/t/p/w500'+data.poster_path} />
      </Head>
      <MovieIdAndCardId loading={loading} data={data} UrlImage={UrlImage} trailer={trailer} />
      {moviesRecomendation.length == 0 ? '' :
        <List
          loading={loading2}
          tipoDeCarta={true}
          Data={moviesRecomendation}
          Title='Peliculas recomendadas'
          UrlImage={UrlImage}
          limite={4}
          direccion='movies'
        />}
      {similar.length == 0 ? '' :
        <List
          loading={loading2}
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
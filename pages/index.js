import Head from 'next/head'
import Carousel from '../components/Carousel'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Movies from '../components/MoviesAndSeries'


export default function Home() {
  // Variables
  const ApiUrl = 'https://api.themoviedb.org/3'
  const KeyApi = '3883721a9564ae460e37b119f2483909'
  const UrlImage = 'https://image.tmdb.org/t/p/original'
  const router = useRouter()
  // Variables de estado
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [tv, setTv] = useState([]);
  const [now, setNow] = useState([]);
  // Funciones
  const LoadData = async (searchKey) => {
    setLoading(true)
    setLoading2(true)
    setLoading3(true)
    const { data: { results } } = await axios.get(`${ApiUrl}/discover/movie`, {
      params: {
        api_key: KeyApi,
        language: 'es',
        page: 8
      }
    })
    setMovies(results)
    const now = await axios.get(`${ApiUrl}/movie/now_playing`, {
      params: {
        api_key: KeyApi,
        language: 'es',
        page: 1,
      }
    })
    setNow(now.data.results)
    const seeTv = await axios.get(`${ApiUrl}/discover/tv`, {
      params: {
        api_key: KeyApi,
        language: 'es',
      }
    })
    setTv(seeTv.data.results)
    setLoading(false)
    setLoading2(false)
    setLoading3(false)

  }
  useEffect(() => { LoadData() }, [])
  return (
    <>
      <Head>
        <meta name='title' content="se esta compartiendo" />
        <meta name='image' content='https://image.tmdb.org/t/p/w300/d7i9UXE7IfPx2uYtYKzgjs6zYzR.jpg' itemprop="thumbnailUrl" />
        <meta name="description" content="Esta es una pagina de peliculas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name='type' content="website" />
        <meta name='url' content="https://strohxl.github.io/pageOfMovies/movies/573171" />
        <meta name="site_name" content="NEXTMOVIE"/>
      </Head>
      <div className="ContentListAndMovies">
        <Carousel />
        <Movies loading={loading} tipoDeCarta={true} Title={'Peliculas'} Data={movies} UrlImage={UrlImage} limite={8} direccion={'movies'}  />
        <Movies loading={loading2} tipoDeCarta={true} Title={'Series'} Data={tv} UrlImage={UrlImage} limite={8} direccion='tv' />
        <Movies loading={loading3} tipoDeCarta={true} Title={'Peliculas en cines'} Data={now} UrlImage={UrlImage} limite={8} direccion='movies' />


      </div>


    </>
  )
}

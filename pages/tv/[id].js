import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import List from '../../components/ListMoviesAndTv';
import axios from 'axios';
import MovieIdAndCardId from '../../components/MovieIdAndCardId';
const Tv = () => {
  //Variables de estado
  const [data, setData] = useState([])
  const [genres, setGenres] = useState('')
  const [tvSimilar, setTvSimilar] = useState([])
  const [recomendation, setRecomendation] = useState([])
  //Variables Url
  const ApiUrl = 'https://api.themoviedb.org/3'
  const KeyApi = '3883721a9564ae460e37b119f2483909'
  const UrlImage = 'https://image.tmdb.org/t/p/original'
  //Variables
  const router = useRouter()
  const serie = router.query.id
  //Funciones
  const LoadData = async (query) => {
    const { data } = await axios.get(`${ApiUrl}/tv/${serie}`, {
      params: {
        api_key: KeyApi,
        language: 'es',
      }
    })
    const { data: { results } } = await axios.get(`${ApiUrl}/tv/${serie}/similar`, {
      params: {
        api_key: KeyApi,
        language: 'es',
      }
    })
    const recomendation = await axios.get(`${ApiUrl}/tv/${serie}/recommendations`, {
      params: {
        api_key: KeyApi,
        language: 'es',
      }
    })
    setRecomendation(recomendation.data.results)

    const generos = data.genres.map((i) => i.name)
    setGenres(`${generos}`)
    console.log(data)
    console.log(results)
    setTvSimilar(results)
    setData(data)
  }
  useEffect(() => { LoadData() }, [serie])
  return (
    <div className='MovieId'>
      <MovieIdAndCardId data={data} UrlImage={UrlImage} />
      {recomendation.length == 0 ? '' : <List
        tipoDeCarta={true}
        Data={recomendation}
        Title='Series recomendadas'
        UrlImage={UrlImage}
        limite={4}
        direccion={'tv'}
      />}
      {tvSimilar.length == 0 ? '' : <List
        tipoDeCarta={true}
        Data={tvSimilar}
        Title='Series similares'
        UrlImage={UrlImage}
        limite={4}
        direccion={'tv'}
      />}
    </div>
  );
};

export default Tv;
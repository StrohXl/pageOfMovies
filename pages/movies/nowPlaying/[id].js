import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import Filtrado from '../../../components/Filtrado';
import List from '../../../components/ListMoviesAndTv';
const index = () => {
    //Variables de estado
    const router = useRouter()
    const rutaPagina = router.query.id
    const [data, setData] = useState([])
    const [pagina, setPagina] = useState(rutaPagina)
    const [loading, setLoading] = useState(true)

    //Variables Url
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/original'
    //Funciones
 

    const LoadData = async () => {
        setLoading(true)
        const { data: { results } } = await axios.get(`${ApiUrl}/movie/now_playing`, {
            params: {
                api_key: KeyApi,
                language: 'es',
                page: rutaPagina,
            }
        })
        setLoading(false)
        setData(results)
    }
    useEffect(() => { LoadData() }, [rutaPagina])
    const onChangePage = (current, pageSize) => {
        router.push(`/movies/nowPlaying/${current}`)
        LoadData()
        setPagina(current)
      };

    return (
        <div className='ContentListAndMovies' >
            
            <List loading={loading} tipoDeCarta={true} Data={data} Title='Peliculas en Cines' UrlImage={UrlImage} limite={20} direccion='movies' />
            <div style={{textAlign: 'center', fontSize: 30}}>
                <Pagination onChange={onChangePage} defaultCurrent={pagina} current={pagina}  total={740} />
            </div>
        </div>
    );
};

export default index;
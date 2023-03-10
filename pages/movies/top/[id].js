import React, { useState, useEffect } from 'react';
import MoviesAndSeries from '../../../components/MoviesAndSeries';
import axios from 'axios';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import List from '../../../components/ListMoviesAndTv';
const index = () => {

    //Variables de estado
    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [pagina, setPagina] = useState(1)
    //Variables Url
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/original'
    //Funciones
    const LoadData = async () => {
        setLoading(true)
        const { data: { results } } = await axios.get(`${ApiUrl}/movie/top_rated`, {
            params: {
                api_key: KeyApi,
                language: 'es',
                page: pagina,

            }
        })
        setLoading(false)
        setData(results)
    }
    useEffect(() => { LoadData() }, [pagina])
    const onChangePage = (current, pageSize) => {
        router.push('/movies/top/' + current)
        setPagina(current)
    };
    return (
        <div className='ContentListAndMovies'>

            <List
                loading={loading}
                tipoDeCarta={true}
                Data={data}
                Title='Peliculas Mejor valoradas'
                UrlImage={UrlImage}
                limite={20}
                direccion='movies'
            />
            <div style={{ textAlign: 'center', fontSize: 30 }}>
                <Pagination
                    onChange={onChangePage}
                    defaultCurrent={1}
                    total={1000}
                />
            </div>
        </div>
    );
};

export default index;
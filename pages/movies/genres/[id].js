import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Pagination } from 'antd';
import Filtrado from '../../../components/Filtrado';
import List from '../../../components/ListMoviesAndTv';
const index = () => {
    //Variables de estado
    const router = useRouter()
    const [data, setData] = useState([])
    const [pagina, setPagina] = useState(1)
    const [year, setYear] = useState('')
    const [genres, setGenres] = useState()
    const [idGenres, setIdGenres] = useState()
    const [loading, setLoading] = useState(true)
    //Variables
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/original'
 

    //Funciones
    const LoadGenres= async() =>{
        const idGenres = router.query.id
        const { data: { genres } } = await axios.get(`${ApiUrl}/genre/movie/list`, {
            params: {
                api_key: KeyApi,
                language: 'es',
            }
        })
        setIdGenres(idGenres)
        const tituloGenres = genres.filter(i => idGenres == i.id)
        setGenres(tituloGenres.map(i => i.name))
        LoadData(idGenres)
    }
    const LoadData = async (idGenres) => {
        setLoading(true)
        const { data: { results } } = await axios.get(`${ApiUrl}/discover/movie`, {
            params: {
                api_key: KeyApi,
                language: 'es',
                page: pagina,
                primary_release_year: year,
                with_genres: idGenres,
            }
        })
        setLoading(false)
        setData(results)
    }
    useEffect(() => { LoadGenres() }, [pagina, router.query.id])
    const onChangePage = (current, pageSize) => {
        router.push(`/movies/genres/${idGenres}`)
        setPagina(current)
    };


    return (
        <div className='ContentListAndMovies' >


            <List loading={loading} tipoDeCarta={true} Data={data} Title={`Peliculas de ${genres}`} UrlImage={UrlImage} limite={20} direccion='movies' />
            <div style={{ textAlign: 'center', fontSize: 30 }}>
                <Pagination onChange={onChangePage} defaultCurrent={1} current={pagina} total={1000} />
            </div>
        </div>
    );
};

export default index;
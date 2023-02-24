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
    //Variables
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/original'
 
    console.log(router)

    //Funciones
    const LoadGenres= async() =>{
        const idGenres = router.query.id
        const { data: { genres } } = await axios.get(`${ApiUrl}/genre/tv/list`, {
            params: {
                api_key: KeyApi,
                language: 'es',
            }
        })
        setIdGenres(idGenres)
        console.log(idGenres)
        const tituloGenres = genres.filter(i => idGenres == i.id)
        setGenres(tituloGenres.map(i => i.name))
        LoadData(idGenres)
    }
    const LoadData = async (idGenres) => {

        const { data: { results } } = await axios.get(`${ApiUrl}/discover/tv`, {
            params: {
                api_key: KeyApi,
                language: 'es',
                page: pagina,
                primary_release_year: year,
                with_genres: idGenres,
            }
        })

        setData(results)
    }
    useEffect(() => { LoadGenres() }, [pagina, router.query.id])
    const onChangePage = (current, pageSize) => {
        router.push(`/tv/genres/${idGenres}`)
        setPagina(current)
    };


    return (
        <div className='ContentListAndMovies' >


            <List tipoDeCarta={true} Data={data} Title={`Series de ${genres}`} UrlImage={UrlImage} limite={20} direccion='tv' />
            <div style={{ textAlign: 'center', fontSize: 30 }}>
                <Pagination onChange={onChangePage} defaultCurrent={1} current={pagina} total={1000} />
            </div>
        </div>
    );
};

export default index;
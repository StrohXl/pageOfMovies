import MoviesAndTv from "./MoviesAndSeries";
import { useState, useEffect } from "react";
import axios from "axios";
import Years from "./Years";
import Filtrado from "./Filtrado";
import { useRouter } from "next/router";
const SiderNav = () => {
    //Variables
    const router = useRouter()
    const ruta = router.pathname
    const patchname = ruta == '/' || ruta == '/movies/top/[id]' || ruta == '/tv/top/[id]' || ruta == '/tv/airing_today/[id]'
    const filtrarContenido = ruta.includes('tv')
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/original'
    
    //Variables de estado
    const [tvAiringToday, setTvAiringToday] = useState([]);
    const [movieTop, setMovieTop] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    //Funciones
    const LoadData = async () => {
        setLoading(true)
        setLoading2(true)
        const { data: { results } } = await axios.get(ApiUrl + '/tv/airing_today', {
            params: {
                api_key: KeyApi,
                language: 'es',
            }
        })
        const auxData = await axios.get(ApiUrl + '/movie/top_rated', {
            params: {
                api_key: KeyApi,
                language: 'es',
            }
        })
        setLoading(false)
        setLoading2(false)
        setMovieTop(auxData.data.results)
        setTvAiringToday(results)
    }
    useEffect(() => { LoadData() }, [])
    return (
        <div className="SiderNav">
            {
                patchname ? '' :
                    <Filtrado
                        ApiUrl={ApiUrl}
                        KeyApi={KeyApi}
                        contenido={filtrarContenido ? 'Series' : 'Peliculas'}
                    />
            }

            <MoviesAndTv
                loading={loading}
                Title={'Series en Emision'}
                tipoDeCarta={false}
                Data={tvAiringToday}
                UrlImage={UrlImage}
                limite={5}
                direccion='tv'
                direccionVerMas='tv/airing_today/1' />
            <MoviesAndTv
                loading={loading2}
                Title={'Peliculas mejor Valoradas'}
                tipoDeCarta={false}
                Data={movieTop}
                UrlImage={UrlImage}
                limite={5}
                direccion='movies'
                direccionVerMas='movies/top/1' />
            {
                patchname ? <>
                    <Years title={'Peliculas por fecha'} movieYear={true} />
                    <Years title={'Series por fecha'} movieYear={false} />
                </> : ''
            }


        </div>
    );
};

export default SiderNav;
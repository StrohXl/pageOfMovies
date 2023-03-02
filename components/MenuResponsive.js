import { Drawer } from "antd";
import Search from '../components/Search'
import Nav from '../components/Nav'
import MoviesAndTv from "./MoviesAndSeries";
import axios from "axios";
import { useRouter } from "next/router";
import Filtrado from "./Filtrado";
import { useEffect, useState } from "react";
const MenuResponsive = ({ openDrawer, closeDrawer }) => {
    const router = useRouter()
    const [movieTop, setMovieTop] = useState();
    const [data, setData] = useState();
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/original'
    const ruta = router.pathname
    const filtrarContenido = ruta.includes('tv')
    const patchname = ruta == '/' || ruta == '/movies/top/[id]' || ruta == '/tv/top/[id]' || ruta == '/tv/airing_today/[id] ' || ruta == '/movies/[id]' || ruta == '/tv/[id]'
    //Funciones
    const LoadData = async () => {
        const { data: { results } } = await axios.get(ApiUrl + '/tv/airing_today', {
            params: {
                api_key: KeyApi,
                language: 'es',
                page: 2
            }
        })
        setData(results)
        const auxData = await axios.get(ApiUrl + '/movie/top_rated', {
            params: {
                api_key: KeyApi,
                language: 'es',
            }
        })
        setMovieTop(auxData.data.results)
    }
    useEffect(() => { LoadData() }, [])
    return (
        <Drawer
            width={280}
            open={openDrawer}
            onClose={closeDrawer}
            title={
                <Search />
            }
        >
            <Nav mode={'inline'} />
            {
                patchname ? '' :
                    <Filtrado
                        ApiUrl={ApiUrl}
                        KeyApi={KeyApi}
                        contenido={filtrarContenido ? 'Series' : 'Peliculas'}
                    />
            }
            <MoviesAndTv
                Title={'Series en Emision'}
                tipoDeCarta={false}
                Data={data}
                UrlImage={UrlImage}
                limite={5}
                direccion='tv'
                direccionVerMas='tv/airing_today/1' />
            <MoviesAndTv
                Title={'Peliculas mejor Valoradas'}
                tipoDeCarta={false}
                Data={movieTop}
                UrlImage={UrlImage}
                limite={5}
                direccion='movies'
                direccionVerMas='movies/top/1' />
        </Drawer>
    );
};

export default MenuResponsive;
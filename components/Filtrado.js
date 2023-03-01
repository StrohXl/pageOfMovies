import { Button, DatePicker, Space } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/router";

const Filtrado = ({ contenido, ApiUrl, KeyApi }) => {
    //Variables
    const contenidoFinal = contenido == 'Peliculas' ? 'movies' : 'tv'
    const router = useRouter()
    const ruta = router.pathname
    const [genres, setGenres] = useState()
    //Funciones
    const LoadGenres = async () => {
        const { data: { genres } } = await axios.get(ApiUrl + `/genre/${contenido == 'Peliculas' ? 'movie' : 'tv'}/list`, {
            params: {
                api_key: KeyApi,
                language: 'es',
            }
        })
        setGenres(genres)
    }
    useEffect(() => { LoadGenres() }, [ruta])
    //Funciones de busqueda
    const SearchYear = (value, dateString) => {
        router.push(`/${contenidoFinal}/year/${dateString}`)
    }
    const SearchYearMe = (value, dateString) => {
        router.push(`/${contenidoFinal}/year/${dateString}`)
    }
    const SearchYearMa = (value, dateString) => {
        router.push(`/${contenidoFinal}/year/${dateString}`)
    }
    return (
        <div >
            <div className='Title_Peliculas'>
                Filtrar:
            </div>
            <div className="Filtrado_Options">
                <div>Fecha de lanzamiento:</div>
                <DatePicker style={{width: '50%'}} onChange={SearchYear} picker="year" />

            </div>

            <div className="Filtrado_Options">
                <div>Genero de las {contenido} :</div>
                <Space style={{ flexWrap: 'wrap' }}>
                    {genres?.map(i =>
                        <Link key={i.id} href={`/${contenidoFinal}/genres/${i.id}`} className="VerMas">
                            <Button className="VerMas_Button" type={'primary'}>{i.name}</Button>
                        </Link>)
                    }
                </Space>

            </div>
        </div>
    );
};

export default Filtrado;
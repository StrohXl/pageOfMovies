import { Carousel, Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const index = () => {
    //Variables reactivas
    const [data, setData] = useState([])
    //Variables
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/w500'
    //Funciones
    const filtrado = data.filter((i, indice) => indice < 7)

    const LoadData = async () => {
        const { data: { results } } = await axios.get(ApiUrl + '/discover/movie', {
            params: {
                api_key: KeyApi,
                language: 'es',
                primary_release_year: 2023
            }
        })
        setData(results)
    }
    useEffect(() => { LoadData() }, [])
    return (
        <Carousel autoplay>
            {filtrado.map(function (i) {
                return (
                    <div key={i.id} className='carousel'>
                        <Link href={'/movies/' + i.id}>
                            <div className="carousel-content-title">
                                <span className="carousel_Title">{i.title}</span>
                                <span className="carousel_Year">2023</span>
                            </div>
                            <Image quality={10} priority={true} width={400} height={400} src={UrlImage + i.backdrop_path} style={{width: '100%', height: '100%'}} alt={i.title} />
                        </Link>
                    </div>
                )
            })}
        </Carousel>
    );
};

export default index;
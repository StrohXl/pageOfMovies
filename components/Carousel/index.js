import { Carousel, Button } from "antd";
import axios from "axios";
import { RightOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";
import Link from "next/link";
const index = () => {
    //Variables reactivas
    const [data, setData] = useState([])
    //Variables
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/original'
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
        console.log(results)
        setData(results)
    }
    useEffect(() => { LoadData() }, [])
    return (
        <Carousel autoplay>
            {filtrado.map(function (i) {
                return (
                    <div key={i.id} className='Carousel'>
                        <span className="Carousel_Title">{i.title}</span>
                        <span className="Carousel_Year">2023</span>
                        <Link href={'/movies/'+i.id}>
                        <img className="Carousel_img" src={UrlImage + i.backdrop_path} />
                        </Link>
                        
                    </div>
                )
            })}
        </Carousel>
    );
};

export default index;
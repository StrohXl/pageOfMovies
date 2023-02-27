import { useRouter } from "next/router";
import axios from "axios";
import List from "../../components/ListMoviesAndTv";
import { useState, useEffect } from "react";
const index = () => {
    const router = useRouter()
    const [tv, setTv] = useState([])
    const [movie, setMovie] = useState([])
    const busqueda = router.query.id
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const UrlImage = 'https://image.tmdb.org/t/p/original'
    const LoadData = async () => {
        const { data: { results } } = await axios.get(ApiUrl + '/search/movie', {
            params: {
                api_key: KeyApi,
                query: busqueda,
                language: 'es'

            }

        })
        setMovie(results)
        const tvs = await axios.get(ApiUrl + '/search/tv', {
            params: {
                api_key: KeyApi,
                query: busqueda,
                language: 'es'
            }

        })
        setTv(tvs.data.results)

    }
    useEffect(() => { LoadData() }, [busqueda])

    return (
        <div className="ContentListAndMovies">

            <List
                tipoDeCarta={true}
                Title={movie.length == 0 ? 'No hay resultados en peliculas' : 'Resultados en peliculas'}
                limite={1000}
                direccion='movies'
                Data={movie}
                UrlImage={UrlImage}
            />
            <List
                tipoDeCarta={true}
                Title={tv.length == 0 ? 'No hay resultados en series' : 'Resultados en series'}
                limite={1000}
                direccion='tv'
                Data={tv}
                UrlImage={UrlImage}
            />

        </div>
    );
};

export default index;
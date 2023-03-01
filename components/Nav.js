import { Menu, Tooltip } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import axios from "axios";

import { mdiHome, mdiMovieOpenPlay, mdiMovieOpenStar, mdiTelevision } from "@mdi/js";
const index = ({ mode }) => {
    //Variables
    const ApiUrl = 'https://api.themoviedb.org/3'
    const KeyApi = '3883721a9564ae460e37b119f2483909'
    const [genres, setGenres] = useState()
    const LoadGenres = async () => {
        const { data: { genres } } = await axios.get(`${ApiUrl}/genre/tv/list`, {
            params: {
                api_key: KeyApi,
                language: 'es',
            }
        })
        setGenres(genres)
    }
    useEffect(() => { LoadGenres() }, [])
    const MenuItems = [
        {
            key: 1,
            icon: <Link href={'/'}><Icon size={1.3} path={mdiHome} /> Inicio</Link>
        },

        {
            key: 2000,
            icon: <div><Icon size={1.3} path={mdiMovieOpenPlay} /> Peliculas</div>,
            children: [
                {
                    key: 2,
                    icon:
                        <Link href={'/movies/pages/' + 1}><Icon size={1} path={mdiMovieOpenPlay} /> Peliculas</Link>,
                },

                {
                    key: 20,
                    icon:
                        <Link href={'/movies/top/' + 1}><Icon size={1} path={mdiMovieOpenStar} /> Peliculas mejor valoradas</Link>,
                },
                {
                    key: 22,
                    icon:
                        <Link href={'/movies/nowPlaying/' + 1}><Icon size={1} path={mdiMovieOpenPlay} /> Peliculas en Cines</Link>,
                },
                {
                    key: 2100,
                    icon:
                        <div className="Sub-Menu-Genres"><Icon size={1} path={mdiMovieOpenPlay} /> Generos</div>,
                    children: [
                        {
                            key: 201,
                            icon:
                                <Link href={'/movies/genres/' + 28}><Icon size={1} path={mdiMovieOpenStar} /> Accion</Link>,
                        },
                        {
                            key: 202,
                            icon:
                                <Link href={'/movies/genres/' + 12}><Icon size={1} path={mdiMovieOpenStar} /> Aventura</Link>,
                        },
                        {
                            key: 203,
                            icon:
                                <Link href={'/movies/genres/' + 16}><Icon size={1} path={mdiMovieOpenStar} /> Animacion</Link>,
                        },
                        {
                            key: 204,
                            icon:
                                <Link href={'/movies/genres/' + 35}><Icon size={1} path={mdiMovieOpenStar} /> Comedia</Link>,
                        },
                        {
                            key: 205,
                            icon:
                                <Link href={'/movies/genres/' + 80}><Icon size={1} path={mdiMovieOpenStar} /> Crimen</Link>,
                        },
                        {
                            key: 206,
                            icon:
                                <Link href={'/movies/genres/' + 99}><Icon size={1} path={mdiMovieOpenStar} /> Documental</Link>,
                        },
                        {
                            key: 207,
                            icon:
                                <Link href={'/movies/genres/' + 18}><Icon size={1} path={mdiMovieOpenStar} /> Drama</Link>,
                        },
                        {
                            key: 208,
                            icon:
                                <Link href={'/movies/genres/' + 10751}><Icon size={1} path={mdiMovieOpenStar} /> Familia</Link>,
                        },
                        {
                            key: 209,
                            icon:
                                <Link href={'/movies/genres/' + 14}><Icon size={1} path={mdiMovieOpenStar} /> Fantasia</Link>,
                        },
                        {
                            key: 210,
                            icon:
                                <Link href={'/movies/genres/' + 36}><Icon size={1} path={mdiMovieOpenStar} /> Historia</Link>,
                        },
                        {
                            key: 211,
                            icon:
                                <Link href={'/movies/genres/' + 27}><Icon size={1} path={mdiMovieOpenStar} /> Terror</Link>,
                        },
                        {
                            key: 212,
                            icon:
                                <Link href={'/movies/genres/' + 10402}><Icon size={1} path={mdiMovieOpenStar} /> Musica</Link>,
                        },
                        {
                            key: 213,
                            icon:
                                <Link href={'/movies/genres/' + 9648}><Icon size={1} path={mdiMovieOpenStar} /> Misterio</Link>,
                        },
                        {
                            key: 214,
                            icon:
                                <Link href={'/movies/genres/' + 10749}><Icon size={1} path={mdiMovieOpenStar} /> Romance</Link>,
                        },
                        {
                            key: 215,
                            icon:
                                <Link href={'/movies/genres/' + 878}><Icon size={1} path={mdiMovieOpenStar} /> Ciencia ficcion</Link>,
                        },

                        {
                            key: 217,
                            icon:
                                <Link href={'/movies/genres/' + 53}><Icon size={1} path={mdiMovieOpenStar} /> Suspenso</Link>,
                        },

                    ]
                },

            ]
        },
        {
            key: 3000,
            icon: <div ><Icon size={1.3} path={mdiTelevision} /> Series</div>,
            children: [
                {
                    key: 3,
                    icon:
                        <Link href={'/tv/pages/' + 1}><Icon size={1} path={mdiTelevision} /> Series</Link>,
                },

                {
                    key: 30,
                    icon:
                        <Link href={'/tv/top/' + 1}><Icon size={1} path={mdiTelevision} /> Series mejor valoradas</Link>,
                },
                {
                    key: 31,
                    icon:
                        <Link href={'/tv/airing_today/' + 1}><Icon size={1} path={mdiTelevision} /> Series en emision</Link>,
                },
                {
                    key: 3100,
                    icon:
                        <div className="Sub-Menu-Genres"><Icon size={1} path={mdiTelevision} /> Generos</div>,
                    children: [
                        {
                            key: 301,
                            icon:
                                <Link href={'/tv/genres/' + 10759}><Icon size={1} path={mdiTelevision} /> Accion y Aventura</Link>,
                        },
                        {
                            key: 302,
                            icon:
                                <Link href={'/tv/genres/' + 16}><Icon size={1} path={mdiTelevision} /> Animacion</Link>,
                        },
                        {
                            key: 303,
                            icon:
                                <Link href={'/tv/genres/' + 35}><Icon size={1} path={mdiTelevision} /> Comedia</Link>,
                        },
                        {
                            key: 304,
                            icon:
                                <Link href={'/tv/genres/' + 80}><Icon size={1} path={mdiTelevision} /> Crimen</Link>,
                        },
                        {
                            key: 305,
                            icon:
                                <Link href={'/tv/genres/' + 99}><Icon size={1} path={mdiTelevision} /> Documental</Link>,
                        },
                        {
                            key: 306,
                            icon:
                                <Link href={'/tv/genres/' + 18}><Icon size={1} path={mdiTelevision} /> Drama</Link>,
                        },
                        {
                            key: 307,
                            icon:
                                <Link href={'/tv/genres/' + 10751}><Icon size={1} path={mdiTelevision} /> Familia</Link>,
                        },
                        {
                            key: 308,
                            icon:
                                <Link href={'/tv/genres/' + 10762}><Icon size={1} path={mdiTelevision} /> Kids</Link>,
                        },
                        {
                            key: 309,
                            icon:
                                <Link href={'/tv/genres/' + 9648}><Icon size={1} path={mdiTelevision} /> Misterio</Link>,
                        },
                        {
                            key: 310,
                            icon:
                                <Link href={'/tv/genres/' + 10763}><Icon size={1} path={mdiTelevision} /> News</Link>,
                        },
                        {
                            key: 311,
                            icon:
                                <Link href={'/tv/genres/' + 10764}><Icon size={1} path={mdiTelevision} /> Reality</Link>,
                        },
                        {
                            key: 312,
                            icon:
                                <Link href={'/tv/genres/' + 10765}><Icon size={1} path={mdiTelevision} /> Sci-Fi & Fantasy</Link>,
                        },
                        {
                            key: 313,
                            icon:
                                <Link href={'/tv/genres/' + 10766}><Icon size={1} path={mdiTelevision} /> Soap</Link>,
                        },
                        {
                            key: 314,
                            icon:
                                <Link href={'/tv/genres/' + 10767}><Icon size={1} path={mdiTelevision} /> Talk</Link>,
                        },
                        {
                            key: 315,
                            icon:
                                <Link href={'/tv/genres/' + 10768}><Icon size={1} path={mdiTelevision} /> Guerra y Politica</Link>,
                        },

                    ]
                },
            ]

        }
    ]
    return (

        <Menu className="Menu_Items" theme="dark" items={MenuItems} mode={mode} />

    );
};

export default index;
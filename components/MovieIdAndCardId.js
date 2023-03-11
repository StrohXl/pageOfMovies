import { Button, Row, Col, Space, Modal, Skeleton } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/router";
import { mdiStar } from '@mdi/js';
import Image from 'next/image';
import Icon from "@mdi/react";
import YouTube from 'react-youtube';

const MovieIdAndCardId = ({ data, trailer, loading }) => {
    const UrlImage = 'https://image.tmdb.org/t/p/w300'
    const UrlImage2 = 'https://image.tmdb.org/t/p/w500'
    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)
    console.log(data)
    const backdgrop2 = UrlImage2 + data.backdrop_path
    const poster = UrlImage + data.poster_path


    return (
        <>
            {
                data.backdrop_path == null ? '' :
                    <div className='content-background-image' >
                        {loading ?
                            ''
                            :
                            <Image quality={10} src={backdgrop2} alt={data.title || data.name} fill />
                        }
                        <div className='contentBack'></div>

                    </div>
            }
            {openModal ? <Modal open={true} footer={null} onCancel={() => setOpenModal(false)} >
                <YouTube
                    videoId={trailer[0]?.key}
                    className='reproductor-trailer'
                    opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                            autoplay: 1,
                        },
                    }}

                />
            </Modal>
                : ''
            }
            <Row justify={'start'} wrap >
                <Col className='Col-Info-Image' >
                    {loading ?
                        <Skeleton.Image className='Cards' active={true} />
                        :
                        <Image quality={10} alt={data.title || data.name} src={poster} fill />
                    }

                </Col>
                <Col className='Col-Info-Movie'>
                    {loading ?
                        <>
                            <Skeleton style={{ color: '#fff', background: '#aaa' }} active />
                            <Skeleton style={{ color: '#fff', background: '#aaa' }} active />
                            <Skeleton style={{ color: '#fff', background: '#aaa' }} active />
                            <Skeleton style={{ color: '#fff', background: '#aaa' }} active />
                        </>
                        :
                        <>
                            <h1 className='Col-Info-Movie-Title'>{data.title || data.name}</h1>
                            <h4>
                                <Space style={{ flexWrap: 'wrap' }}>
                                    <span className='Col-Info-Movie-Year'>{data.release_date || data.first_air_date}</span>
                                    <span className='Col-Info-Movie-Genres'>
                                        <Space style={{ flexWrap: 'wrap' }} >
                                            {data.genres?.map(function (i) {
                                                return (
                                                    <Link key={i.id} href={router.pathname == '/movies/[id]' ? `/movies/genres/${i.id}` : `/tv/genres/${i.id}`} className="VerMas">
                                                        <Button className="VerMas_Button" type={'primary'}>{i.name}</Button>
                                                    </Link>
                                                )
                                            })
                                            }
                                        </Space>
                                    </span>
                                    <span className='Col-Info-Movie-Runtime'>{data.runtime || data.episode_run_time}m</span>
                                </Space>
                            </h4>
                            <h2 className="Col-Info-Movie-Vote">
                                <Icon size={1.5} style={{ marginRight: 2 }} path={mdiStar} />
                                {data.vote_average}
                            </h2>
                            <div className='Col-Info-Movie-Tagline'>{data.tagline}</div>
                            <h4 className='Col-Info-Movie-Description'>Vista General</h4>
                            <div className='Col-Info-Movie-Description'>{data.overview}</div>
                            {trailer?.length == 0 ?
                                <h4 className='Col-Info-Movie-Description'>No tenemos un trailer disponible</h4> :
                                <div className='Col-Info-Movie-Button'>

                                    <Button className="VerMas_Button" type={'primary'} onClick={() => setOpenModal(true)}>Ver Trailer</Button>
                                </div>
                            }
                        </>
                    }
                </Col>
            </Row>
        </>
    );
};

export default MovieIdAndCardId;
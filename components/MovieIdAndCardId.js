import { Button, Row, Col, Image, Space, Modal } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/router";
import { mdiStar } from '@mdi/js';
import Icon from "@mdi/react";
import YouTube from 'react-youtube';

const MovieIdAndCardId = ({ data, UrlImage, trailer }) => {

    const router = useRouter()
    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            {
                data.backdrop_path == null ? '' :
                    <div className='content-background-image'>
                        <div className='background-dark'></div>
                        <img src={UrlImage + data.backdrop_path} />

                    </div>
            }
            {openModal ? <Modal width={1000} open={true} footer={null} onCancel={() => setOpenModal(false)} >
                <YouTube
                    videoId={trailer[0]?.key}
                    className='reproductor-trailer'
                    opts={{
                        width: '100%',
                        height: '600px',
                        playerVars: {
                            autoplay: 1,
                        },
                    }}

                />
            </Modal>
                : ''
            }
            <Row>
                <Col className='Col-Info-Movie' span={7}>
                    <Image width={450} src={UrlImage + data.poster_path} />
                </Col>
                <Col span={17} className='Col-Info-Movie'>
                    <h1 className='Col-Info-Movie-Title'>{data.title || data.name}</h1>
                    <h4>
                        <Space>
                            <span className='Col-Info-Movie-Year'>{data.release_date || data.first_air_date}</span>
                            <span className='Col-Info-Movie-Genres'>
                                <Space>
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


                </Col>
            </Row>
        </>
    );
};

export default MovieIdAndCardId;
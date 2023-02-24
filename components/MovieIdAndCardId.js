import { Button, Row, Col, Image, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from "next/router";
import { mdiStar } from '@mdi/js';
import Icon from "@mdi/react";

const MovieIdAndCardId = ({ data, UrlImage }) => {
    const router = useRouter()
    return (
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
                                        <Link key={i.id} href={router.pathname == '/movies/[id]'? `/movies/genres/${i.id}`: `/tv/genres/${i.id}`} className="VerMas">
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

            </Col>
        </Row>
    );
};

export default MovieIdAndCardId;
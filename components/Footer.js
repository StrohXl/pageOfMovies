import { Button, Row, Col } from 'antd';
import Link from 'next/link';

const Footer = () => {
    return (
        <Row wrap gutter={[0,30]}>
            <Col span={8} >
                <Link href={'/'} style={{ color: '#fff', fontSize: '1rem' }} >Inicio</Link>
            </Col>
            <Col span={8} style={{display: 'flex', gap: '20px', flexDirection: 'column'}} >
                <Link style={{ color: '#fff', fontSize: '1rem' }} href={'/movies/pages/' + 1}> Peliculas</Link>
                <Link style={{ color: '#fff', fontSize: '1rem' }} href={'/movies/top/' + 1}> Peliculas mejor valoradas</Link>
                <Link style={{ color: '#fff', fontSize: '1rem' }} href={'/movies/nowPlaying/' + 1}> Peliculas en Cines</Link>
            </Col>
            <Col span={8} style={{display: 'flex', gap: '20px', flexDirection: 'column'}}  >
                <Link style={{ color: '#fff', fontSize: '1rem' }} href={'/tv/pages/' + 1}> Series</Link>
                <Link style={{ color: '#fff', fontSize: '1rem' }} href={'/tv/top/' + 1}> Series mejor valoradas</Link>
                <Link style={{ color: '#fff', fontSize: '1rem' }} href={'/tv/airing_today/' + 1}> Series en emision</Link>

            </Col>
            <Col span={22} style={{ textAlign: 'center', color: '#999', fontWeight: '600'}} >
                NEXTMOVIE ©2023 Created by Xavier Mayora
            </Col>
        </Row>
    );
};

export default Footer;
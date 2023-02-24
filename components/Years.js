import Link from "next/link";
import { Button, Space } from "antd";

const Years = ({title, movieYear}) => {
    const fechas = [
        2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006,
        2005, 2004, 2003, 2002, 2001, 2000
    ]
    return (
        <div>
            <div className='Title_Peliculas'>
                {title}
            </div>
            <Space style={{display: "flex", flexWrap: 'wrap'}}>
                { fechas.map(i =>
                        <Link key={i} href={movieYear ? `/movies/year/${i}` : `/tv/year/${i}`} className="VerMas">
                            <Button className="VerMas_Button" type={'primary'}>{i}</Button>
                        </Link>)
                }
            </Space>
        </div>
    );
};

export default Years;
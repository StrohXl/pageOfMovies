import Cards from './Cards'
import { Button,Row } from "antd";
import { RightOutlined } from '@ant-design/icons'
import Link from "next/link";
const MoviesAndSeries = ({ Title, Data, UrlImage, limite, direccionVerMas, direccion, tipoDeCarta }) => {
  //Variables Url

  const auxData = Data.filter((i, indice) => indice < limite)
  return (
    <div className="ContentCards">
      <div className='Title_Peliculas'>
        {Title}

        <Link href={'/' + direccionVerMas} className="VerMas">
          <Button size={'small'} className="VerMas_Button" type={'primary'}>VER MAS <RightOutlined /></Button>
        </Link>
      </div>
      <Row wrap className={tipoDeCarta ? 'Row_Cards' : 'Row_Cards_Horizontal'}>
        {auxData.map(function (i) {
          return (
            <Cards
              direccion={direccion}
              key={i.id}
              srcImage={UrlImage + (tipoDeCarta ? i.poster_path : i.backdrop_path)}
              title={i.title || i.name}
              id={i.id}
              description={i.overview}
              vote={i.vote_average}
              year={i.release_date || i.first_air_date}
              tipoDeCarta={tipoDeCarta}
            />
          )

        })
        }
      </Row>


    </div>
  );
};

export default MoviesAndSeries;
import Cards from './Cards'
import { Row, Col, Skeleton } from "antd"

const MoviesAndSeries = ({ Title, Data, limite, direccion, tipoDeCarta, loading }) => {
  //Variables Url
  const UrlImage = 'https://image.tmdb.org/t/p/w400'
  const auxData = Data.filter((i, indice) => indice < limite)
  const repetir = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  const repetirLimite = repetir.filter((i, indice) => indice < limite)
  return (
    <div className="ContentCards">
      <div className='Title_Peliculas'>

        {loading ? 'Cargando' : Title}

      </div>
      <Row wrap className={tipoDeCarta ? 'Row_Cards' : 'Row_Cards_Horizontal'}>
        {
          loading ?
            repetirLimite.map(function (i) {
              return (
                <Col className={tipoDeCarta ? "Col_Cards" : "Col_Cards_Horizontal"} >
                  <Skeleton.Image className={tipoDeCarta ? "Cards" : "CardsHorizontal"} active={true} />
                </Col>
              )
            })
            :   
            auxData.map(function (i) {
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
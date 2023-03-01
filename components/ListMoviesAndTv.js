import Cards from './Cards'

const ListMoviesAndTv = ({ Title, Data, UrlImage, limite, direccion, tipoDeCarta }) => {
  const auxData = Data.filter((i, indice) => indice < limite)
  return (
    <div className="ContentCards">
      <div className='Title_Peliculas'>
        {Title}

      </div>
      <div className={tipoDeCarta ? 'Row_Cards' : 'Row_Cards_Horizontal'}>
        {auxData.map(function (i) {
          return (
            <>
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
            </>
          )

        })
        }
      </div>


    </div>
  );
};

export default ListMoviesAndTv;
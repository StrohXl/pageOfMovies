import { Input } from 'antd'
import { useRouter } from 'next/router';
const { Search } = Input
const index = () => {

    const router = useRouter()
    const onSearch = (valor) => {
        valor != '' ?
            router.push('/search/' + valor) :
            ''

    }

    return (

        <Search allowClear  size='large' className='Search' placeholder='Buscar Pelicula o Serie ' enterButton onSearch={onSearch} />

    );
};

export default index;
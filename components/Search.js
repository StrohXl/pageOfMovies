import {Input} from 'antd'
const {Search} = Input
const index = ({onSearch}) => {
    return (
    
            <Search allowClear size='large' className='Search' placeholder='Buscar' enterButton  onSearch={onSearch} />

    );
};

export default index;
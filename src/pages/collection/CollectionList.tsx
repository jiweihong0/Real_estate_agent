// Collection page 
import Table from '../../components/Table';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useCollist from '../../hooks/useCollist';

export const CollectionList = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Collection/add');
  };
  const {data,
    columns,
    onRow} = useCollist();

  return (
        <div className='flex flex-col items-center w-4/5 m-10 '>
          <div className='inline-flex items-center mb-10 justify-evenly w-96'>
            <p className='text-4xl '>代收付管理列表</p>
            <Button type='primary' onClick={handleClick} className='bg-blue-600 ' >新增</Button>
          </div>
          <Table data={data} columns={columns} onRow={onRow} />
        </div>
  );
};
export default CollectionList;


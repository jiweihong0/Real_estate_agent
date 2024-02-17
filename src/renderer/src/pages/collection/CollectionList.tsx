import Table from "../../components/Table";
import useCollectionist from "../../hooks/useCollectionList";

export const CollectionList = () => {
  const { data, columns, onRow, isError, isLoading } = useCollectionist();

  return (
    <div className="flex flex-col items-center w-4/5 m-10 ">
      <div className="inline-flex items-center mb-10 justify-evenly w-96">
        <p className="text-4xl ">代收付管理列表</p>
        {/*<Button type="primary" onClick={handleClick} className="bg-blue-600 ">
          新增
        </Button>*/}
      </div>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>error...</p>
      ) : (
        <Table data={data} columns={columns} onRow={onRow} />
      )}
    </div>
  );
};
export default CollectionList;

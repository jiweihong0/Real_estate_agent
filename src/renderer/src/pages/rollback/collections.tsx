import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import useRollbackCollectionList from "../../hooks/useRollbackCollectionList";
import { Collection } from "../../type";

export const RollBackCollectionList = () => {
  const { data, columns, isError, isLoading } = useRollbackCollectionList();

  const navigate = useNavigate();
  const customOnRow = (record: Collection) => {
    return {
      onClick: () => {
        navigate(`/Collection/${record.collection_id}?rollback=true`);
      },
    };
  };

  return (
    <div className="flex flex-col items-center w-4/5 m-10 ">
      <div className="inline-flex items-center mb-10 justify-evenly w-96">
        <p className="text-4xl ">復原代收付管理</p>
      </div>
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>error...</p>
      ) : (
        <Table data={data} columns={columns} onRow={customOnRow} />
      )}
    </div>
  );
};
export default RollBackCollectionList;

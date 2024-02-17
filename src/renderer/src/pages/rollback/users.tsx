import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import useRollbackUserList from "../../hooks/useRollbackUserList";
import { User } from "../../type";

export const RollbackUserList = () => {
  const { data, columns, isError, isLoading } = useRollbackUserList();

  const navigate = useNavigate();
  const customOnRow = (record: User) => {
    return {
      onClick: () => {
        navigate(`/User/${record.user_id}?rollback=true`);
      },
    };
  };

  return (
    <div className="flex flex-col items-center w-4/5 m-10 ">
      <div className="inline-flex items-center mb-10 justify-evenly w-96">
        <p className="text-4xl ">復原使用者列表</p>
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
export default RollbackUserList;

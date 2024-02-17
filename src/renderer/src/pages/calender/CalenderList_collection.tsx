import CalenderTable from "../../components/CalenderTable";
import { usePostCalenderCollection } from "../../hooks/useAPI";

export const CalenderList = () => {
  const { isLoading, isError, handleGetCalender, dataCalender } =
    usePostCalenderCollection();
  return (
    <div className="flex flex-col items-center w-4/5 m-10 ">
      <div className="inline-flex items-center mb-10 justify-evenly w-96">
        <div className="inline-flex items-center justify-evenly w-96">
          <p className="text-4xl ">代收付提醒列表</p>
        </div>
      </div>
      <div className="flex p-4 site-calendar-custom-header gap-x-4">
        <div className="flex">
          <p className="w-4 h-4 bg-red-600 rounded-full"></p>
          <p className="text-xs">代收</p>
        </div>
        <div className="flex">
          <p className="w-4 h-4 bg-blue-600 rounded-full"></p>
          <p className="text-xs">收付</p>
        </div>
      </div>

      <CalenderTable
        isLoading={isLoading}
        isError={isError}
        handleGetCalender={handleGetCalender}
        dataCalender={dataCalender}
      />
    </div>
  );
};
export default CalenderList;

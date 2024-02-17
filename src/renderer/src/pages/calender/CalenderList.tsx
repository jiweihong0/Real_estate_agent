import CalenderTable from "../../components/CalenderTable";
import { usePostCalender } from "../../hooks/useAPI";

export const CalenderList = () => {
  const { isLoading, isError, handleGetCalender, dataCalender } =
    usePostCalender();
  return (
    <div className="flex flex-col items-center w-4/5 m-10 ">
      <div className="inline-flex items-center mb-10 justify-evenly w-96">
        <div className="inline-flex items-center justify-evenly w-96">
          <p className="text-4xl ">提醒事項列表</p>
        </div>
      </div>
      <div className="flex p-4 site-calendar-custom-header gap-x-4">
        <div className="flex">
          <p className="w-4 h-4 bg-green-400 rounded-full"></p>
          <p className="text-xs">代收付事項</p>
        </div>
        <div className="flex">
          <p className="w-4 h-4 bg-red-500 rounded-full"></p>
          <p className="text-xs">租房事項</p>
        </div>
        <div className="flex">
          <p className="w-4 h-4 bg-gray-400 rounded-full"></p>
          <p className="text-xs">售房事項</p>
        </div>
        <div className="flex">
          <p className="w-4 h-4 bg-blue-400 rounded-full"></p>
          <p className="text-xs">開發追蹤事項</p>
        </div>
        <div className="flex">
          <p className="w-4 h-4 bg-orange-400 rounded-full"></p>
          <p className="text-xs">行銷追蹤事項</p>
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

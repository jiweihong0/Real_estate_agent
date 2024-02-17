import { Table } from "antd";
// import index css
import '../index.css'
const TableCompoent = (props: any) => {
  const { columns, data, onRow } = props;

  return (
    <Table
      columns={columns}
      dataSource={data.map((item: {}, index: number) => ({
        ...item,
        key: index,
      }))}
      onRow={onRow}
      size="large"
      className=" mx-10 w-full "
      rowClassName={"cursor-pointer"}
      
    />
  );
};



export default TableCompoent;
// TODO: 這裡要加上分頁、排序、搜尋等功能串接後端API
//onChange={(pagination, filter, sort) => {
//  console.log(pagination, filter, sort);
//  console.log("change");
//}}


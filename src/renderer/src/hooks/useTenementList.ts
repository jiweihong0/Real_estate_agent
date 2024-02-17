import { useNavigate } from "react-router-dom";

import getColumnSearchProps from "../components/getColumnSearchProps";

import type { TenementList } from "../type";

const useTenementList = () => {
  type ColumnsType = {
    title: string;
    dataIndex: string;
    key?: string;
    width?: string;
    collection_type?: string;
    price?: string;
    filters?: {
      text: string;
      value: string;
    }[];
    onFilter?: (value: string, record: TenementList) => boolean;
    sorter?: (a: TenementList, b: TenementList) => number;
  };

  const columns: ColumnsType[] = [
    {
      title: "地址",
      dataIndex: "tenement_address",
      key: "tenement_address",
      width: "10%",
      ...getColumnSearchProps("tenement_address"),
    },
    {
      title: "面向",
      dataIndex: "tenement_face",
      key: "tenement_face",
      width: "10%",
      filters: [
        {
          text: "海景",
          value: "海景",
        },
        {
          text: "中庭",
          value: "中庭",
        },
        {
          text: "三多路",
          value: "三多路",
        },
        {
          text: "自強路",
          value: "自強路",
        },
        {
          text: "市景風洞",
          value: "市景風洞",
        },
        {
          text: "海景風洞",
          value: "海景風洞",
        },
        {
          text: "其他",
          value: "其他",
        },
      ],
      onFilter: (value, record) => record.tenement_face.includes(value),
    },
    {
      title: "物件狀態",
      dataIndex: "tenement_status",
      key: "tenement_status",
      width: "10%",
      // 未成交、已成交、已退租下架、過戶完成下架
      filters: [
        {
          text: "未成交",
          value: "未成交",
        },
        {
          text: "已成交",
          value: "已成交",
        },
        {
          text: "已退租下架",
          value: "已退租下架",
        },
        {
          text: "過戶完成下架",
          value: "過戶完成下架",
        },
        {
          text: "開發中",
          value: "開發中",
        },
      ],
      onFilter: (value, record) => record.tenement_status.includes(value),
    },
    {
      title: "物件型態",
      dataIndex: "tenement_type",
      key: "tenement_type",
      width: "10%",
      filters: [
        {
          text: "出租",
          value: "出租",
        },
        {
          text: "出售",
          value: "出售",
        },
        {
          text: "開發追蹤",
          value: "開發追蹤",
        },
        {
          text: "行銷追蹤",
          value: "行銷追蹤",
        },
      ],
      onFilter: (value, record) => record.tenement_type.includes(value),
    },
    {
      title: "樓層",
      dataIndex: "management_floor_bottom",
      key: "management_floor_bottom",
      width: "10%",
      sorter: (a, b) => a.management_floor_bottom - b.management_floor_bottom,
    },
    {
      title: "產品類別",
      dataIndex: "tenement_product_type",
      key: "tenement_product_type",
      width: "10%",
      filters: [
        {
          text: "套房",
          value: "套房",
        },
        {
          text: "辦公室",
          value: "辦公室",
        },
        {
          text: "店面",
          value: "店面",
        },
        {
          text: "其他",
          value: "其他",
        },
      ],
      onFilter: (value, record) => record.tenement_product_type.includes(value),
    },
    {
      title: "管理費",
      dataIndex: "management_fee_bottom",
      key: "management_fee_bottom",
      width: "10%",
      sorter: (a, b) => a.management_fee_bottom - b.management_fee_bottom,
    },
  ];

  const navigate = useNavigate();
  const switchType = (type: string) => {
    switch (type) {
      case "出租":
        return "rent";
      case "出售":
        return "sell";
      case "開發追蹤":
        return "develop";
      case "行銷追蹤":
        return "market";
      default:
        return "rent";
    }
  };
  const onRow = (record: TenementList) => {
    return {
      onClick: () => {
        navigate(
          `/Tenement/${record.tenement_id}/${switchType(
            record.tenement_type
          )}?tenement_type=${record.tenement_type}`
        );
      },
    };
  };
  return {
    columns,
    onRow,
  };
};

export default useTenementList;

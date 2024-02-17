import { useNavigate } from "react-router-dom";
import getColumnSearchProps from "../components/getColumnSearchProps";
import type { TenementList } from "../type";

const useTenementListSell = () => {
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
      title: "售價",
      dataIndex: "selling_price",
      key: "selling_price",
      width: "10%",
      sorter: (a, b) => (a.selling_price || 0) - (b.selling_price || 0),
    },
    {
      title: "權狀坪數",
      dataIndex: "Total_rating",
      key: "Total_rating",
      width: "10%",
      sorter: (a, b) => (a.Total_rating || 0) - (b.Total_rating || 0),
    },
    {
      title: "室內面積",
      dataIndex: "inside_rating",
      key: "inside_rating",
      width: "10%",
      sorter: (a, b) => (a.inside_rating || 0) - (b.inside_rating || 0),
    },
    {
      title: "公設面積",
      dataIndex: "public_building",
      key: "public_building",
      width: "10%",
      sorter: (a, b) => (a.public_building || 0) - (b.public_building || 0),
    },
    {
      title: "總樓層",
      dataIndex: "tenement_floor",
      key: "tenement_floor",
      width: "10%",
      sorter: (a, b) => (a.tenement_floor || 0) - (b.tenement_floor || 0),
    },
    {
      title: "管理費",
      dataIndex: "management_fee_bottom",
      key: "management_fee_bottom",
      width: "10%",
      sorter: (a, b) =>
        (a.management_fee_bottom || 0) - (b.management_fee_bottom || 0),
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
          )}?tenement_type=出售`
        );
      },
    };
  };
  return {
    columns,
    onRow,
  };
};

export default useTenementListSell;

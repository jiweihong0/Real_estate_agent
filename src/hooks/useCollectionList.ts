import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getColumnSearchProps from "../components/getColumnSearchProps";
import { useGetCollectionList } from "./useAPI";
import type { Collection } from "../type";

const useCollectionList = () => {
  const [data, setData] = useState<Collection[]>([
    {
      name: "代收1",
      type: "代收",
      tenement_id: "1",
      price: "1000",
      collection_id: 1,
    },
    {
      name: "代付1",
      tenement_id: "2",
      type: "代付",
      price: "2000",
      collection_id: 2,
    },
    {
      name: "代收2",
      tenement_id: "3",
      type: "代收",
      price: "3000",
      collection_id: 3,
    },
    {
      name: "代付2",
      tenement_id: "4",
      type: "代付",
      price: "4000",
      collection_id: 4,
    },
  ]);
  type ColumnsType = {
    title: string;
    dataIndex: string;
    key?: string;
    width?: string;
    type?: string;
    price?: string;
    filters?: {
      text: string;
      value: string;
    }[];
    onFilter?: (value: string, record: Collection) => boolean;
    sorter?: (a: Collection, b: Collection) => number;
  };

  const columns: ColumnsType[] = [
    {
      title: "編號",
      dataIndex: "collection_id",
    },
    {
      title: "房屋編號",
      dataIndex: "tenement_id",
      key: "tenement_id",
      width: "30%",
      ...getColumnSearchProps("tenement_id"),
    },
    {
      title: "費用名稱",
      dataIndex: "name",
      filters: [
        {
          text: "水電空調費",
          value: "水電空調費",
        },
        {
          text: "管理費",
          value: "管理費",
        },
        {
          text: "其他費用",
          value: "其他費用",
        },
        {
          text: "第四台",
          value: "第四台",
        },
      ],
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "費用類型",
      dataIndex: "type",
      filters: [
        {
          text: "代收",
          value: "代收",
        },
        {
          text: "代付",
          value: "代付",
        },
      ],
      onFilter: (value, record) => record.type.includes(value),
    },
    {
      title: "費用金額",
      dataIndex: "price",
      sorter: (a, b) => parseInt(a.price) - parseInt(b.price),
    },
  ];

  const { isLoading, isError, datasa } = useGetCollectionList();
  useEffect(() => {
    if (datasa) {
      const newdataCollection = datasa.map((collection) => {
        return {
          collection_id: collection.collection_id,
          tenement_id: collection.tenement_id,
          name: collection.name,
          type: collection.type,
          price: collection.price,
          key: collection.collection_id,
        };
      });
      setData(newdataCollection);
    }
  }, [datasa]);

  const navigate = useNavigate();
  const onRow = (record: Collection) => {
    return {
      onClick: () => {
        navigate(`/Collection/${record.tenement_id}`);
      },
    };
  };
  return {
    data,
    columns,
    onRow,
    isLoading,
    isError,
  };
};

export default useCollectionList;

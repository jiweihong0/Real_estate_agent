import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getColumnSearchProps from "../components/getColumnSearchProps";
import { useGetRollbackCollectionList } from "./useAPI";
import type { Collection } from "../type";

const useBackupCollectionList = () => {
  const [data, setData] = useState<Collection[]>([
    {
      collection_name: "代收1",
      collection_type: "代收",
      tenement_address: "1",
      price: "1000",
      collection_id: 1,
    },
    {
      collection_name: "代付1",
      tenement_address: "2",
      collection_type: "代付",
      price: "2000",
      collection_id: 2,
    },
    {
      collection_name: "代收2",
      tenement_address: "3",
      collection_type: "代收",
      price: "3000",
      collection_id: 3,
    },
    {
      collection_name: "代付2",
      tenement_address: "4",
      collection_type: "代付",
      price: "4000",
      collection_id: 4,
    },
  ]);
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
      dataIndex: "tenement_address",
      key: "tenement_address",
      width: "30%",
      ...getColumnSearchProps("tenement_address"),
    },
    {
      title: "費用名稱",
      dataIndex: "collection_name",
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
      onFilter: (value, record) => record.collection_name.includes(value),
    },
    {
      title: "費用類型",
      dataIndex: "collection_type",
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
      onFilter: (value, record) => record.collection_type.includes(value),
    },
    {
      title: "費用金額",
      dataIndex: "price",
      sorter: (a, b) => parseInt(a.price) - parseInt(b.price),
    },
  ];

  const { isLoading, isError, datasa } = useGetRollbackCollectionList();
  useEffect(() => {
    if (datasa) {
      const newdataCollection = datasa.map((collection) => {
        return {
          collection_id: collection.collection_id,
          tenement_address: collection.tenement_address,
          collection_name: collection.collection_name,
          collection_type: collection.collection_type,
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
        navigate(`/Collection/${record.collection_id}`);
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

export default useBackupCollectionList;

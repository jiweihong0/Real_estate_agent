import React, { useState, useRef } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

type FilterConfirmProps = { closeDropdown: boolean };
type DataIndex = keyof DataType | number;

interface DataType {
  key: React.Key;
  collection_name?: string;
  tenement_address?: string;
  type?: string;
  price?: string;
  id?: string;
  tenement_face?: string;
  tenement_floor?: string;
  tenement_type?: string;
  tenement_status?: string;
  tenement_note?: string;
  tenement_product_type?: string;
  management_fee_bottom?: string;
  management_floor_bottom?: string;
}

const getColumnSearchProps = (dataIndex: DataIndex) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const filterDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }: {
    setSelectedKeys: (keys: (string | number)[]) => void;
    selectedKeys: (string | number)[];
    confirm: () => void;
    clearFilters: () => void;
    close: () => void;
  }) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() =>
          handleSearch(selectedKeys as string[], confirm, dataIndex)
        }
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size="small"
          className="bg-blue-600 w-30"
        >
          搜尋
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          重設
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            // Your filter logic here
            confirm();
            setSearchText((selectedKeys as string[])[0]);
            setSearchedColumn(dataIndex as string);
          }}
        >
          Filter
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          關閉
        </Button>
      </Space>
    </div>
  );

  const filterIcon = (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
  );

  const onFilter = (value: any, record: any) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase());

  const onFilterDropdownOpenChange = (visible: any) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  };

  const render = (text: any) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ) : (
      text
    );

  return {
    filterDropdown,
    filterIcon,
    onFilter,
    onFilterDropdownOpenChange,
    render,
  };
};

export default getColumnSearchProps;

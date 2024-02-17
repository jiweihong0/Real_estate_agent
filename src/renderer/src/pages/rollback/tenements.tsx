import Table from "../../components/Table";
import { Breadcrumb, Button, Form, Input, Checkbox } from "antd";
import useTenementList from "../../hooks/useTenementList";
import FilterModule from "../../components/FilterModule";

import { RuleObject } from "rc-field-form/lib/interface";
import { useEffect, useState } from "react";
import { useGetRollbackTenementList } from "../../hooks/useAPI";
import type { TenementList } from "../../type";
import { useNavigate } from "react-router-dom";

export const RollbackTenementLists = () => {
  const [Popout, setPopout] = useState(false);
  const handlePopout = () => {
    setPopout(!Popout);
  };
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { [x: string]: unknown }[]
  >([{ title: "全部房屋", value: "房屋列表" }]);

  const switchTitletoChinese = (title: string) => {
    switch (title) {
      case "tenement_address":
        return "地址";
      case "tenement_product_type":
        return "產品類型";
      case "tenement_type":
        return "物件類型";
      case "tenement_face":
        return "面向";
      case "tenement_status":
        return "物件狀態";
      case "selling_price_min":
        return "售價 min";
      case "sellling_price_max":
        return "售價 max";
      case "rent_price_min":
        return "租金 min";
      case "rent_price_max":
        return "租金 max";
      case "floor_min":
        return "樓層 min";
      case "floor_max":
        return "樓層 max";
    }
  };

  type item = {
    title: string;
    value: string;
  };

  const navigate = useNavigate();
  const { columns } = useTenementList();

  const customOnRow = (record: TenementList) => {
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
    return {
      onClick: () => {
        navigate(
          `/Tenement/${record.tenement_id}/${switchType(
            record.tenement_type
          )}?rollback=true&tenement_type=${record.tenement_type}`
        );
      },
    };
  };

  const [data, setData] = useState<TenementList[]>([
    {
      tenement_address: "54321",
      tenement_face: "a",
      tenement_status: "a",
      tenement_type: "a",
      tenement_product_type: "a",
      management_fee_bottom: 100,
      management_floor_bottom: 7,
      tenement_id: 1,
    },
    {
      tenement_id: 2,
      tenement_address: "54322",
      tenement_face: "b",
      tenement_status: "b",
      tenement_type: "b",
      tenement_product_type: "b",
      management_fee_bottom: 120,
      management_floor_bottom: 11,
    },
    {
      tenement_id: 3,
      tenement_address: "54323",
      tenement_face: "c",
      tenement_status: "c",
      tenement_type: "c",
      tenement_product_type: "c",
      management_fee_bottom: 150,
      management_floor_bottom: 3,
    },
    {
      tenement_id: 4,
      tenement_address: "54323",
      tenement_face: "d",
      tenement_status: "d",
      tenement_type: "d",
      tenement_product_type: "d",
      management_fee_bottom: 150,
      management_floor_bottom: 3,
    },
  ]);
  const { isLoading, isError, dataTenement, handleGetTenement } =
    useGetRollbackTenementList();
  useEffect(() => {
    handleGetTenement("");
  }, []);

  useEffect(() => {
    if (!dataTenement) return;

    const data = dataTenement.map((item) => {
      return {
        tenement_id: item.tenement_id,
        tenement_address: item.tenement_address,
        tenement_face: item.tenement_face,
        tenement_status: item.tenement_status,
        tenement_type: item.tenement_type,
        tenement_product_type: item.tenement_product_type,
        management_fee_bottom: item.management_fee_bottom,
        management_floor_bottom: item.management_floor_bottom,
        key: item.tenement_address,
      };
    });
    setData(data);
  }, [dataTenement]);

  const handleSelect = (data: []) => {
    handleGetTenement(data);
    const filterData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
    );
    const removeFunction = (item: any) => {
      if (!item) return;
      if (item.value.length === 0) {
        return false;
      }
      if (item.value === undefined) {
        return false;
      } else return true;
    };
    const filterDataTitles = Object.entries(filterData)
      .map(([k, v]) => ({
        title: k,
        value: v,
      }))
      .filter(removeFunction);
    handleGetTenement(data);
    const filterDataTitle = filterDataTitles.map((item: item) => ({
      title: switchTitletoChinese(item.title),
      value: item.value,
    }));
    if (filterDataTitle.length === 0) {
      setBreadcrumbItems([{ title: "全部房屋", value: "房屋列表" }]);
      return;
    }
    setBreadcrumbItems(filterDataTitle);
  };
  const handleReset = () => {
    // setBreadcrumbItems([{ title: "全部房屋", value: "房屋列表" }]);
    // form.resetFields();
    // handleGetTenement("");
    // // reload
    window.location.reload();
  };

  const [form] = Form.useForm();
  const validateMax = (minKey: string, maxKey: string) => {
    return async (_: RuleObject, value: string) => {
      const minValue = form.getFieldValue(minKey);
      if (parseInt(value) < parseInt(minValue)) {
        throw new Error(`${maxKey} 不可小於 ${minKey}`);
      }
    };
  };

  return (
    <div className="flex flex-col items-center w-4/5 m-10 ">
      <div className="inline-flex items-center mb-10 justify-evenly w-96">
        <p className="text-4xl ">復原房屋列表</p>
        <Button type="primary" onClick={handlePopout} className="bg-blue-600 ">
          篩選
        </Button>
        <Button type="primary" className="bg-blue-600 " onClick={handleReset}>
          重置
        </Button>
      </div>
      {/* breadcrumb */}
      <span>篩選條件</span>
      <Breadcrumb className="mb-5" items={breadcrumbItems} />

      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>error...</p>
      ) : (
        <Table data={data} columns={columns} onRow={customOnRow} />
      )}
      {Popout && (
        <FilterModule
          handlePopout={handlePopout}
          handleSelect={handleSelect}
          validateMax={validateMax}
          form={form}
          type={"房屋"}
        >
          <Form.Item name="tenement_type" label="物件型態">
            <Checkbox.Group>
              <Checkbox value="出租">出租</Checkbox>
              <Checkbox value="出售">出售</Checkbox>
              <Checkbox value="開發追蹤">開發追蹤</Checkbox>
              <Checkbox value="行銷追蹤">行銷追蹤</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <div className="inline-flex gap-6">
            <Form.Item
              name="rent_price_min"
              label="租金"
              rules={[{ message: "請輸入租金 min" }]}
            >
              <Input type="number" placeholder="mix" />
            </Form.Item>
            <p className="mt-1">~</p>
            <Form.Item
              name="rent_price_max"
              rules={[
                { message: "請輸入租金 max" },
                { validator: validateMax("rent_price_min", "rent_price_max") },
              ]}
            >
              <Input type="number" placeholder="max" />
            </Form.Item>
          </div>
          <div className="inline-flex gap-6">
            <Form.Item
              name="selling_price_min"
              label="售價"
              rules={[{ message: "請輸入售價 min" }]}
            >
              <Input type="number" placeholder="min" />
            </Form.Item>
            <p className="mt-1">~</p>
            <Form.Item
              name="selling_price_max"
              rules={[
                { message: "請輸入售價 max" },
                {
                  validator: validateMax(
                    "selling_price_min",
                    "selling_price_max"
                  ),
                },
              ]}
            >
              <Input type="number" placeholder="max" />
            </Form.Item>
          </div>
        </FilterModule>
      )}
    </div>
  );
};
export default RollbackTenementLists;

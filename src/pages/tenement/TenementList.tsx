import Table from "../../components/Table";
import { Breadcrumb, Button, Form, Input, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import useTenementList from "../../hooks/useTenementList";
import FilterModule from "../../components/FilterModule";
import {  useState } from "react";
import { RuleObject } from 'rc-field-form/lib/interface';

export const TenementList = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Tenement/Add");
  };
  const [Popout, setPopout] = useState(false);
  const handlePopout = () => {
    setPopout(!Popout);
  };
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ [x: string]: unknown; }[]>([
    { title: "全部房屋", value: "房屋列表" },
  ]);

   const switchTitletoChinese = (title:string) => {
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
  }

  type item = {
    title: string;
    value: string;
  };

  const handleSelect = (data:[]) => {
    console.log("Received values of form: ", data);

    const filterData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
    const filterDataTitle = Object.entries(filterData).map(([k, v]) => ({ title: k, value: v }));
    filterDataTitle.forEach((item:item) => {
      const newTitle = switchTitletoChinese(item.title);
      if (newTitle !== undefined) {
        item.title = newTitle;
      }
    });
    setBreadcrumbItems(filterDataTitle);
  }
  const handleReset = () => {
    setBreadcrumbItems([{ title: "全部房屋", value: "房屋列表" }]);
    form.resetFields();
  }
  

  const { data, columns, onRow, isError, isLoading } = useTenementList();


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
        <p className="text-4xl ">房屋列表</p>
        <Button type="primary" onClick={handleClick} className="bg-blue-600 ">
          新增
        </Button>
        <Button type="primary" onClick={handlePopout} className="bg-blue-600 ">
          篩選
        </Button>
        <Button type="primary" className="bg-blue-600 " onClick={handleReset}>
          重置
        </Button>
      </div>
      {/* breadcrumb */}
      <span>篩選條件</span><Breadcrumb className="mb-5" items={breadcrumbItems} />
  
      {isLoading ? (
        <p>loading...</p>
      ) : isError ? (
        <p>error...</p>
      ) : (
        <Table data={data} columns={columns} onRow={onRow} />
      )}
      {Popout && <FilterModule handlePopout={handlePopout} handleSelect={handleSelect} validateMax={validateMax} form={form} type={"房屋"}
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
            <Form.Item name="rent_price_max" rules={[{ message: "請輸入租金 max" }, { validator: validateMax("rent_price_min", "rent_price_max") }]}>
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
                { validator: validateMax("selling_price_min", "selling_price_max") },
              ]}
            >
              <Input type="number" placeholder="max" />
            </Form.Item>
          </div>
        </FilterModule>}
    </div>
  );
};
export default TenementList;

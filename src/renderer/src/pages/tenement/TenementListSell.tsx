import Table from "../../components/Table";
import { Breadcrumb, Button, Form, Input } from "antd";
import useTenementListSell from "../../hooks/useTenementListSell";
import FilterModule from "../../components/FilterModule";
import { useEffect, useState } from "react";
import { RuleObject } from "rc-field-form/lib/interface";
import { useGetTenementListSell } from "../../hooks/useAPI";
import type { TenementSellList } from "../../type";

export const TenementListSell = () => {
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
        return "產品類別";
      case "tenement_face":
        return "面向";
      case "rent_price_min":
        return "租金 min";
      case "rent_price_max":
        return "租金 max";
      case "total_rating_min":
        return "權狀坪數 min";
      case "total_rating_max":
        return "權狀坪數 max";
      case "inside_rating_min":
        return "室內面積 min";
      case "inside_rating_max":
        return "室內面積 max";
      case "public_building_min":
        return "公設面積 min";
      case "public_building_max":
        return "公設面積 max";
      case "management_fee_min":
        return "管理費 min";
      case "management_fee_max":
        return "管理費 max";
      case "tenement_status":
        return "物件狀態";
      case "floor_min":
        return "樓層 min";
      case "floor_max":
        return "樓層 max";
      case "selling_price_min":
        return "售價 min";
      case "selling_price_max":
        return "售價 max";
    }
  };
  type item = {
    title: string;
    value: string;
  };

  const { columns, onRow } = useTenementListSell();

  const { isLoading, isError, dataTenement, handleGetTenement } =
    useGetTenementListSell();
  const [data, setData] = useState<TenementSellList[]>([
    {
      tenement_id: 1,
      tenement_address: "地址",
      tenement_face: "海景",
      tenement_status: "未成交",
      tenement_type: "出售",
      tenement_product_type: "辦公室",
      management_fee_bottom: 100,
      rent: 100,
      Total_rating: 100,
      inside_rating: 100,
      public_building: 100,
      tenement_floor: 100,
    },
    {
      tenement_id: 2,
      tenement_address: "地址",
      tenement_face: "中庭",
      tenement_status: "已成交",
      tenement_type: "出租",
      tenement_product_type: "店面",
      management_fee_bottom: 120,

      rent: 120,
      Total_rating: 120,
      inside_rating: 120,
      public_building: 120,
      tenement_floor: 120,
    },
    {
      tenement_id: 3,
      tenement_address: "地址",
      tenement_face: "三多路",
      tenement_status: "已退租下架",
      tenement_type: "開發追蹤",
      tenement_product_type: "套房",
      management_fee_bottom: 150,

      rent: 150,
      Total_rating: 150,
      inside_rating: 150,
      public_building: 150,
      tenement_floor: 150,
    },
    {
      tenement_id: 4,
      tenement_address: "地址",
      tenement_face: "三多路",
      tenement_status: "過戶完成下架",
      tenement_type: "行銷追蹤",
      tenement_product_type: "套房",
      management_fee_bottom: 150,

      rent: 150,
      Total_rating: 150,
      inside_rating: 150,
      public_building: 150,
      tenement_floor: 150,
    },
  ]);
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

        selling_price: item.selling_price,
        Total_rating: item.Total_rating,
        inside_rating: item.inside_rating,
        public_building: item.public_building,
        tenement_floor: item.tenement_floor,
        key: item.tenement_address,
      };
    });
    setData(data);
  }, [dataTenement]);
  const handleSelect = (data: []) => {
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
        <p className="text-4xl ">出售列表</p>
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
        <Table data={data} columns={columns} onRow={onRow} />
      )}
      {Popout && (
        <FilterModule
          handlePopout={handlePopout}
          handleSelect={handleSelect}
          validateMax={validateMax}
          form={form}
          type={"出售"}
        >
          <div className="inline-flex gap-6">
            <Form.Item
              name="selling_price_min"
              label="售價"
              rules={[{ message: "請輸入售價 min" }]}
            >
              <Input type="number" placeholder="mix" />
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
          {/* 權狀坪數 */}
          <div className="inline-flex gap-6">
            <Form.Item
              name="total_rating_min"
              label="權狀坪數"
              rules={[{ message: "請輸入樓層 min" }]}
            >
              <Input type="number" placeholder="min" />
            </Form.Item>
            <p className="mt-1">~</p>
            <Form.Item
              name="total_rating_max"
              rules={[
                { message: "請輸入樓層 max" },
                {
                  validator: validateMax(
                    "total_rating_min",
                    "total_rating_max"
                  ),
                },
              ]}
            >
              <Input type="number" placeholder="max" />
            </Form.Item>
          </div>
          {/* 室內面積 */}
          <div className="inline-flex gap-6">
            <Form.Item
              name="inside_rating_min"
              label="室內面積"
              rules={[{ message: "請輸入樓層 min" }]}
            >
              <Input type="number" placeholder="min" />
            </Form.Item>
            <p className="mt-1">~</p>
            <Form.Item
              name="inside_rating_max"
              rules={[
                { message: "請輸入樓層 max" },
                {
                  validator: validateMax(
                    "inside_rating_min",
                    "inside_rating_max"
                  ),
                },
              ]}
            >
              <Input type="number" placeholder="max" />
            </Form.Item>
          </div>
          {/* 公設面積 */}
          <div className="inline-flex gap-6">
            <Form.Item
              name="public_building_min"
              label="公設面積"
              rules={[{ message: "請輸入樓層 min" }]}
            >
              <Input type="number" placeholder="min" />
            </Form.Item>
            <p className="mt-1">~</p>
            <Form.Item
              name="public_building_max"
              rules={[
                { message: "請輸入樓層 max" },
                {
                  validator: validateMax(
                    "public_building_min",
                    "public_building_max"
                  ),
                },
              ]}
            >
              <Input type="number" placeholder="max" />
            </Form.Item>
          </div>
          {/* 管理費 */}
          <div className="inline-flex gap-6">
            <Form.Item
              name="management_fee_min"
              label="管理費"
              rules={[{ message: "請輸入樓層 min" }]}
            >
              <Input type="number" placeholder="min" />
            </Form.Item>
            <p className="mt-1">~</p>
            <Form.Item
              name="management_fee_max"
              rules={[
                { message: "請輸入樓層 max" },
                {
                  validator: validateMax(
                    "management_fee_min",
                    "management_fee_max"
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
export default TenementListSell;

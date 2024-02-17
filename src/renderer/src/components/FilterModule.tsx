import { Form, Input, Button, Checkbox } from "antd";



const FilterModule = (props: any) => {
  const { handlePopout, handleSelect, form, validateMax, children, type } = props;
  

  const onFinish = (values: any) => {
    handleSelect(values);
    handlePopout();
  };
 
  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center bg-black bg-opacity-50"
      onClick={handlePopout}
    >
      <Form
        form={form}
        name="house_information"
        onFinish={onFinish}
        className="w-2/3 p-10 my-5 bg-white rounded-md h-5/6 overflow-y-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between px-10 mb-10">
          <p className="text-3xl font-bold">{type}篩選</p>
          <p className="text-xl cursor-pointer" onClick={handlePopout}>
            X
          </p>
        </div>
        <div className=" flex flex-col px-16 mb-10 h-5/6 ">
          <Form.Item name="tenement_address" label="地址" className="w-48 ">
            <Input />
          </Form.Item>
          <Form.Item name="tenement_product_type" label="產品類別">
            <Checkbox.Group>
              <Checkbox value="套房">套房</Checkbox>
              <Checkbox value="辦公室">辦公室</Checkbox>
              <Checkbox value="店面">店面</Checkbox>
              <Checkbox value="其他">其他</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="tenement_status" label="物件狀態">
            <Checkbox.Group>
              <Checkbox value="未成交">未成交</Checkbox>
              <Checkbox value="已成交">已成交</Checkbox>
              <Checkbox value="已成交下架">已成交下架</Checkbox>
              <Checkbox value="過戶完成下架">過戶完成下架</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item name="tenement_face" label="面向">
            <Checkbox.Group>
              <Checkbox value="海景">海景</Checkbox>
              <Checkbox value="中庭">中庭</Checkbox>
              <Checkbox value="三多路">三多路</Checkbox>
              <Checkbox value="自強路">自強路</Checkbox>
              <Checkbox value="市景風洞">市景風洞</Checkbox>
              <Checkbox value="海景風洞">海景風洞</Checkbox>
              <Checkbox value="其他">其他</Checkbox>
            </Checkbox.Group>
          </Form.Item>
  
          {children}

          <div className="flex gap-6">
            <Form.Item
              name="floor_min"
              label="樓層"
              rules={[{ message: "請輸入樓層 min" }]}
            >
              <Input type="number" placeholder="min" />
            </Form.Item>
            <p className="mt-1">~</p>
            <Form.Item
              name="floor_max"
              rules={[
                { message: "請輸入樓層 max" },
                { validator: validateMax("floor_min", "floor_max") },
              ]}
            >
              <Input type="number" placeholder="max" />
            </Form.Item>
          </div>
          <Form.Item className=" mb-10">
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              搜尋
            </Button>
          </Form.Item>
          <Form.Item className=" mb-10">
            
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FilterModule;

import { Input, Radio, Select } from "antd";
import Notice from "../../components/Notice";
import InputWithErrorMessage from "../../components/InputWithErrorMessage";
import { Button } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

import Uploadfile from "../../components/tenement/Uploadfile";
import useTenementNotice from "../../hooks/new-tenement/useTenementNotice";
import { useParams, useNavigate } from "react-router-dom";
import { useTenementMarketInfo } from "../../hooks/new-tenement/useTenement";
import {
  useGetSellEdit,
  useGetMarketEdit,
  useGetRentEdit,
  useGetDevelopEdit,
} from "../../hooks/useAPI";

export default function Market() {
  const { id: tenementId } = useParams();
  const query = new URLSearchParams(window.location.search);
  const isRollback = query.get("rollback");
  const getRentHook = useGetRentEdit();
  const getSellHook = useGetSellEdit();
  const getDevelopHook = useGetDevelopEdit();
  const getMarketHook = useGetMarketEdit();

  const noticeHook = useTenementNotice("market", tenementId as string);
  const marketHook = useTenementMarketInfo(tenementId as string);

  const onSave = () => {
    noticeHook.handlers.handleSaveNoticeData();
    marketHook.handlers.handleSave();
    alert("儲存成功");
  };

  const onDelete = () => {
    if (window.confirm("確定要刪除嗎?")) {
      marketHook.handlers.handleDelete("market", isRollback !== null);
    } else return;
  };

  const isLoading = marketHook.states.isLoading || noticeHook.states.isLoading;
  const isError = marketHook.states.isError || noticeHook.states.isError;
  const navigate = useNavigate();
  const handletypeChange = async (e: RadioChangeEvent) => {
    const marketData = marketHook.states.marketInfo;
    const urlParams = new URLSearchParams();
    // add new tenement_images add drop old tenement_images
    if (marketData.tenement_images.length > 0) {
      urlParams.append(
        "tenement_images",
        JSON.stringify(marketData.tenement_images)
      );
    } else {
      urlParams.append("tenement_images", JSON.stringify([]));
    }

    for (const key in marketData) {
      if (marketData.hasOwnProperty(key) && marketData[key] !== "") {
        if (key === "tenement_type") {
          urlParams.append(key, e.target.value as string);
          continue;
        }
        urlParams.append(key, marketData[key] as string);
      }
    }

    const queryString = urlParams.toString();

    async function switchAndNavigate(type: string, id: string) {
      let data;
      switch (type) {
        case "出租": {
          const newData = await getRentHook.getRentEdit(id);
          data = newData;
          break;
        }
        case "出售": {
          const newData = await getSellHook.getSellEdit(id);
          data = newData;
          break;
        }
        case "開發追蹤": {
          const newData = await getDevelopHook.getDevelopEdit(id);
          data = newData;
          break;
        }
        case "行銷追蹤": {
          const newData = await getMarketHook.getMarketEdit(id);
          data = newData;
          break;
        }
        default:
          break;
      }

      if (data) {
        const typeMap = {
          出租: "rent",
          出售: "sell",
          開發追蹤: "develop",
          行銷追蹤: "market",
        };
        navigate(`/tenement/${id}/${typeMap[type]}?tenement_type=${type}`);
      } else {
        navigate(`/Tenement/Add?${queryString}`);
      }
    }

    if (
      window.confirm(
        "是否要切換案件型態?(請確實按下儲存，避免切換後部分資料會遺失)"
      )
    ) {
      const id = window.location.pathname.split("/")[2];
      await switchAndNavigate(e.target.value, id);
    } else {
      return;
    }
  };

  return (
    <form
      className="flex flex-col items-center w-full h-full "
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <div className="flex flex-col w-full h-full max-w-screen-xl pb-12 mt-12 mb-10 bg-white shadow-2xl rounded-xl">
        <button
          className="flex w-12 h-20 mt-10 ml-5"
          onClick={() => navigate("/Tenements")}
        >
          {"< 返回"}
        </button>
        <div className="inline-flex flex-col mb-5 ml-8">
          <p className="text-4xl font-bold whitespace-normal">
            {isRollback && "復原"}行銷追蹤資料
          </p>
        </div>
        <p className="mb-3 ml-5 border-b-2 border-gray-300"></p>

        {isLoading && <p>isLoading...</p>}
        {isError && <p>isError...</p>}
        {!isLoading && !isError && (
          <div className="flex flex-row ">
            <div className="flex flex-col flex-wrap w-1/2 h-full gap-3 overflow-visible pl-7 ">
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 whitespace-nowrap ">地址:</p>
                <InputWithErrorMessage
                  value={marketHook.states.marketInfo.tenement_address}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_address",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_address.length <= 2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 房型 */}
              <div className="grid grid-cols-5 gap-1 ">
                <p className="col-span-1 text-right">產品類別:</p>
                {/* radio */}
                <Radio.Group
                  className="col-span-4"
                  value={marketHook.states.marketInfo.tenement_product_type}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_product_type",
                      e.target.value
                    )
                  }
                >
                  <Radio value="套房">套房</Radio>
                  <Radio value="店面">店面</Radio>
                  <Radio value="辦公室">辦公室</Radio>
                  <Radio value="其他">其他</Radio>
                </Radio.Group>
              </div>
              {/* 案件型態 */}
              <div className="grid grid-cols-5 gap-1 ">
                <p className="text-right whitespace-nowrap">物件型態:</p>
                <Radio.Group
                  value={marketHook.states.marketInfo.tenement_type}
                  onChange={(e) => {
                    handletypeChange(e);
                  }}
                  className="col-span-4 "
                >
                  <Radio value="出租">出租</Radio>
                  <Radio value="出售">出售</Radio>
                  <Radio value="開發追蹤">開發追蹤</Radio>
                  <Radio value="行銷追蹤">行銷追蹤</Radio>
                </Radio.Group>
              </div>

              {/* 面向 */}
              <div className="grid grid-cols-5 gap-1 ">
                <p className="col-span-1 text-right whitespace-nowrap ">
                  面向:
                </p>
                <Radio.Group
                  className="col-span-4"
                  value={marketHook.states.marketInfo.tenement_face}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_face",
                      e.target.value
                    )
                  }
                >
                  <Radio value="海景">海景</Radio>
                  <Radio value="中庭">中庭</Radio>
                  <Radio value="三多路">三多路</Radio>
                  <Radio value="自強路">自強路</Radio>
                  <Radio value="市景風洞">市景風洞</Radio>
                  <Radio value="海景風洞">海景風洞</Radio>
                  <Radio value="其他">其他</Radio>
                </Radio.Group>
              </div>

              <div>
                {/* 預期坪數區間 */}
                <div className="grid grid-cols-5 gap-1 mb-5 ">
                  <p className="col-span-1 pt-5 text-right">預期坪數:</p>
                  <div className="inline-grid items-center grid-flow-col ">
                    <Input
                      value={marketHook.states.marketInfo.tenement_area_min}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        marketHook.handlers.handleChange(
                          "tenement_area_min",
                          e.target.value
                        )
                      }
                      className="h-8 col-span-1 mt-3"
                      placeholder="最小值"
                    />
                    <p className="pt-3 pl-1 ">~</p>
                  </div>
                  <Input
                    value={marketHook.states.marketInfo.tenement_area_max}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      marketHook.handlers.handleChange(
                        "tenement_area_max",
                        e.target.value
                      )
                    }
                    className="col-span-1 mt-3"
                    placeholder="最大值"
                  />
                </div>
                <div className="grid grid-cols-10 gap-1 text-right">
                  <p className="col-span-2 pt-1 whitespace-nowrap ">
                    要租要買:
                  </p>
                  <Select
                    defaultValue="租房"
                    className="w-20 col-span-1 "
                    value={marketHook.states.marketInfo.market_state}
                    onChange={(value) =>
                      marketHook.handlers.handleChange("market_state", value)
                    }
                  >
                    <Select.Option value="租房">租房</Select.Option>
                    <Select.Option value="買房">買房</Select.Option>
                    <Select.Option value="要租要買">要租要買</Select.Option>
                  </Select>
                </div>
                {/* 預算 最大值 最小值 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">
                    {" "}
                    {marketHook.states.marketInfo.market_state === "租房"
                      ? "租金預算"
                      : "售價預算(萬)"}
                    :
                  </p>
                  <div className="inline-grid items-center grid-flow-col ">
                    <Input
                      value={marketHook.states.marketInfo.burget_rent_min}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        marketHook.handlers.handleChange(
                          "burget_rent_min",
                          e.target.value
                        )
                      }
                      className="h-8 col-span-1 mt-3"
                      placeholder="最小值"
                      required
                    />
                    <p className="pt-3 pl-1 ">~</p>
                  </div>
                  <Input
                    value={marketHook.states.marketInfo.burget_rent_max}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      marketHook.handlers.handleChange(
                        "burget_rent_max",
                        e.target.value
                      )
                    }
                    className="col-span-1 mt-3"
                    placeholder="最大值"
                    required
                  />
                </div>
                {/* 希望的樓層 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">希望的樓層:</p>
                  <div className="inline-grid items-center grid-flow-col ">
                    <Input
                      value={marketHook.states.marketInfo.hopefloor_min}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        marketHook.handlers.handleChange(
                          "hopefloor_min",
                          e.target.value
                        )
                      }
                      className="h-8 col-span-1 mt-3"
                      placeholder="最小值"
                      required
                    />
                    <p className="pt-3 pl-1 ">~</p>
                  </div>
                  <Input
                    value={marketHook.states.marketInfo.hopefloor_max}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      marketHook.handlers.handleChange(
                        "hopefloor_max",
                        e.target.value
                      )
                    }
                    className="col-span-1 mt-3"
                    placeholder="最大值"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-1/2 h-full ">
              {/* 房屋照片 */}
              <div className="inline-flex flex-col mb-10 ">
                <p className="mt-2 mb-3 text-3xl font-bold whitespace-normal">
                  房屋照片
                </p>
                <Uploadfile
                  fileList={marketHook.states.marketInfo.tenement_images}
                  setFileList={(newFilelist) => {
                    marketHook.handlers.handleChange(
                      "tenement_images",
                      newFilelist
                    );
                  }}
                />
              </div>
              <p className="mt-2 mb-3 text-3xl font-bold whitespace-normal">
                買客資訊
              </p>
              {/* 屋主姓名 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">姓名:</p>
                <InputWithErrorMessage
                  value={marketHook.states.marketInfo.tenement_host_name}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_name",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_host_name.length <= 2
                  }
                  errorMessage={"至少兩個字"}
                  required
                />
              </div>
              {/* 行動電話 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">行動電話:</p>
                <InputWithErrorMessage
                  value={marketHook.states.marketInfo.tenement_host_telphone}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_telphone",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_host_telphone
                      .length <= 2
                  }
                  errorMessage={"至少兩個字"}
                  required
                />
              </div>
              {/* 電話 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">電話:</p>
                <InputWithErrorMessage
                  value={marketHook.states.marketInfo.tenement_host_phone}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_phone",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_host_phone.length <= 2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* Line */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">Line:</p>
                <InputWithErrorMessage
                  value={marketHook.states.marketInfo.tenement_host_line}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_line",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_host_line.length <= 2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 屋主匯款資訊 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">匯款銀行:</p>
                <InputWithErrorMessage
                  value={
                    marketHook.states.marketInfo.tenement_host_remittance_bank
                  }
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_remittance_bank",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_host_remittance_bank
                      .length <= 2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/*  帳號 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">帳號:</p>
                <InputWithErrorMessage
                  value={
                    marketHook.states.marketInfo
                      .tenement_host_remittance_account
                  }
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_remittance_account",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo
                      .tenement_host_remittance_account.length <= 2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 通訊地址 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">通訊地址:</p>
                <InputWithErrorMessage
                  value={marketHook.states.marketInfo.tenement_host_address}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_address",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_host_address.length <=
                    2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 生日 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">生日:</p>
                <InputWithErrorMessage
                  value={marketHook.states.marketInfo.tenement_host_birthday}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_birthday",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_host_birthday
                      .length <= 2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 嗜好 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">嗜好:</p>
                <InputWithErrorMessage
                  value={marketHook.states.marketInfo.tenement_host_hobby}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_hobby",
                      e.target.value
                    )
                  }
                  isError={
                    marketHook.states.marketInfo.tenement_host_hobby.length <= 2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 備註 */}
              <div className="grid grid-cols-5 gap-1 mt-3 text-right">
                <p className="col-span-1 pt-5 ">備註:</p>
                {/* text area */}
                <Input.TextArea
                  className="col-span-3"
                  rows={4}
                  value={marketHook.states.marketInfo.tenement_host_remark}
                  onChange={(e) =>
                    marketHook.handlers.handleChange(
                      "tenement_host_remark",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col p-5">
          <div className="inline-flex flex-row gap-5 mb-5 ">
            <p className="text-4xl font-bold whitespace-normal">提醒設定</p>

            <Button
              type="primary"
              className="mt-1 bg-blue-600"
              onClick={noticeHook.handlers.handleAddNotice}
            >
              新增提醒
            </Button>
          </div>
          <p className="mb-3 ml-5 border-b-2 border-gray-300"></p>
          <div className="flex flex-col gap-5">
            {noticeHook.states.notices.map((notice, index: number) => (
              <Notice
                key={index}
                keya={index}
                notice={notice}
                handleNoticeChange={noticeHook.handlers.handleNoticeChange}
                handleDeleteNotice={noticeHook.handlers.handleDeleteNotice}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-5 m-10 ">
          <Button className="bg-blue-600 " type="primary" htmlType="submit">
            {isRollback ? "復原" : "儲存"}
          </Button>
          <Button type="default">回復預設</Button>
          <Button danger onClick={onDelete}>
            {isRollback ? "永久刪除" : "刪除"}
          </Button>
        </div>
      </div>
    </form>
  );
}

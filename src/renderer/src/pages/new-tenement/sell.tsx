import { DatePicker, Input, Radio } from "antd";
import Notice from "../../components/Notice";
import InputWithErrorMessage from "../../components/InputWithErrorMessage";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { RadioChangeEvent } from "antd/lib/radio";

import Uploadfile from "../../components/tenement/Uploadfile";
import useTenementNotice from "../../hooks/new-tenement/useTenementNotice";
import { useParams } from "react-router-dom";
import { useTenementSellInfo } from "../../hooks/new-tenement/useTenement";
import {
  useGetSellEdit,
  useGetMarketEdit,
  useGetRentEdit,
  useGetDevelopEdit,
} from "../../hooks/useAPI";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function Rent() {
  const { id: tenementId } = useParams();
  const query = new URLSearchParams(window.location.search);
  const isRollback = query.get("rollback");
  const getRentHook = useGetRentEdit();
  const getSellHook = useGetSellEdit();
  const getDevelopHook = useGetDevelopEdit();
  const getMarketHook = useGetMarketEdit();

  const noticeHook = useTenementNotice("sell", tenementId as string);
  const sellHook = useTenementSellInfo(tenementId as string);

  const onSave = () => {
    noticeHook.handlers.handleSaveNoticeData();
    sellHook.handlers.handleSave();
  };

  const onDelete = () => {
    if (window.confirm("確定要刪除嗎?")) {
      sellHook.handlers.handleDelete("sell", isRollback !== null);
    }
  };

  const isLoading = sellHook.states.isLoading || noticeHook.states.isLoading;
  const isError = sellHook.states.isError || noticeHook.states.isError;

  const navigate = useNavigate();
  const handletypeChange = async (e: RadioChangeEvent) => {
    const sellData = sellHook.states.sellInfo;
    const urlParams = new URLSearchParams();
    // add new tenement_images add drop old tenement_images
    if (sellData.tenement_images.length > 0) {
      urlParams.append(
        "tenement_images",
        JSON.stringify(sellData.tenement_images)
      );
    } else {
      urlParams.append("tenement_images", JSON.stringify([]));
    }

    for (const key in sellData) {
      if (sellData.hasOwnProperty(key) && sellData[key] !== "") {
        if (key === "tenement_type") {
          urlParams.append(key, e.target.value as string);
          continue;
        }
        urlParams.append(key, sellData[key] as string);
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
            {isRollback && "復原"}出售資料
          </p>
        </div>
        <p className="mb-3 ml-5 border-b-2 border-gray-300"></p>

        {isLoading && <p>isLoading...</p>}
        {isError && <p>isError...</p>}
        {!isLoading && !isError && (
          <>
            <div className="flex flex-row ">
              <div className="flex flex-col flex-wrap w-1/2 h-full gap-3 overflow-visible pl-7 ">
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 whitespace-nowrap ">地址:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_address}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_address",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_address.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                    required
                  />
                </div>
                {/* 房型 */}
                <div className="grid grid-cols-5 gap-1 ">
                  <p className="col-span-1 text-right">產品類別:</p>
                  {/* radio */}
                  <Radio.Group
                    className="col-span-4"
                    value={sellHook.states.sellInfo.tenement_product_type}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
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
                {/* 物件狀態 */}
                <div className="grid grid-cols-5 gap-1 ">
                  <p className="text-right whitespace-nowrap">物件狀態:</p>
                  <Radio.Group
                    className="col-span-4"
                    value={sellHook.states.sellInfo.tenement_status}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_status",
                        e.target.value
                      )
                    }
                  >
                    <Radio value="未成交">未成交</Radio>
                    <Radio value="已成交">已成交</Radio>
                    <Radio value="已成交下架">已成交下架</Radio>
                    <Radio value="過戶完成下架">過戶完成下架</Radio>
                  </Radio.Group>
                </div>
                {/* 案件型態 */}
                <div className="grid grid-cols-5 gap-1 ">
                  <p className="text-right whitespace-nowrap">物件型態:</p>
                  <Radio.Group
                    value={sellHook.states.sellInfo.tenement_type}
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
                    value={sellHook.states.sellInfo.tenement_face}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
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

                {/* 總坪數 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">權狀坪數:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.total_rating}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "total_rating",
                        e.target.value
                      )
                    }
                    isError={sellHook.states.sellInfo.total_rating.length <= 2}
                    errorMessage={"至少兩個字"}
                    required
                  />
                </div>
                {/* 主建物坪數 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 whitespace-nowrap ">主建物:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.main_building}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "main_building",
                        e.target.value
                      )
                    }
                    isError={sellHook.states.sellInfo.main_building.length <= 2}
                    errorMessage={"至少兩個字"}
                    required
                  />
                </div>
                {/* 附屬建物坪數 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">附屬建物:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.affiliated_building}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "affiliated_building",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.affiliated_building.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                    required
                  />
                </div>
                {/* 公共設施坪數 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">公設面積:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.public_building}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "public_building",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.public_building.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                    required
                  />
                </div>

                {/* 未登記面積 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">未登記面積:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.unregistered_area}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "unregistered_area",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.unregistered_area.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>

                {/* 輸入倍率 成 total rating去改變管理費*/}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">管理費倍率:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.management_magnification}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      sellHook.handlers.handleChange(
                        "management_fee",
                        (
                          parseFloat(e.target.value) *
                          parseFloat(sellHook.states.sellInfo.total_rating)
                        ).toString()
                      );
                      sellHook.handlers.handleChange(
                        "management_magnification",
                        e.target.value
                      );
                    }}
                    isError={
                      sellHook.states.sellInfo.management_fee.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 售價 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">售價(萬):</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.selling_price}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "selling_price",
                        e.target.value
                      )
                    }
                    isError={sellHook.states.sellInfo.selling_price.length <= 2}
                    errorMessage={"至少兩個字"}
                    required
                  />
                </div>

                {/* 管理費 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">管理費:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.management_fee}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "management_fee",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.management_fee.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>

                {/* 樓層 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">總樓層:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_floor}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_floor",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_floor.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
              </div>

              <div className="flex flex-col w-1/2 h-full ">
                {/* 房屋照片 */}
                <div className="inline-flex flex-col mb-10 ">
                  <p className="mt-2 mb-3 text-3xl font-bold whitespace-normal">
                    房屋照片
                  </p>
                  <Uploadfile
                    fileList={sellHook.states.sellInfo.tenement_images}
                    setFileList={(newFilelist) => {
                      sellHook.handlers.handleChange(
                        "tenement_images",
                        newFilelist
                      );
                    }}
                  />
                </div>
                <p className="mt-2 mb-3 text-3xl font-bold whitespace-normal">
                  屋主資訊
                </p>
                {/* 屋主姓名 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">姓名:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_host_name}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_name",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_name.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                    required
                  />
                </div>
                {/* 行動電話 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">行動電話:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_host_telphone}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_telphone",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_telphone.length <=
                      2
                    }
                    errorMessage={"至少兩個字"}
                    required
                  />
                </div>
                {/* 電話 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">電話:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_host_phone}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_phone",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_phone.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* Line */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">Line:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_host_line}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_line",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_line.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 屋主匯款資訊 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">匯款銀行:</p>
                  <InputWithErrorMessage
                    value={
                      sellHook.states.sellInfo.tenement_host_remittance_bank
                    }
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_remittance_bank",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_remittance_bank
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
                      sellHook.states.sellInfo.tenement_host_remittance_account
                    }
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_remittance_account",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_remittance_account
                        .length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 通訊地址 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">通訊地址:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_host_address}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_address",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_address.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 生日 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">生日:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_host_birthday}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_birthday",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_birthday.length <=
                      2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 嗜好 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">嗜好:</p>
                  <InputWithErrorMessage
                    value={sellHook.states.sellInfo.tenement_host_hobby}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_hobby",
                        e.target.value
                      )
                    }
                    isError={
                      sellHook.states.sellInfo.tenement_host_hobby.length <= 2
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
                    value={sellHook.states.sellInfo.tenement_host_remark}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "tenement_host_remark",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full px-5 mt-10">
              <div className="inline-flex col-span-2 mb-5 ml-10">
                <p className="text-4xl font-bold">買客資訊</p>
              </div>
              <p className="mb-3 ml-5 border-b-2 border-gray-300"></p>
              <div className="flex flex-row w-full ">
                <div className="flex flex-col w-1/3 gap-5 mr-3 ">
                  {/* buyer_order_date */}
                  <div className="grid grid-cols-5 gap-1 text-right">
                    <p className="col-span-1 pt-5 ">下定日期:</p>
                    <DatePicker
                      className="col-span-3"
                      value={dayjs(
                        sellHook.states.sellInfo.buyer_order_date,
                        "YYYY-MM-DD"
                      )}
                      onChange={(_, dateString) =>
                        sellHook.handlers.handleChange(
                          "buyer_order_date",
                          dateString
                        )
                      }
                    />
                  </div>

                  {/* buyer_handout_date */}
                  <div className="grid grid-cols-5 gap-1 text-right">
                    <p className="col-span-1 pt-5 ">交房日期:</p>
                    <DatePicker
                      className="col-span-3"
                      value={dayjs(
                        sellHook.states.sellInfo.buyer_handout_date,
                        "YYYY-MM-DD"
                      )}
                      onChange={(_, dateString) =>
                        sellHook.handlers.handleChange(
                          "buyer_handout_date",
                          dateString
                        )
                      }
                    />
                  </div>
                  {/* buyer_name */}
                  <div className="grid grid-cols-5 gap-1 text-right">
                    <p className="col-span-1 pt-5 ">姓名:</p>
                    <InputWithErrorMessage
                      value={sellHook.states.sellInfo.buyer_name}
                      onChange={(e) =>
                        sellHook.handlers.handleChange(
                          "buyer_name",
                          e.target.value
                        )
                      }
                      isError={sellHook.states.sellInfo.buyer_name.length <= 2}
                      errorMessage={"至少兩個字"}
                    />
                  </div>
                  {/* buyer_phone */}
                  <div className="grid grid-cols-5 gap-1 text-right">
                    <p className="col-span-1 pt-5 ">行動電話:</p>
                    <InputWithErrorMessage
                      value={sellHook.states.sellInfo.buyer_phone}
                      onChange={(e) =>
                        sellHook.handlers.handleChange(
                          "buyer_phone",
                          e.target.value
                        )
                      }
                      isError={sellHook.states.sellInfo.buyer_phone.length <= 2}
                      errorMessage={"至少兩個字"}
                    />
                  </div>
                  {/* buyer_jobtitle */}
                  <div className="grid grid-cols-5 gap-1 text-right">
                    <p className="col-span-1 pt-5 ">職稱:</p>
                    <InputWithErrorMessage
                      value={sellHook.states.sellInfo.buyer_jobtitle}
                      onChange={(e) =>
                        sellHook.handlers.handleChange(
                          "buyer_jobtitle",
                          e.target.value
                        )
                      }
                      isError={
                        sellHook.states.sellInfo.buyer_jobtitle.length <= 2
                      }
                      errorMessage={"至少兩個字"}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-1/3 ">
                  <div className="grid grid-cols-3 gap-1 ">
                    <p className="col-span-2 ">身分證件翻拍存檔:</p>
                  </div>
                  <Uploadfile
                    fileList={sellHook.states.sellInfo.buyer_id_images}
                    setFileList={(newFilelist) => {
                      sellHook.handlers.handleChange(
                        "buyer_id_images",
                        newFilelist
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col w-1/3 ml-5">
                  <div className="grid grid-cols-5 gap-1 ">
                    <p className="col-span-5 ">備註:</p>
                  </div>
                  <textarea
                    className="w-full h-40 border border-gray-300"
                    value={sellHook.states.sellInfo.buyer_remark}
                    onChange={(e) =>
                      sellHook.handlers.handleChange(
                        "buyer_remark",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </>
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

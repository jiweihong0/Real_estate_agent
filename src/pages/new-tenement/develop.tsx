import {  Input, Radio } from "antd";
import Notice from "../../components/Notice";
import InputWithErrorMessage from "../../components/InputWithErrorMessage";
import { Button } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";




import Uploadfile from "../../components/tenement/Uploadfile";
import useTenementNotice from "../../hooks/new-tenement/useTenementNotice";
import { useNavigate, useParams } from "react-router-dom";
import { useTenementDevelopInfo } from "../../hooks/new-tenement/useTenement";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default function Rent() {
  const { id: tenementId } = useParams();

  const noticeHook = useTenementNotice("develop", tenementId as string);
  const developHook = useTenementDevelopInfo(tenementId as string);

  const onSave = () => {
    noticeHook.handlers.handleSaveNoticeData();
    developHook.handlers.handleSave();
  };

  const onDelete = () => {
    if (window.confirm("確定要刪除嗎?")) {
      developHook.handlers.handleDelete();
    }
  }

  const isLoading = developHook.states.isLoading || noticeHook.states.isLoading;
  const isError = developHook.states.isError || noticeHook.states.isError;
  const navigate = useNavigate();
  const handletypeChange = (e: RadioChangeEvent) => {
    
    if (
      window.confirm(
        "是否要切換案件型態?(請確實按下儲存，避免切換後部分資料會遺失)"
      )
    ) {
      const id = window.location.pathname.split("/")[2];
      switch (e.target.value) {
        case "出租":
          navigate("/tenement/" + id + "/rent");
          break;
        case "出售":
          navigate("/tenement/" + id + "/sell");
          break;
        case "開發追蹤":
          navigate("/tenement/" + id + "/develop");
          break;
        case "行銷追蹤":
          navigate("/tenement/" + id + "/market");
          break;
        default:
          break;
      }
    } else return;
  };

  return (
    <div className="flex flex-col items-center w-full h-full ">
      <div className="flex flex-col w-full h-full max-w-screen-xl pb-12 mt-12 mb-10 bg-white shadow-2xl rounded-xl">
        <button className="flex w-12 h-20 mt-10 ml-5" onClick={()=>navigate("/Tenements")}>{"< 返回"}</button>
        <div className="inline-flex flex-col mb-5 ml-8">
          <p className="text-4xl font-bold whitespace-normal">開發追蹤資料</p>
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
                    value={developHook.states.developInfo.tenement_address}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_address",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_address.length <= 2
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
                    value={developHook.states.developInfo.tenement_product_type}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
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
                    value={developHook.states.developInfo.tenement_type}
                    onChange={(e) =>{
                      handletypeChange(e)}
                    }
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
                    value={developHook.states.developInfo.tenement_face}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
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
                    value={developHook.states.developInfo.total_rating}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "total_rating",
                        e.target.value
                      )
                    }
                    isError={developHook.states.developInfo.total_rating.length <= 2}
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 主建物坪數 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 whitespace-nowrap ">主建物:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.main_building}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "main_building",
                        e.target.value
                      )
                    }
                    isError={developHook.states.developInfo.main_building.length <= 2}
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 附屬建物坪數 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">附屬建物:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.affiliated_building}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "affiliated_building",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.affiliated_building.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 公共設施坪數 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">公設面積:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.public_building}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "public_building",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.public_building.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>

                {/* 未登記面積 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">未登記面積:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.unregistered_area}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "unregistered_area",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.unregistered_area.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>

                {/* 輸入倍率 成 total rating去改變管理費*/}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">管理費倍率:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.management_magnification}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      developHook.handlers.handleChange(
                        "management_fee",
                        (
                          parseFloat(e.target.value) *
                          parseFloat(developHook.states.developInfo.total_rating)
                        ).toString()
                      );
                      developHook.handlers.handleChange(
                        "management_magnification",
                        e.target.value
                      );
                    }}
                    isError={
                      developHook.states.developInfo.management_fee.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>

                {/* 管理費 */}

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">管理費:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.management_fee}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "management_fee",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.management_fee.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>

                 {/* 售價 */}
                 <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">售價(萬):</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.selling_price}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "selling_price",
                        e.target.value
                      )
                    }
                    isError={developHook.states.developInfo.selling_price.length <= 2}
                    errorMessage={"至少兩個字"}
                  />
                </div>


                {/* 租金 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">租金:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.rent_price}
                    onChange={(e) =>
                      developHook.handlers.handleChange("rent_price", e.target.value)
                    }
                    isError={developHook.states.developInfo.rent_price.length <= 2}
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 押金 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">押金:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.deposit_price}
                    onChange={(e) =>
                      developHook.handlers.handleChange("deposit_price", e.target.value)
                    }
                    isError={developHook.states.developInfo.deposit_price.length <= 2}
                    errorMessage={"至少兩個字"}
                  />
                </div>

                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">總樓層:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.tenement_floor}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_floor",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_floor.length <= 2
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
                  <Uploadfile />
                </div>
                <p className="mt-2 mb-3 text-3xl font-bold whitespace-normal">
                  屋主資訊
                </p>
                {/* 屋主姓名 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">姓名:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.tenement_host_name}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_name",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_name.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 行動電話 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">行動電話:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.tenement_host_telphone}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_telphone",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_telphone.length <=
                      2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 電話 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">電話:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.tenement_host_phone}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_phone",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_phone.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* Line */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">Line:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.tenement_host_line}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_line",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_line.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 屋主匯款資訊 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">匯款銀行:</p>
                  <InputWithErrorMessage
                    value={
                      developHook.states.developInfo.tenement_host_remittance_bank
                    }
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_remittance_bank",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_remittance_bank
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
                      developHook.states.developInfo.tenement_host_remittance_account
                    }
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_remittance_account",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_remittance_account
                        .length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 通訊地址 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">通訊地址:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.tenement_host_address}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_address",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_address.length <= 2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 生日 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">生日:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.tenement_host_birthday}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_birthday",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_birthday.length <=
                      2
                    }
                    errorMessage={"至少兩個字"}
                  />
                </div>
                {/* 嗜好 */}
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">嗜好:</p>
                  <InputWithErrorMessage
                    value={developHook.states.developInfo.tenement_host_hobby}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_hobby",
                        e.target.value
                      )
                    }
                    isError={
                      developHook.states.developInfo.tenement_host_hobby.length <= 2
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
                    value={developHook.states.developInfo.tenement_host_remark}
                    onChange={(e) =>
                      developHook.handlers.handleChange(
                        "tenement_host_remark",
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
          <Button className="bg-blue-600 " type="primary" onClick={onSave}>
            儲存
          </Button>
          <Button type="default">回復預設</Button>
          <Button danger onClick={onDelete}>刪除</Button>
        </div>
      </div>
    </div>
  );
}

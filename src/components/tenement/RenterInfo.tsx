import { DatePicker, Input } from "antd";
import Uploadfile from "./Uploadfile";

export default function RenterInfo() {
  return (
    // 租客資訊
    <div className="flex flex-col w-full mt-10">
      <div className="inline-flex mb-5 ml-16 w-60">
        <p className="text-4xl font-bold">租客資訊</p>
      </div>
      <p className="mb-3 ml-5 border-b-2 border-gray-300"></p>
      <div className="flex flex-row first-letter: ">
        <div className="flex flex-col w-2/5 gap-10 ml-32">
          {/* 租屋期限開始 */}
          <div className="inline-flex items-center whitespace-nowrap w-60">
            <p>租屋開始日:</p>
            <DatePicker />
          </div>
          {/* 租屋期限結束 */}
          <div className="inline-flex items-center whitespace-nowrap w-60">
            <p>租屋結束日:</p>
            <DatePicker />
          </div>

          {/* 租客姓名 */}
          <div className="inline-flex items-center whitespace-nowrap w-60">
            <p>&nbsp;&nbsp;&nbsp;</p>
            <p>租客姓名:</p>
            <Input className="w-60" />
          </div>
          {/* 電話 */}
          <div className="inline-flex items-center whitespace-nowrap w-60">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p>電話:</p>
            <Input className="w-60" />
          </div>
          {/* 工作職稱 */}
          <div className="inline-flex items-center whitespace-nowrap w-60">
            <p>&nbsp;&nbsp;&nbsp;</p>
            <p>工作職稱:</p>
            <Input className="w-60" />
          </div>
          {/* 保證人姓名 */}
          <div className="inline-flex items-center whitespace-nowrap w-60">
            <p>保證人姓名:</p>
            <Input className="w-60" />
          </div>
          {/* 保證人電話 */}
          <div className="inline-flex items-center whitespace-nowrap w-60">
            <p>保證人電話:</p>
            <Input className="w-60" />
          </div>
        </div>
        <div className="flex w-3/5 ">
          {/* 身分證件翻拍存檔 */}
          <div className="flex flex-col w-2/5 ">
            <div className="inline-flex items-center whitespace-nowrap w-60">
              <p>身分證件翻拍存檔:</p>
            </div>
            <Uploadfile />
          </div>
          {/* 特殊約定 */}
          <div className="flex flex-col w-3/5 ml-10">
            <div className="inline-flex items-center whitespace-nowrap w-60">
              <p>特殊約定:</p>
            </div>
            <Input.TextArea className="w-60" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { DatePicker, Input } from "antd";
import Uploadfile from "./Uploadfile";

export default function SellerInfo() {
  return (
    // 買客資訊
    <div className="flex flex-col w-full mt-10">
      <div className="inline-flex mb-10 ml-16 w-96">
        <p className="text-4xl font-bold">買客資訊</p>
      </div>
      <div className="flex flex-row first-letter: ">
        <div className="flex flex-col w-2/5 gap-10 ml-32">
          {/* 下定日期 */}
          <div className="inline-flex items-center whitespace-nowrap w-96">
            <p>&nbsp;&nbsp;&nbsp;</p>
            <p>下定日期:</p>
            <DatePicker />
          </div>
          {/* 交房日期 */}
          <div className="inline-flex items-center whitespace-nowrap w-96">
            <p>&nbsp;&nbsp;&nbsp;</p>
            <p>交房日期:</p>
            <DatePicker />
          </div>
          {/* 買客姓名 */}
          <div className="inline-flex items-center whitespace-nowrap w-96">
            <p>&nbsp;&nbsp;&nbsp;</p>
            <p>買客姓名:</p>
            <Input className="w-96" />
          </div>
          {/* 電話 */}
          <div className="inline-flex items-center whitespace-nowrap w-96">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <p>電話:</p>
            <Input className="w-96" />
          </div>
          {/* 工作職稱 */}
          <div className="inline-flex items-center whitespace-nowrap w-96">
            <p>&nbsp;&nbsp;&nbsp;</p>
            <p>工作職稱:</p>
            <Input className="w-96" />
          </div>
        </div>
        <div className="flex w-3/5 ">
          {/* 身分證件翻拍存檔 */}
          <div className="flex flex-col w-2/5 ">
            <div className="inline-flex items-center whitespace-nowrap w-96">
              <p>身分證件翻拍存檔:</p>
            </div>
            <Uploadfile />
          </div>
        </div>
      </div>
    </div>
  );
}

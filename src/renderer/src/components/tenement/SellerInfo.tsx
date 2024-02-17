import { DatePicker, Input } from "antd";
import Uploadfile from "./Uploadfile";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

type SellerInfoProps = {
  sellerData: {
    buyer_order_date: string;
    buyer_handout_date: string;
    buyer_name: string;
    buyer_id_images: string[];
    buyer_phone: string;
    buyer_jobtitle: string;
    buyer_remark: string;
  };
  handleChangeSeller: any;
};

export default function SellerInfo(props: SellerInfoProps) {
  const { sellerData, handleChangeSeller } = props;
  const dateFormat = "YYYY-MM-DD";
  const buyer_order_date = dayjs(sellerData.buyer_order_date, dateFormat);
  const buyer_handout_date = dayjs(sellerData.buyer_handout_date, dateFormat);

  return (
    // 買客資訊
    <div className="flex flex-col w-full px-5 mt-10">
      <div className="inline-flex mb-10 ml-16 gird ">
        <p className="text-4xl font-bold">買客資訊</p>
      </div>
      <p className="mb-3 ml-5 border-b-2 border-gray-300"></p>
      <div className="flex flex-row w-full ">
        <div className="flex flex-col w-1/2 gap-10 pr-10 ">
          {/* 下定日期 */}
          <div className="grid grid-cols-3 gap-1 text-right ">
            <p className="col-span-1 ">下定日期:</p>
            <DatePicker
              className="col-span-2"
              value={buyer_order_date}
              onChange={(_, dateString) =>
                handleChangeSeller("buyer_order_date", dateString)
              }
            />
          </div>
          {/* 交房日期 */}
          <div className="grid grid-cols-3 gap-1 text-right ">
            <p className="col-span-1 ">交房日期:</p>
            <DatePicker
              className="col-span-2"
              value={buyer_handout_date}
              onChange={(_, dateString) =>
                handleChangeSeller("buyer_handout_date", dateString)
              }
            />
          </div>
          {/* 買客姓名 */}
          <div className="grid grid-cols-3 gap-1 text-right ">
            <p className="col-span-1 ">買客姓名:</p>
            <Input
              className="col-span-2"
              value={sellerData.buyer_name}
              onChange={(e) => handleChangeSeller("buyer_name", e.target.value)}
            />
          </div>
          {/* 電話 */}
          <div className="grid grid-cols-3 gap-1 text-right ">
            <p className="col-span-1 ">電話:</p>
            <Input
              className="col-span-2"
              value={sellerData.buyer_phone}
              onChange={(e) =>
                handleChangeSeller("buyer_phone", e.target.value)
              }
            />
          </div>
          {/* 工作職稱 */}
          <div className="grid grid-cols-3 gap-1 text-right ">
            <p className="col-span-1 ">工作職稱:</p>
            <Input
              className="col-span-2"
              value={sellerData.buyer_jobtitle}
              onChange={(e) =>
                handleChangeSeller("buyer_jobtitle", e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2 ">
          {/* 身分證件拍存檔 */}
          <div className="grid grid-cols-3 gap-1 ">
            <p className="col-span-2 ">身分證件翻拍存檔:</p>
          </div>
          <Uploadfile
            fileList={sellerData.buyer_id_images}
            setFileList={(newFilelist) => {
              handleChangeSeller("buyer_id_images", newFilelist);
            }}
          />
        </div>
        <div className="flex flex-col w-1/3 ml-5">
          <div className="grid grid-cols-5 gap-1 ">
            <p className="col-span-5 ">備註:</p>
          </div>
          <Input.TextArea
            className="h-40"
            value={sellerData.buyer_remark}
            onChange={(e) => handleChangeSeller("buyer_remark", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

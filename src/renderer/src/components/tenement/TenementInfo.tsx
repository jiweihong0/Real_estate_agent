import { Button, Radio, RadioChangeEvent, Select, Input } from "antd";
import Notice from "../Notice";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputWithErrorMessage from "../InputWithErrorMessage";
import RenterInfo from "./RenterInfo";
import Uploadfile from "./Uploadfile";
import SellerInfo from "./SellerInfo";
import { memo, useEffect, useState } from "react";
import { usePostAddTenement, handlePostAddNotice } from "../../hooks/useAPI";
import { NoticeData } from "../../type";
import moment from "moment";

const SwitchTenementType = memo(
  (props: {
    tenement_type: string;
    sellerData: any;
    renterData: any;
    handleChangeSeller: any;
    handleRenterChange: any;
  }) => {
    const {
      tenement_type,
      sellerData,
      handleChangeSeller,
      renterData,
      handleRenterChange,
    } = props;

    switch (tenement_type) {
      case "出租":
        return (
          <RenterInfo
            renterData={renterData}
            handleRenterChange={handleRenterChange}
          />
        );
      case "出售":
        return (
          <SellerInfo
            sellerData={sellerData}
            handleChangeSeller={handleChangeSeller}
          />
        );
      case "開發追蹤":
        return "";
      case "行銷追蹤":
        return "";
      default:
        return "";
    }
  }
);

export default function TenementInfo(props: any) {
  const nowdatestring = moment().format("YYYY-MM-DD");
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/tenements");
  };

  const [searchParams] = useSearchParams();
  const handlePutDataWithQuery = (searchParams: URLSearchParams) => {
    const tenementType = searchParams.get("tenement_type") || "出租";
    setTenement_type(tenementType);
    return {
      tenement_id: searchParams.get("tenement_id") || "",
      tenement_address: searchParams.get("tenement_address") || "",
      tenement_product_type:
        searchParams.get("tenement_product_type") || "套房",
      tenement_type: tenementType,
      tenement_face: searchParams.get("tenement_face") || "",
      tenement_images:
        JSON.parse(searchParams.get("tenement_images") as string) || [],
      tenement_status: searchParams.get("tenement_status") || "未成交",
      total_rating: searchParams.get("total_rating") || "",
      main_building: searchParams.get("main_building") || "",
      affiliated_building: searchParams.get("affiliated_building") || "",
      public_building: searchParams.get("public_building") || "",
      unregistered_area: searchParams.get("unregistered_area") || "",
      management_magnification:
        searchParams.get("management_magnification") || "",
      management_fee: searchParams.get("management_fee") || "",
      rent_price: searchParams.get("rent_price") || "",
      deposit_price: searchParams.get("deposit_price") || "",
      tenement_floor: searchParams.get("tenement_floor") || "",
      tenement_host_name: searchParams.get("tenement_host_name") || "",
      tenement_host_telphone: searchParams.get("tenement_host_telphone") || "",
      tenement_host_phone: searchParams.get("tenement_host_phone") || "",
      tenement_host_line: searchParams.get("tenement_host_line") || "",
      tenement_host_remittance_bank:
        searchParams.get("tenement_host_remittance_bank") || "",
      tenement_host_remittance_account:
        searchParams.get("tenement_host_remittance_account") || "",
      tenement_host_address: searchParams.get("tenement_host_address") || "",
      tenement_host_birthday: searchParams.get("tenement_host_birthday") || "",
      tenement_host_hobby: searchParams.get("tenement_host_hobby") || "",
      tenement_host_remark: searchParams.get("tenement_host_remark") || "",
      tenement_area_max: searchParams.get("tenement_area_max") || "",
      tenement_area_min: searchParams.get("tenement_area_min") || "",
      burget_rent_max: searchParams.get("burget_rent_max") || "",
      burget_rent_min: searchParams.get("burget_rent_min") || "",
      hopefloor_max: searchParams.get("hopefloor_max") || "",
      hopefloor_min: searchParams.get("hopefloor_min") || "",
      market_state: searchParams.get("market_state") || "",
      selling_price: searchParams.get("selling_price") || "",
    };
  };

  const [formData, setFormData] = useState({
    tenement_address: "",
    tenement_product_type: "套房",
    tenement_type: "出租",
    tenement_face: "海景",
    tenement_images: [],
    tenement_status: "已成交",
    total_rating: "0.0",
    main_building: "0.0",
    affiliated_building: "0.0",
    public_building: "0.0",
    unregistered_area: "0.0",
    management_magnification: "1.5",
    management_fee: "0",
    rent_price: "0",
    deposit_price: "0",
    tenement_floor: "0",
    tenement_host_name: "0",
    tenement_host_telphone: "0",
    tenement_host_phone: "0",
    tenement_host_line: "0",
    tenement_host_remittance_bank: "0",
    tenement_host_remittance_account: "9876543210",
    tenement_host_address: "123 Main St, City, Country",
    tenement_host_birthday: "1980-01-01",
    tenement_host_hobby: "Reading",
    tenement_host_remark: "No remarks",
    tenement_area_max: "10",
    tenement_area_min: "5",
    burget_rent_max: "20000",
    burget_rent_min: "10000",
    hopefloor_max: "5",
    hopefloor_min: "2",
    market_state: "租房",
    selling_price: "1000",
  });

  const [renterData, setRenterData] = useState({
    renter_start_date: nowdatestring,
    renter_end_date: nowdatestring,
    renter_name: "Jane Doe",
    renter_phone: "0987654321",
    renter_jobtitle: "Software Engineer",
    renter_guarantor_name: "John Smith",
    renter_guarantor_phone: "1234567890",
    renter_remark: "No remarks",
    renter_id_images: [],
  });

  const [sellerData, setSellerData] = useState({
    buyer_order_date: nowdatestring,
    buyer_handout_date: nowdatestring,
    buyer_name: "Jane Doe",
    buyer_id_images: [],
    buyer_phone: "0987654321",
    buyer_jobtitle: "Software Engineer",
    buyer_remark: "No remarks",
  });
  const handleChangeSeller = (key: string, value: string) => {
    setSellerData((prev) => ({ ...prev, [key]: value }));
  };
  const handleRenterChange = (key: string, value: string) => {
    setRenterData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const newFormData = handlePutDataWithQuery(searchParams);
    setFormData(newFormData);
  }, [searchParams]);

  const { isLoading, isError } = props;
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const handleNoticeChange = (index: number, key: string, value: any) => {
    setNotices((prev) =>
      prev.map((notice, i) =>
        i === index ? { ...notice, [key]: value } : notice
      )
    );
  };
  const handleDeleteNotice = (index: number) => {
    setNotices((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddNotice = () => {
    setNotices((prev) => [
      ...prev,
      {
        id: Math.random(),
        visitDate: nowdatestring,
        record: "",
        remindDate: nowdatestring,
        remind: "",
        isNew: true,
      },
    ]);
  };

  const { handlePostAddTenement } = usePostAddTenement();
  // const { handlePostAddNotice } = usePostAddNotice();
  const handleSave = async () => {
    const rentData = {
      tenement_address: formData.tenement_address,
      tenement_product_type: formData.tenement_product_type,
      tenement_type: formData.tenement_type,
      tenement_face: formData.tenement_face,
      tenement_images: formData.tenement_images,
      tenement_status: formData.tenement_status,
      total_rating: formData.total_rating,
      main_building: formData.main_building,
      affiliated_building: formData.affiliated_building,
      public_building: formData.public_building,
      unregistered_area: formData.unregistered_area,
      management_magnification: formData.management_magnification,
      management_fee: formData.management_fee,
      rent_price: formData.rent_price,
      deposit_price: formData.deposit_price,
      tenement_floor: formData.tenement_floor,
      tenement_host_name: formData.tenement_host_name,
      tenement_host_telphone: formData.tenement_host_telphone,
      tenement_host_phone: formData.tenement_host_phone,
      tenement_host_line: formData.tenement_host_line,
      tenement_host_remittance_bank: formData.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        formData.tenement_host_remittance_account,
      tenement_host_address: formData.tenement_host_address,
      tenement_host_birthday: formData.tenement_host_birthday,
      tenement_host_hobby: formData.tenement_host_hobby,
      tenement_host_remark: formData.tenement_host_remark,
      ...renterData,
    };

    const sellData = {
      tenement_address: formData.tenement_address,
      tenement_product_type: formData.tenement_product_type,
      tenement_type: formData.tenement_type,
      tenement_face: formData.tenement_face,
      tenement_images: formData.tenement_images,
      tenement_status: formData.tenement_status,
      total_rating: formData.total_rating,
      main_building: formData.main_building,
      affiliated_building: formData.affiliated_building,
      public_building: formData.public_building,
      unregistered_area: formData.unregistered_area,
      management_magnification: formData.management_magnification,
      management_fee: formData.management_fee,
      selling_price: formData.selling_price,
      tenement_floor: formData.tenement_floor,
      tenement_host_name: formData.tenement_host_name,
      tenement_host_telphone: formData.tenement_host_telphone,
      tenement_host_phone: formData.tenement_host_phone,
      tenement_host_line: formData.tenement_host_line,
      tenement_host_remittance_bank: formData.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        formData.tenement_host_remittance_account,
      tenement_host_address: formData.tenement_host_address,
      tenement_host_birthday: formData.tenement_host_birthday,
      tenement_host_hobby: formData.tenement_host_hobby,
      tenement_host_remark: formData.tenement_host_remark,
      ...sellerData,
    };
    const developerData = {
      tenement_address: formData.tenement_address,
      tenement_product_type: formData.tenement_product_type,
      tenement_type: formData.tenement_type,
      tenement_face: formData.tenement_face,
      tenement_images: formData.tenement_images,
      total_rating: formData.total_rating,
      main_building: formData.main_building,
      affiliated_building: formData.affiliated_building,
      public_building: formData.public_building,
      unregistered_area: formData.unregistered_area,
      management_magnification: formData.management_magnification,
      management_fee: formData.management_fee,
      selling_price: formData.selling_price,
      rent_price: formData.rent_price,
      deposit_price: formData.deposit_price,
      tenement_floor: formData.tenement_floor,
      tenement_host_name: formData.tenement_host_name,
      tenement_host_telphone: formData.tenement_host_telphone,
      tenement_host_phone: formData.tenement_host_phone,
      tenement_host_line: formData.tenement_host_line,
      tenement_host_remittance_bank: formData.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        formData.tenement_host_remittance_account,
      tenement_host_address: formData.tenement_host_address,
      tenement_host_birthday: formData.tenement_host_birthday,
      tenement_host_hobby: formData.tenement_host_hobby,
      tenement_host_remark: formData.tenement_host_remark,
    };
    const marketData = {
      tenement_address: formData.tenement_address,
      tenement_product_type: formData.tenement_product_type,
      tenement_type: formData.tenement_type,
      tenement_face: formData.tenement_face,
      tenement_images: formData.tenement_images,
      tenement_host_name: formData.tenement_host_name,
      tenement_host_telphone: formData.tenement_host_telphone,
      tenement_host_phone: formData.tenement_host_phone,
      tenement_host_line: formData.tenement_host_line,
      tenement_host_remittance_bank: formData.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        formData.tenement_host_remittance_account,
      tenement_host_address: formData.tenement_host_address,
      tenement_host_birthday: formData.tenement_host_birthday,
      tenement_host_hobby: formData.tenement_host_hobby,
      tenement_host_remark: formData.tenement_host_remark,
      tenement_area_max: formData.tenement_area_max,
      tenement_area_min: formData.tenement_area_min,
      burget_rent_max: formData.burget_rent_max,
      burget_rent_min: formData.burget_rent_min,
      hopefloor_max: formData.hopefloor_max,
      hopefloor_min: formData.hopefloor_min,
      market_state: formData.market_state,
    };

    function getNoticeWithTenementId(
      notices: NoticeData[],
      tenementId: number
    ) {
      return notices.map((notice) => ({
        visitDate: notice.visitDate,
        record: notice.record,
        remindDate: notice.remindDate,
        remind: notice.remind,
        collection_id: tenementId,
      }));
    }

    async function startCreateTenement(
      tenement_type: string,
      tenementData: any
    ) {
      const tenementId = await handlePostAddTenement(
        tenement_type,
        tenementData
      );
      if (tenementId) {
        const newNotices = getNoticeWithTenementId(notices, tenementId);
        handlePostAddNotice(tenement_type, newNotices);
      }
    }

    async function handleCreateTenmentInfo(tenement_type: string) {
      const queryData = handlePutDataWithQuery(searchParams);
      switch (tenement_type) {
        case "出租": {
          const newRentData =
            queryData.tenement_id === ""
              ? rentData
              : { ...rentData, tenement_id: queryData.tenement_id };
          await startCreateTenement("rent", newRentData);
          break;
        }
        case "出售": {
          const newSellData =
            queryData.tenement_id === ""
              ? sellData
              : { ...sellData, tenement_id: queryData.tenement_id };
          await startCreateTenement("sell", newSellData);
          break;
        }
        case "開發追蹤": {
          const newDevelopData =
            queryData.tenement_id === ""
              ? developerData
              : { ...developerData, tenement_id: queryData.tenement_id };
          await startCreateTenement("develop", newDevelopData);
          break;
        }
        case "行銷追蹤": {
          const newMarketData =
            queryData.tenement_id === ""
              ? marketData
              : { ...marketData, tenement_id: queryData.tenement_id };
          await startCreateTenement("market", newMarketData);
          break;
        }
        default:
          break;
      }
    }

    await handleCreateTenmentInfo(tenement_type);

    alert("儲存成功");
  };
  const handleReset = () => {
    setFormData({
      tenement_address: "1234",
      tenement_product_type: "套房",
      tenement_type: "出租",
      tenement_face: "海景",
      tenement_images: [],
      tenement_status: "已成交",
      total_rating: "4",
      main_building: "3",
      affiliated_building: "2",
      public_building: "1",
      unregistered_area: "2",
      management_magnification: "1.5",
      management_fee: "3000",
      rent_price: "20000",
      deposit_price: "40000",
      tenement_floor: "7",
      tenement_host_name: "John Doe",
      tenement_host_telphone: "1234567890",
      tenement_host_phone: "0987654321",
      tenement_host_line: "john_doe",
      tenement_host_remittance_bank: "Bank of America",
      tenement_host_remittance_account: "9876543210",
      tenement_host_address: "123 Main St, City, Country",
      tenement_host_birthday: "1980-01-01",
      tenement_host_hobby: "Reading",
      tenement_host_remark: "No remarks",
      tenement_area_max: "10",
      tenement_area_min: "5",
      burget_rent_max: "20000",
      burget_rent_min: "10000",
      hopefloor_max: "5",
      hopefloor_min: "2",
      market_state: "租房",
      selling_price: "1000",
    });
    setNotices([
      {
        id: 1,
        visitDate: nowdatestring,
        record: "看房子",
        remindDate: nowdatestring,
        remind: "提醒",
      },
      {
        id: 2,
        visitDate: nowdatestring,
        record: "繳水電",
        remindDate: nowdatestring,
        remind: "繳房租",
      },
    ]);
  };

  const [tenement_type, setTenement_type] = useState("出租");

  const handletypeChange = (e: RadioChangeEvent) => {
    setFormData((prev) => ({ ...prev, tenement_type: e.target.value }));
    setTenement_type(e.target.value);
  };

  const handleChange = (
    key: keyof typeof formData,
    value: string | number | string[]
  ) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const swtitchExtraInfo = (tenement_type: string) => {
    switch (tenement_type) {
      case "出租":
        return (
          <div className="flex flex-col gap-2">
            {/* 租金 */}
            <div className="grid grid-cols-5 gap-1 text-right">
              <p className="col-span-1 pt-5 ">租金:</p>
              <InputWithErrorMessage
                value={formData.rent_price}
                onChange={(e) => handleChange("rent_price", e.target.value)}
                isError={formData.rent_price.length <= 2}
                errorMessage={"至少兩個字"}
                required
              />
            </div>
            {/* 押金 */}
            <div className="grid grid-cols-5 gap-1 text-right">
              <p className="col-span-1 pt-5 ">押金:</p>
              <InputWithErrorMessage
                value={formData.deposit_price}
                onChange={(e) => handleChange("deposit_price", e.target.value)}
                isError={formData.deposit_price.length <= 2}
                errorMessage={"至少兩個字"}
              />
            </div>
          </div>
        );

      case "出售":
        return (
          <div>
            {/* 售價 */}
            <div className="grid grid-cols-5 gap-1 ">
              <p className="col-span-1 pt-5 text-right ">售價(萬):</p>
              <InputWithErrorMessage
                value={formData.selling_price}
                onChange={(e) => handleChange("selling_price", e.target.value)}
                isError={formData.selling_price.length <= 2}
                errorMessage={"至少兩個字"}
                required
              />
            </div>
          </div>
        );
      case "開發追蹤":
        return (
          <div className="flex flex-col ">
            {/* 售價 */}
            <div className="grid grid-cols-5 gap-1 ">
              <p className="col-span-1 pt-5 text-right">售價(萬):</p>
              <InputWithErrorMessage
                value={formData.selling_price}
                onChange={(e) => handleChange("selling_price", e.target.value)}
                isError={formData.selling_price.length <= 2}
                errorMessage={"至少兩個字"}
                required
              />
            </div>
            {/* 租金 */}
            <div className="grid grid-cols-5 gap-1 ">
              <p className="col-span-1 pt-5 text-right ">租金:</p>
              <InputWithErrorMessage
                value={formData.rent_price}
                onChange={(e) => handleChange("rent_price", e.target.value)}
                isError={formData.rent_price.length <= 2}
                errorMessage={"至少兩個字"}
              />
            </div>
            {/* 押金 */}
            <div className="grid grid-cols-5 gap-1 ">
              <p className="col-span-1 pt-5 text-right ">押金:</p>
              <InputWithErrorMessage
                value={formData.deposit_price}
                onChange={(e) => handleChange("deposit_price", e.target.value)}
                isError={formData.deposit_price.length <= 2}
                errorMessage={"至少兩個字"}
              />
            </div>
          </div>
        );
      case "行銷追蹤":
        return (
          <div>
            {/* 要租要買 select  */}
            {/* 預期坪數區間 */}
            <div className="grid grid-cols-5 gap-1 mb-5 ">
              <p className="col-span-1 pt-5 text-right">預期坪數:</p>
              <div className="inline-grid items-center grid-flow-col ">
                <Input
                  value={formData.tenement_area_min}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("tenement_area_min", e.target.value)
                  }
                  className="h-8 col-span-1 mt-3"
                  placeholder="最小值"
                />
                <p className="pt-3 pl-1 ">~</p>
              </div>
              <Input
                value={formData.tenement_area_max}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("tenement_area_max", e.target.value)
                }
                className="col-span-1 mt-3"
                placeholder="最大值"
              />
            </div>
            <div className="grid grid-cols-10 gap-1 text-right">
              <p className="col-span-2 pt-1 whitespace-nowrap ">要租要買:</p>
              <Select
                defaultValue="租房"
                className="w-20 col-span-1 "
                value={formData.market_state}
                onChange={(value) => handleChange("market_state", value)}
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
                {formData.market_state === "租房" ? "租金預算" : "售價預算(萬)"}
                :
              </p>
              <div className="inline-grid items-center grid-flow-col ">
                <Input
                  value={formData.burget_rent_min}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("burget_rent_min", e.target.value)
                  }
                  className="h-8 col-span-1 mt-3"
                  placeholder="最小值"
                  required
                />
                <p className="pt-3 pl-1 ">~</p>
              </div>
              <Input
                value={formData.burget_rent_max}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("burget_rent_max", e.target.value)
                }
                className="col-span-1 mt-3"
                placeholder="最大值"
                required
              />
            </div>
            <div className="grid grid-cols-5 gap-1 text-right">
              <p className="col-span-1 pt-5 ">希望的樓層:</p>
              <div className="inline-grid items-center grid-flow-col ">
                <Input
                  value={formData.hopefloor_min}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("hopefloor_min", e.target.value)
                  }
                  className="h-8 col-span-1 mt-3"
                  placeholder="最小值"
                  required
                />
                <p className="pt-3 pl-1 ">~</p>
              </div>
              <Input
                value={formData.hopefloor_max}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("hopefloor_max", e.target.value)
                }
                className="col-span-1 mt-3"
                placeholder="最大值"
                required
              />
            </div>
          </div>
        );
      default:
        return "";
    }
  };

  return (
    <form
      className="flex flex-col items-center w-full h-full "
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <div className="flex flex-col w-full h-full max-w-screen-xl pb-12 mt-12 mb-10 bg-white shadow-2xl rounded-xl">
        <button className="flex w-12 h-20 mt-10 ml-5" onClick={handleback}>
          {"< 返回"}
        </button>
        <div className="inline-flex flex-col mb-5 ml-8">
          <p className="text-4xl font-bold whitespace-normal">
            {tenement_type}資料
          </p>
        </div>
        <p className="mb-3 ml-5 border-b-2 border-gray-300"></p>
        {isLoading ? (
          <p className="col-span-1 pt-5 ">loading...</p>
        ) : isError ? (
          <p className="col-span-1 pt-5 ">error...</p>
        ) : (
          <div className="flex flex-row ">
            <div className="flex flex-col flex-wrap w-1/2 h-full gap-3 overflow-visible pl-7 ">
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 whitespace-nowrap ">地址:</p>
                <InputWithErrorMessage
                  value={formData.tenement_address}
                  onChange={(e) =>
                    handleChange("tenement_address", e.target.value)
                  }
                  isError={formData.tenement_address.length <= 2}
                  errorMessage={"至少兩個字"}
                  required={formData.tenement_type !== "行銷追蹤"}
                />
              </div>
              {/* 房型 */}
              <div className="grid grid-cols-5 gap-1 ">
                <p className="col-span-1 text-right">產品類別:</p>
                {/* radio */}
                <Radio.Group
                  className="col-span-4"
                  value={formData.tenement_product_type}
                  onChange={(e) =>
                    handleChange("tenement_product_type", e.target.value)
                  }
                >
                  <Radio value="套房">套房</Radio>
                  <Radio value="店面">店面</Radio>
                  <Radio value="辦公室">辦公室</Radio>
                  <Radio value="其他">其他</Radio>
                </Radio.Group>
              </div>

              {/* 案件狀態 */}
              {tenement_type === "開發追蹤" || tenement_type === "行銷追蹤" ? (
                " "
              ) : (
                <div className="grid grid-cols-5 gap-1 ">
                  <p className="text-right whitespace-nowrap">物件狀態:</p>
                  <Radio.Group
                    className="col-span-4"
                    onChange={(e) =>
                      handleChange("tenement_status", e.target.value)
                    }
                    value={formData.tenement_status}
                  >
                    <Radio value="未成交">未成交</Radio>
                    <Radio value="已成交">已成交</Radio>
                    <Radio value="已成交下架">已成交下架</Radio>
                    <Radio value="過戶完成下架">過戶完成下架</Radio>
                  </Radio.Group>
                </div>
              )}
              {/* 案件型態 */}
              <div className="grid grid-cols-5 gap-1 ">
                <p className="text-right whitespace-nowrap">物件型態:</p>
                <Radio.Group
                  onChange={handletypeChange}
                  value={tenement_type}
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
                  onChange={(e) =>
                    handleChange("tenement_face", e.target.value)
                  }
                  value={formData.tenement_face}
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
              {tenement_type === "行銷追蹤" ? (
                " "
              ) : (
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">權狀坪數:</p>
                  <InputWithErrorMessage
                    value={formData.total_rating}
                    onChange={(e) =>
                      handleChange("total_rating", e.target.value)
                    }
                    isError={formData.total_rating.length <= 2}
                    errorMessage={"請輸入到小數點後二位"}
                    required
                  />
                </div>
              )}
              {/* 主建物坪數 */}
              {tenement_type === "行銷追蹤" ? (
                " "
              ) : (
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">主建物:</p>
                  <InputWithErrorMessage
                    value={formData.main_building}
                    onChange={(e) =>
                      handleChange("main_building", e.target.value)
                    }
                    isError={formData.main_building.length <= 2}
                    errorMessage={"請輸入到小數點後二位"}
                    required
                  />
                </div>
              )}
              {/* 附屬建物坪數 */}
              {tenement_type === "行銷追蹤" ? (
                " "
              ) : (
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">附屬建物:</p>
                  <InputWithErrorMessage
                    value={formData.affiliated_building}
                    onChange={(e) =>
                      handleChange("affiliated_building", e.target.value)
                    }
                    isError={formData.affiliated_building.length <= 2}
                    errorMessage={"請輸入到小數點後二位"}
                    required
                  />
                </div>
              )}
              {/* 公共設施坪數 */}
              {tenement_type === "行銷追蹤" ? (
                " "
              ) : (
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">公設面積:</p>
                  <InputWithErrorMessage
                    value={formData.public_building}
                    onChange={(e) =>
                      handleChange("public_building", e.target.value)
                    }
                    isError={formData.public_building.length <= 2}
                    errorMessage={"請輸入到小數點後二位"}
                    required
                  />
                </div>
              )}
              {tenement_type === "行銷追蹤" ? (
                " "
              ) : (
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">未登記面積:</p>
                  <InputWithErrorMessage
                    value={formData.unregistered_area}
                    onChange={(e) =>
                      handleChange("unregistered_area", e.target.value)
                    }
                    isError={formData.unregistered_area.length <= 2}
                    errorMessage={"請輸入到小數點後二位"}
                  />
                </div>
              )}
              {/* 輸入倍率 成 total rating去改變管理費*/}
              {tenement_type === "行銷追蹤" ? (
                " "
              ) : (
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">管理費倍率:</p>
                  <InputWithErrorMessage
                    value={formData.management_magnification}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(
                        "management_fee",
                        (
                          parseFloat(e.target.value) *
                          parseFloat(formData.total_rating)
                        ).toString()
                      );
                      handleChange("management_magnification", e.target.value);
                    }}
                    isError={formData.management_fee.length <= 2}
                    errorMessage={"至少兩個字"}
                  />
                </div>
              )}

              {/* 管理費 */}
              {tenement_type === "行銷追蹤" ? (
                " "
              ) : (
                <div className="grid grid-cols-5 gap-1 text-right">
                  <p className="col-span-1 pt-5 ">管理費:</p>
                  <InputWithErrorMessage
                    value={formData.management_fee}
                    onChange={(e) =>
                      handleChange("management_fee", e.target.value)
                    }
                    isError={formData.management_fee.length <= 0}
                    errorMessage={"至少一個字"}
                  />
                </div>
              )}
              {swtitchExtraInfo(tenement_type)}
              {/* 樓層 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">總樓層:</p>
                <InputWithErrorMessage
                  value={formData.tenement_floor}
                  onChange={(e) =>
                    handleChange("tenement_floor", e.target.value)
                  }
                  isError={formData.tenement_floor.length <= 0}
                  errorMessage={"至少一個字"}
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
                  fileList={formData.tenement_images}
                  setFileList={(newFilelist) =>
                    handleChange("tenement_images", newFilelist)
                  }
                />
              </div>
              <p className="mt-2 mb-3 text-3xl font-bold whitespace-normal">
                {tenement_type === "行銷追蹤" ? "買客資訊" : "屋主資訊"}
              </p>
              {/* 屋主姓名 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">姓名:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_name}
                  onChange={(e) =>
                    handleChange("tenement_host_name", e.target.value)
                  }
                  isError={formData.tenement_host_name.length <= 2}
                  errorMessage={"至少兩個字"}
                  required
                />
              </div>
              {/* 行動電話 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">行動電話:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_telphone}
                  onChange={(e) =>
                    handleChange("tenement_host_telphone", e.target.value)
                  }
                  isError={formData.tenement_host_telphone.length <= 2}
                  errorMessage={"至少兩個字"}
                  required
                />
              </div>
              {/* 電話 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">電話:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_phone}
                  onChange={(e) =>
                    handleChange("tenement_host_phone", e.target.value)
                  }
                  isError={formData.tenement_host_phone.length <= 2}
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* Line */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">Line:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_line}
                  onChange={(e) =>
                    handleChange("tenement_host_line", e.target.value)
                  }
                  isError={formData.tenement_host_line.length <= 2}
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 屋主匯款資訊 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">匯款銀行:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_remittance_bank}
                  onChange={(e) =>
                    handleChange(
                      "tenement_host_remittance_bank",
                      e.target.value
                    )
                  }
                  isError={formData.tenement_host_remittance_bank.length <= 2}
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/*  帳號 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">帳號:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_remittance_account}
                  onChange={(e) =>
                    handleChange(
                      "tenement_host_remittance_account",
                      e.target.value
                    )
                  }
                  isError={
                    formData.tenement_host_remittance_account.length <= 2
                  }
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 通訊地址 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">通訊地址:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_address}
                  onChange={(e) =>
                    handleChange("tenement_host_address", e.target.value)
                  }
                  isError={formData.tenement_host_address.length <= 2}
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 生日 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">生日:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_birthday}
                  onChange={(e) =>
                    handleChange("tenement_host_birthday", e.target.value)
                  }
                  isError={formData.tenement_host_birthday.length <= 2}
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 嗜好 */}
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-1 pt-5 ">嗜好:</p>
                <InputWithErrorMessage
                  value={formData.tenement_host_hobby}
                  onChange={(e) =>
                    handleChange("tenement_host_hobby", e.target.value)
                  }
                  isError={formData.tenement_host_hobby.length <= 2}
                  errorMessage={"至少兩個字"}
                />
              </div>
              {/* 備註 */}
              <div className="grid grid-cols-5 gap-1 mt-5 text-right">
                <p className="col-span-1 pt-5 ">備註:</p>
                {/* text area */}
                <Input.TextArea
                  className="col-span-3"
                  rows={4}
                  value={formData.tenement_host_remark}
                  onChange={(e) =>
                    handleChange("tenement_host_remark", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        )}

        <SwitchTenementType
          tenement_type={tenement_type}
          sellerData={sellerData}
          handleChangeSeller={handleChangeSeller}
          renterData={renterData}
          handleRenterChange={handleRenterChange}
        />
        <div className="flex flex-col p-5">
          <div className="inline-flex flex-row gap-5 mb-5 ">
            <p className="text-4xl font-bold whitespace-normal">提醒設定</p>

            <Button
              type="primary"
              className="mt-1 bg-blue-600"
              onClick={handleAddNotice}
            >
              新增提醒
            </Button>
          </div>
          <p className="mb-3 ml-5 border-b-2 border-gray-300"></p>
          <div className="flex flex-col gap-5">
            {notices.map((notice: any, index: number) => (
              <Notice
                key={index}
                keya={index}
                notice={notice}
                handleNoticeChange={handleNoticeChange}
                handleDeleteNotice={handleDeleteNotice}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-5 m-10 ">
          <Button className="bg-blue-600 " type="primary" htmlType="submit">
            儲存
          </Button>
          <Button type="default" onClick={() => handleReset()}>
            回復預設
          </Button>
        </div>
      </div>
    </form>
  );
}

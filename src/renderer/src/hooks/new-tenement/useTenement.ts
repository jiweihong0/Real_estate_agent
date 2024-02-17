import { useEffect, useState } from "react";
import {
  useGetSellEdit,
  usePostSellEdit,
  useGetDevelopEdit,
  usePostDevelopEdit,
  useGetRentEdit,
  usePostRentEdit,
  useGetMarketEdit,
  usePostMarketEdit,
  useDeleteTenement,
  hardDeleteTenement,
} from "../useAPI";

type ITenementBasedInfoType = {
  tenement_id: number;
  tenement_address: string;
  tenement_product_type: string;
  tenement_type: string;
  tenement_face: string;
  tenement_images: string[];
};

type ITenementMarketInfoType = ITenementBasedInfoType & {
  [key: string]: string | string[] | unknown;
  tenement_host_name: string;
  tenement_host_telphone: string;
  tenement_host_phone: string;
  tenement_host_line: string;
  tenement_host_remittance_bank: string;
  tenement_host_remittance_account: string;
  tenement_host_address: string;
  tenement_host_birthday: string;
  tenement_host_hobby: string;
  tenement_host_remark: string;
  tenement_area_max: string;
  tenement_area_min: string;
  burget_rent_max: string;
  burget_rent_min: string;
  hopefloor_max: string;
  hopefloor_min: string;
  market_state: string;
};

export function useTenementMarketInfo(tenementId: string) {
  const [marketInfo, setMarketInfo] = useState<ITenementMarketInfoType>({
    tenement_id: 1,
    tenement_address: "1234",
    tenement_product_type: "套房",
    tenement_type: "行銷追蹤",
    tenement_face: "海景",
    tenement_images: [],
    tenement_host_name: "John",
    tenement_host_telphone: "0987654321",
    tenement_host_phone: "0987654321",
    tenement_host_line: "line_id",
    tenement_host_remittance_bank: "ABC Bank",
    tenement_host_remittance_account: "1234567890",
    tenement_host_address: "台北市大安區",
    tenement_host_birthday: "1950-09-01",
    tenement_host_hobby: "打球",
    tenement_host_remark: "備註",
    tenement_area_max: "10",
    tenement_area_min: "5",
    burget_rent_max: "20000",
    burget_rent_min: "10000",
    hopefloor_max: "5",
    hopefloor_min: "2",
    market_state: "租房",
  });

  const handleChange = (
    key: keyof ITenementMarketInfoType,
    value: string | string[]
  ) => {
    setMarketInfo((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };

  const { handleSaveColumn } = usePostMarketEdit();
  const handleSave = () => {
    if (!tenementId) return;
    // marketinfo add tenement_id
    const marketinfo = {
      ...marketInfo,
      tenement_id: tenementId,
    };
    handleSaveColumn(marketinfo);
  };

  const { handleDeleteTenement } = useDeleteTenement();
  const handleDelete = (tenement_type: string, isRollback: boolean = false) => {
    if (!tenementId) return;
    !isRollback && handleDeleteTenement(tenementId, tenement_type);
    isRollback && hardDeleteTenement(tenementId, tenement_type);
    alert("刪除成功");
  };

  const { getMarketEdit, dataEdit, isError, isLoading } = useGetMarketEdit();
  useEffect(() => {
    getMarketEdit(tenementId);
  }, [tenementId]);

  const query = new URLSearchParams(window.location.search);
  const tenementTypeOnQuery = query.get("tenement_type");
  useEffect(() => {
    if (!dataEdit) return;
    setMarketInfo({
      tenement_id: Number(dataEdit.tenement_id),
      tenement_address: dataEdit.tenement_address,
      tenement_product_type: dataEdit.tenement_product_type,
      tenement_type: tenementTypeOnQuery
        ? tenementTypeOnQuery
        : dataEdit.tenement_type,
      tenement_face: dataEdit.tenement_face,
      tenement_images: dataEdit.tenement_images,
      tenement_host_name: dataEdit.tenement_host_name,
      tenement_host_telphone: dataEdit.tenement_host_telphone,
      tenement_host_phone: dataEdit.tenement_host_phone,
      tenement_host_line: dataEdit.tenement_host_line,
      tenement_host_remittance_bank: dataEdit.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        dataEdit.tenement_host_remittance_account,
      tenement_host_address: dataEdit.tenement_host_address,
      tenement_host_birthday: dataEdit.tenement_host_birthday,
      tenement_host_hobby: dataEdit.tenement_host_hobby,
      tenement_host_remark: dataEdit.tenement_host_remark,
      tenement_area_max: dataEdit.tenement_area_max,
      tenement_area_min: dataEdit.tenement_area_min,
      burget_rent_max: dataEdit.burget_rent_max,
      burget_rent_min: dataEdit.burget_rent_min,
      hopefloor_max: dataEdit.hopefloor_max,
      hopefloor_min: dataEdit.hopefloor_min,
      market_state: dataEdit.market_state,
    });
  }, [dataEdit]);

  return {
    states: {
      marketInfo,
      isLoading,
      isError,
    },
    handlers: {
      handleChange,
      handleSave,
      handleDelete,
    },
  };
}

type ITenementRentInfoType = ITenementBasedInfoType & {
  [key: string]: string | string[] | unknown;
  tenement_status: string;
  total_rating: string;
  main_building: string;
  affiliated_building: string;
  public_building: string;
  unregistered_area: string;
  management_magnification: string;
  management_fee: string;
  rent_price: string;
  deposit_price: string;
  tenement_floor: string;
  tenement_host_name: string;
  tenement_host_telphone: string;
  tenement_host_phone: string;
  tenement_host_line: string;
  tenement_host_remittance_bank: string;
  tenement_host_remittance_account: string;
  tenement_host_address: string;
  tenement_host_birthday: string;
  tenement_host_hobby: string;
  tenement_host_remark: string;

  renter_start_date: string;
  renter_end_date: string;
  renter_name: string;
  renter_id_images: string[];
  renter_phone: string;
  renter_jobtitle: string;
  renter_guarantor_name: string;
  renter_guarantor_phone: string;
  renter_remark: string;
};

export function useTenementRentInfo(tenementId: string) {
  const [rentInfo, setRentInfo] = useState<ITenementRentInfoType>({
    tenement_id: 1,
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
    renter_start_date: "2022-01-01",
    renter_end_date: "2023-01-01",
    renter_name: "Jane Doe",
    renter_id_images: [],
    renter_phone: "0987654321",
    renter_jobtitle: "Software Engineer",
    renter_guarantor_name: "John Smith",
    renter_guarantor_phone: "1234567890",
    renter_remark: "No remarks",
  });

  const handleChange = (
    key: keyof ITenementRentInfoType,
    value: string | string[]
  ) => {
    setRentInfo((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };

  const { handleSaveColumn } = usePostRentEdit();
  const handleSave = () => {
    if (!tenementId) return;
    const rentinfo = {
      ...rentInfo,
      tenement_id: Number(tenementId),
    };
    handleSaveColumn(rentinfo);
  };

  const { handleDeleteTenement } = useDeleteTenement();
  const handleDelete = (tenement_type: string, isRollback: boolean = false) => {
    if (!tenementId) return;
    !isRollback && handleDeleteTenement(tenementId, tenement_type);
    isRollback && hardDeleteTenement(tenementId, tenement_type);
    alert("刪除成功");
  };

  const { getRentEdit, dataEdit, isError, isLoading } = useGetRentEdit();

  useEffect(() => {
    getRentEdit(tenementId);
  }, [tenementId]);

  const query = new URLSearchParams(window.location.search);
  const tenementTypeOnQuery = query.get("tenement_type");
  useEffect(() => {
    if (!dataEdit) return;
    setRentInfo({
      tenement_id: dataEdit.tenement_id as number,
      tenement_address: dataEdit.tenement_address,
      tenement_product_type: dataEdit.tenement_product_type,
      tenement_type: tenementTypeOnQuery
        ? tenementTypeOnQuery
        : dataEdit.tenement_type,
      tenement_face: dataEdit.tenement_face,
      tenement_images: dataEdit.tenement_images,
      tenement_status: dataEdit.tenement_status,
      total_rating: dataEdit.total_rating,
      main_building: dataEdit.main_building,
      affiliated_building: dataEdit.affiliated_building,
      public_building: dataEdit.public_building,
      unregistered_area: dataEdit.unregistered_area,
      management_magnification: dataEdit.management_magnification,
      management_fee: dataEdit.management_fee,
      rent_price: dataEdit.rent_price,
      deposit_price: dataEdit.deposit_price,
      tenement_floor: dataEdit.tenement_floor,
      tenement_host_name: dataEdit.tenement_host_name,
      tenement_host_telphone: dataEdit.tenement_host_telphone,
      tenement_host_phone: dataEdit.tenement_host_phone,
      tenement_host_line: dataEdit.tenement_host_line,
      tenement_host_remittance_bank: dataEdit.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        dataEdit.tenement_host_remittance_account,
      tenement_host_address: dataEdit.tenement_host_address,
      tenement_host_birthday: dataEdit.tenement_host_birthday,
      tenement_host_hobby: dataEdit.tenement_host_hobby,
      tenement_host_remark: dataEdit.tenement_host_remark,
      renter_start_date: dataEdit.renter_start_date,
      renter_end_date: dataEdit.renter_end_date,
      renter_name: dataEdit.renter_name,
      renter_id_images: dataEdit.renter_id_images,
      renter_phone: dataEdit.renter_phone,
      renter_jobtitle: dataEdit.renter_jobtitle,
      renter_guarantor_name: dataEdit.renter_guarantor_name,
      renter_guarantor_phone: dataEdit.renter_guarantor_phone,
      renter_remark: dataEdit.renter_remark,
    });
  }, [dataEdit]);

  return {
    states: {
      rentInfo,
      isLoading,
      isError,
    },
    handlers: {
      handleChange,
      handleSave,
      handleDelete,
    },
  };
}

type ITenementDevelopInfoType = ITenementBasedInfoType & {
  [key: string]: string | string[] | unknown;
  total_rating: string;
  main_building: string;
  affiliated_building: string;
  public_building: string;
  unregistered_area: string;
  management_magnification: string;
  management_fee: string;
  selling_price: string;
  rent_price: string;
  deposit_price: string;
  tenement_floor: string;

  tenement_host_name: string;
  tenement_host_telphone: string;
  tenement_host_phone: string;
  tenement_host_line: string;
  tenement_host_remittance_bank: string;
  tenement_host_remittance_account: string;
  tenement_host_address: string;
  tenement_host_birthday: string;
  tenement_host_hobby: string;
  tenement_host_remark: string;
};

export function useTenementDevelopInfo(tenementId: string) {
  const [developInfo, setDevelopInfo] = useState<ITenementDevelopInfoType>({
    tenement_id: 1,
    tenement_address: "1234",
    tenement_product_type: "套房",
    tenement_type: "開發追蹤",
    tenement_face: "海景",
    tenement_images: [],
    total_rating: "4.5",
    main_building: "100",
    affiliated_building: "50",
    public_building: "30",
    unregistered_area: "20",
    management_magnification: "1.5",
    management_fee: "3000",
    selling_price: "500000",
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
  });

  const handleChange = (
    key: keyof ITenementDevelopInfoType,
    value: string | string[]
  ) => {
    setDevelopInfo((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };
  const { handleSaveColumn } = usePostDevelopEdit();

  const handleSave = () => {
    if (!tenementId) return;
    handleSaveColumn(developInfo);
  };

  const { handleDeleteTenement } = useDeleteTenement();
  const handleDelete = (tenement_type: string, isRollback: boolean = false) => {
    if (!tenementId) return;
    !isRollback && handleDeleteTenement(tenementId, tenement_type);
    isRollback && hardDeleteTenement(tenementId, tenement_type);
    alert("刪除成功");
  };
  const { getDevelopEdit, dataEdit, isError, isLoading } = useGetDevelopEdit();

  useEffect(() => {
    getDevelopEdit(tenementId);
  }, [tenementId]);
  const query = new URLSearchParams(window.location.search);
  const tenementTypeOnQuery = query.get("tenement_type");
  useEffect(() => {
    if (!dataEdit) return;
    setDevelopInfo({
      tenement_id: Number(dataEdit.tenement_id),
      tenement_address: dataEdit.tenement_address,
      tenement_product_type: dataEdit.tenement_product_type,
      tenement_type: tenementTypeOnQuery
        ? tenementTypeOnQuery
        : dataEdit.tenement_type,
      tenement_face: dataEdit.tenement_face,
      tenement_images: dataEdit.tenement_images,
      total_rating: dataEdit.total_rating,
      main_building: dataEdit.main_building,
      affiliated_building: dataEdit.affiliated_building,
      public_building: dataEdit.public_building,
      unregistered_area: dataEdit.unregistered_area,
      management_magnification: dataEdit.management_magnification,
      management_fee: dataEdit.management_fee,
      selling_price: dataEdit.selling_price,
      rent_price: dataEdit.rent_price,
      deposit_price: dataEdit.deposit_price,
      tenement_floor: dataEdit.tenement_floor,
      tenement_host_name: dataEdit.tenement_host_name,
      tenement_host_telphone: dataEdit.tenement_host_telphone,
      tenement_host_phone: dataEdit.tenement_host_phone,
      tenement_host_line: dataEdit.tenement_host_line,
      tenement_host_remittance_bank: dataEdit.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        dataEdit.tenement_host_remittance_account,
      tenement_host_address: dataEdit.tenement_host_address,
      tenement_host_birthday: dataEdit.tenement_host_birthday,
      tenement_host_hobby: dataEdit.tenement_host_hobby,
      tenement_host_remark: dataEdit.tenement_host_remark,
    });
  }, [dataEdit]);
  return {
    states: {
      developInfo,
      isLoading,
      isError,
    },
    handlers: {
      handleChange,
      handleSave,
      handleDelete,
    },
  };
}

type ITenementSellInfoType = ITenementBasedInfoType & {
  [key: string]: string | string[] | unknown;
  tenement_status: string;

  total_rating: string;
  main_building: string;
  affiliated_building: string;
  public_building: string;
  unregistered_area: string;
  management_magnification: string;
  management_fee: string;
  selling_price: string;
  tenement_floor: string;

  tenement_host_name: string;
  tenement_host_telphone: string;
  tenement_host_phone: string;
  tenement_host_line: string;
  tenement_host_remittance_bank: string;
  tenement_host_remittance_account: string;
  tenement_host_address: string;
  tenement_host_birthday: string;
  tenement_host_hobby: string;
  tenement_host_remark: string;
  tenement_images: string[];

  buyer_order_date: string;
  buyer_handout_date: string;
  buyer_name: string;
  buyer_id_images: string[];
  buyer_phone: string;
  buyer_jobtitle: string;
  buyer_remark: string;
};

export function useTenementSellInfo(tenementId: string) {
  const [sellInfo, setSellInfo] = useState<ITenementSellInfoType>({
    tenement_id: 1,
    tenement_address: "aaaaa",
    tenement_product_type: "套房",
    tenement_type: "出售",

    tenement_face: "海景",
    tenement_images: [],
    tenement_status: "已成交",
    total_rating: "4.5",
    main_building: "100",
    affiliated_building: "50",
    public_building: "30",
    unregistered_area: "20",
    management_magnification: "1.5",
    management_fee: "3000",
    selling_price: "500000",
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

    buyer_order_date: "2022-01-01",
    buyer_handout_date: "2022-02-01",
    buyer_name: "Jane Doe",
    buyer_id_images: [],
    buyer_phone: "0987654321",
    buyer_jobtitle: "Software Engineer",
    buyer_remark: "No remarks",
  });

  const handleChange = (
    key: keyof ITenementSellInfoType,
    value: string | string[]
  ) => {
    setSellInfo((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };

  const { handleSaveColumn } = usePostSellEdit();

  const handleSave = () => {
    if (!tenementId) return;
    // sellinfo add tenement_id
    handleSaveColumn(sellInfo);
    alert("儲存成功");
  };

  const { handleDeleteTenement } = useDeleteTenement();
  const handleDelete = (tenement_type: string, isRollback: boolean = false) => {
    if (!tenementId) return;
    !isRollback && handleDeleteTenement(tenementId, tenement_type);
    isRollback && hardDeleteTenement(tenementId, tenement_type);
    alert("刪除成功");
  };

  const { getSellEdit, dataEdit, isError, isLoading } = useGetSellEdit();

  useEffect(() => {
    getSellEdit(tenementId);
  }, [tenementId]);

  const query = new URLSearchParams(window.location.search);
  const tenementTypeOnQuery = query.get("tenement_type");
  useEffect(() => {
    if (!dataEdit) return;
    setSellInfo({
      tenement_id: Number(dataEdit.tenement_id),
      tenement_address: dataEdit.tenement_address,
      tenement_product_type: dataEdit.tenement_product_type,
      tenement_type: tenementTypeOnQuery
        ? tenementTypeOnQuery
        : dataEdit.tenement_type,
      tenement_face: dataEdit.tenement_face,
      tenement_images: dataEdit.tenement_images,
      tenement_status: dataEdit.tenement_status,
      total_rating: dataEdit.total_rating,
      main_building: dataEdit.main_building,
      affiliated_building: dataEdit.affiliated_building,
      public_building: dataEdit.public_building,
      unregistered_area: dataEdit.unregistered_area,
      management_magnification: dataEdit.management_magnification,
      management_fee: dataEdit.management_fee,
      selling_price: dataEdit.selling_price,
      tenement_floor: dataEdit.tenement_floor,
      tenement_host_name: dataEdit.tenement_host_name,
      tenement_host_telphone: dataEdit.tenement_host_telphone,
      tenement_host_phone: dataEdit.tenement_host_phone,
      tenement_host_line: dataEdit.tenement_host_line,
      tenement_host_remittance_bank: dataEdit.tenement_host_remittance_bank,
      tenement_host_remittance_account:
        dataEdit.tenement_host_remittance_account,
      tenement_host_address: dataEdit.tenement_host_address,
      tenement_host_birthday: dataEdit.tenement_host_birthday,
      tenement_host_hobby: dataEdit.tenement_host_hobby,
      tenement_host_remark: dataEdit.tenement_host_remark,
      buyer_order_date: dataEdit.buyer_order_date,
      buyer_handout_date: dataEdit.buyer_handout_date,
      buyer_name: dataEdit.buyer_name,
      buyer_id_images: dataEdit.buyer_id_images,
      buyer_phone: dataEdit.buyer_phone,
      buyer_jobtitle: dataEdit.buyer_jobtitle,
      buyer_remark: dataEdit.buyer_remark,
    });
  }, [dataEdit]);
  return {
    states: {
      sellInfo,
      isLoading,
      isError,
    },
    handlers: {
      handleChange,
      handleSave,
      handleDelete,
    },
  };
}

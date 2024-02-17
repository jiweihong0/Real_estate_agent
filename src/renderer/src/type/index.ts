export type Collection = {
  collection_name: string;
  tenement_address: string;
  price: string;
  collection_type: string;
  collection_id: number;
};

export type FormData = {
  tenement_address: string;
  collection_id: string;
  collection_name: string;
  collection_type: string;
  price: string;
  payment: string;
  collection_remark: string;
  collection_date: string;
  remittance_bank: string;
  remittance_account: string;
  cus_remittance_bank: string;
  cus_remittance_account: string;
  collection_complete: string;
  notices?: NoticeData[];
};

export type NoticeData = {
  id: number;
  visitDate: string;
  record: string;
  remindDate: string;
  remind: string;
  isNew?: boolean;
};

export type User = {
  user_name: string;
  user_email: string;
  status: string;
  user_id?: string;
  user_password?: string;
  isadmin?: string;
};

export type Calender = {
  day: number;
  events: {
    content: string;
    id: string;
    class: string;
  }[];
};

export type TenementList = {
  tenement_id: number;
  tenement_address: string;
  tenement_face: string;
  tenement_status: string;
  tenement_type: string;
  tenement_product_type: string;
  management_fee_bottom: number;
  management_floor_bottom: number;
  rent?: number;
  selling_price?: number;
  Total_rating?: number;
  inside_rating?: number;
  public_building?: number;
  tenement_floor?: number;
};

export type TenementSellList = {
  tenement_id: number;
  tenement_address: string;
  tenement_face: string;
  tenement_status: string;
  tenement_type: string;
  tenement_product_type: string;
  management_fee_bottom: number;
  management_floor_bottom?: number;
  rent?: number;
  selling_price?: number;
  Total_rating?: number;
  inside_rating?: number;
  public_building?: number;
  tenement_floor?: number;
};

export type TenementSell = {
  tenement_id?: number;
  tenement_address: string;
  tenement_face: string;

  tenement_product_type: string;
  tenement_type: string;
  tenement_images: string[];

  rent_price?: string;
  selling_price: string;
  buget_price?: string;
  total_rating: string;
  public_building: string;
  tenement_floor: string;
  notices?: NoticeData[];
  tenement_status: string;

  main_building: string;
  affiliated_building: string;

  unregistered_area: string;
  management_magnification: string;
  management_fee: string;

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

  buyer_order_date: string;
  buyer_handout_date: string;
  buyer_name: string;
  buyer_id_images: string[];
  buyer_phone: string;
  buyer_jobtitle: string;
  buyer_remark: string;
};

export type TenementDevelop = {
  tenement_id?: number;
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
  tenement_address: string;
  tenement_product_type: string;
  tenement_type: string;
  tenement_face: string;
  tenement_images: string[];
};

export type TenementRent = {
  tenement_id?: number;
  tenement_address: string;
  tenement_product_type: string;
  tenement_type: string;
  tenement_face: string;
  tenement_images: string[];
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

export type TenementMarket = {
  tenement_id?: string;
  tenement_address: string;
  tenement_product_type: string;
  tenement_type: string;
  tenement_face: string;
  tenement_images: string[];
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

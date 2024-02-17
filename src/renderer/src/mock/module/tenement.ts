import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/tenements",
    // 這裡會有query string 要在utf-8編碼下才能正確解析 例如: /api/tenements?tenement_status=已成交
    // tenement_address: string;
    // tenement_product_type: "辦公室" | "店面" | "套房" |"其他";
    // tenement_status: "已成交" | "未成交" | "已退租下架" | "過戶完成下架";
    // tenement_face: "海景" | "中庭" | "三多路" .....
    // tenement_type: "出售" | "出租" | "開發追蹤" | "行銷追蹤";
    // floor_min: number;
    // floor_max: number;
    // rent_price_min: number;
    // rent_price_max: number;
    // selling_price_min: number;
    // selling_price_max: number;

    method: "get",
    response: {
      message: "Successfully update the media",
      data: [
        {
          tenement_address: 54321,
          tenement_face: "海景",
          tenement_status: "未成交",
          tenement_type: "出售",
          tenement_product_type: "辦公室",
          management_fee_bottom: 100,
          management_floor_bottom: 7,
        },
        {
          tenement_address: 54322,
          tenement_face: "中庭",
          tenement_status: "已成交",
          tenement_type: "出租",
          tenement_product_type: "店面",
          management_fee_bottom: 120,
          management_floor_bottom: 11,
        },
        {
          tenement_address: 54323,
          tenement_face: "三多路",
          tenement_status: "已退租下架",
          tenement_type: "開發追蹤",
          tenement_product_type: "套房",
          management_fee_bottom: 150,
          management_floor_bottom: 3,
        },
        {
          tenement_address: 54323,
          tenement_face: "三多路",
          tenement_status: "過戶完成下架",
          tenement_type: "行銷追蹤",
          tenement_product_type: "套房",
          management_fee_bottom: 150,
          management_floor_bottom: 3,
        },
      ],
    },
  },

  {
    url: "/api/tenements/rent",
    // 這裡會有query string 要在utf-8編碼下才能正確解析 例如: /api/tenements?tenement_status=已成交
    // tenement_address: string;
    // tenement_product_type: "辦公室" | "店面" | "套房" |"其他";
    // tenement_status: "已成交" | "未成交" | "已退租下架" | "過戶完成下架";
    // tenement_face: "海景" | "中庭" | "三多路" .....
    // floor_min: number;
    // floor_max: number;
    // selling_price_min: number;
    // selling_price_max: number;
    // management_fee_min: number;
    // management_fee_max: number;
    // inside_rating_min: number;
    // inside_rating_max: number;
    // public_building_min: number;
    // public_building_max: number;
    // total_rating_min: number;
    // total_rating_max: number;

    method: "get",
    response: {
      message: "Successfully update the media",
      data: [
        {
          tenement_address: 54321,
          tenement_face: "海景",
          tenement_status: "未成交",
          tenement_type: "出售",
          tenement_product_type: "辦公室",
          management_fee_bottom: 100,
          management_floor_bottom: 7,
          rent: 100,
          Total_rating: 100,
          inside_rating: 100,
          public_building: 100,
          tenement_floor: 100,
        },
        {
          tenement_address: 54322,
          tenement_face: "中庭",
          tenement_status: "已成交",
          tenement_type: "出租",
          tenement_product_type: "店面",
          management_fee_bottom: 120,
          management_floor_bottom: 11,
          rent: 120,
          Total_rating: 120,
          inside_rating: 120,
          public_building: 120,
          tenement_floor: 120,
        },
        {
          tenement_address: 54323,
          tenement_face: "三多路",
          tenement_status: "已退租下架",
          tenement_type: "開發追蹤",
          tenement_product_type: "套房",
          management_fee_bottom: 150,
          management_floor_bottom: 3,
          rent: 150,
          Total_rating: 150,
          inside_rating: 150,
          public_building: 150,
          tenement_floor: 150,
        },
        {
          tenement_address: 54323,
          tenement_face: "三多路",
          tenement_status: "過戶完成下架",
          tenement_type: "行銷追蹤",
          tenement_product_type: "套房",
          management_fee_bottom: 150,
          management_floor_bottom: 3,
          rent: 150,
          Total_rating: 150,
          inside_rating: 150,
          public_building: 150,
          tenement_floor: 150,
        },
      ],
    },
  },
  {
    url: "/api/tenements/sell",
    // 這裡會有query string 要在utf-8編碼下才能正確解析 例如: /api/tenements?tenement_status=已成交
    // tenement_address: string;
    // tenement_product_type: "辦公室" | "店面" | "套房" |"其他";
    // tenement_status: "已成交" | "未成交" | "已退租下架" | "過戶完成下架";
    // tenement_face: "海景" | "中庭" | "三多路" .....
    // floor_min: number;
    // floor_max: number;
    // rent_price_min: number;
    // rent_price_max: number;
    // management_fee_min: number;
    // management_fee_max: number;
    // inside_rating_min: number;
    // inside_rating_max: number;
    // public_building_min: number;
    // public_building_max: number;
    // total_rating_min: number;
    // total_rating_max: number;

    method: "get",
    response: {
      message: "Successfully update the media",
      data: [
        {
          tenement_address: 54321,
          tenement_face: "海景",
          tenement_status: "未成交",
          tenement_type: "出售",
          tenement_product_type: "辦公室",
          management_fee_bottom: 100,
          management_floor_bottom: 7,
          selling_price: 100,
          Total_rating: 100,
          inside_rating: 100,
          public_building: 100,
          tenement_floor: 100,
        },
        {
          tenement_address: 54322,
          tenement_face: "中庭",
          tenement_status: "已成交",
          tenement_type: "出租",
          tenement_product_type: "店面",
          management_fee_bottom: 120,
          management_floor_bottom: 11,
          selling_price: 120,
          Total_rating: 120,
          inside_rating: 120,
          public_building: 120,
          tenement_floor: 120,
        },
        {
          tenement_address: 54323,
          tenement_face: "三多路",
          tenement_status: "已退租下架",
          tenement_type: "開發追蹤",
          tenement_product_type: "套房",
          management_fee_bottom: 150,
          management_floor_bottom: 3,
          selling_price: 150,
          Total_rating: 150,
          inside_rating: 150,
          public_building: 150,
          tenement_floor: 150,
        },
        {
          tenement_address: 54323,
          tenement_face: "三多路",
          tenement_status: "過戶完成下架",
          tenement_type: "行銷追蹤",
          tenement_product_type: "套房",
          management_fee_bottom: 150,
          management_floor_bottom: 3,
          selling_price: 150,
          Total_rating: 150,
          inside_rating: 150,
          public_building: 150,
          tenement_floor: 150,
        },
      ],
    },
  },

  {
    url: "/api/tenement/edit/sell/:id",
    method: "get",
    response: {
      message: "Successfully update the media",
      data: {
        tenement_address: "success",
        tenement_product_type: "套房",
        tenement_type: "出售",
        tenement_status: "未成交",
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

        buyer_order_date: "2022-01-01",
        buyer_handout_date: "2022-02-01",
        buyer_name: "Jane Doe",
        buyer_id_images: [],
        buyer_phone: "0987654321",
        buyer_jobtitle: "Software Engineer",
        buyer_remark: "No remarks",
      },
    },
  },
  {
    url: "/api/tenement/edit/sell/:id",
    /*
    tenement_address: "success",
        tenement_product_type: "套房",
        tenement_type: "出售",
        tenement_status: "未成交",
        tenement_face: "海景",
        tenement_images: [
          
        ],
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

        buyer_order_date: "2022-01-01",
        buyer_handout_date: "2022-02-01",
        buyer_name: "Jane Doe",
        buyer_id_images: [],
        buyer_phone: "0987654321",
        buyer_jobtitle: "Software Engineer",
        buyer_remark: "No remarks",
    */
    method: "post",
    response: {
      message: "Successfully update the media",
    },
  },
  {
    url: "/api/tenement/add/sell",
    /*
    tenement_address: "success",
        tenement_product_type: "套房",
        tenement_type: "出售",
        tenement_status: "未成交",
        tenement_face: "海景",
        tenement_images: [
          
        ],
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

        buyer_order_date: "2022-01-01",
        buyer_handout_date: "2022-02-01",
        buyer_name: "Jane Doe",
        buyer_id_images: [],
        buyer_phone: "0987654321",
        buyer_jobtitle: "Software Engineer",
        buyer_remark: "No remarks",
    */
    method: "post",
    response: {
      message: "Successfully add the media",
    },
  },
  {
    url: "/api/tenement/delete/sell/:id",
    method: "DELETE",
    response: {
      message: "Successfully delete the media",
    },
  },

  {
    url: "/api/tenement/edit/rent/:id",
    method: "get",
    response: {
      message: "Successfully update the media",
      data: {
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
      },
    },
  },
  {
    url: "/api/tenement/edit/rent/:id",
    /*
     tenement_address: "1234",
        tenement_product_type: "套房",
        tenement_type: "出租",
        tenement_face: "海景",
        tenement_images: [
          
        ],
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
        */
    method: "post",
    response: {
      message: "Successfully update the media",
    },
  },
  {
    url: "/api/tenement/add/rent",
    /*
     tenement_address: "1234",
        tenement_product_type: "套房",
        tenement_type: "出租",
        tenement_face: "海景",
        tenement_images: [
          
        ],
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
        */
    method: "post",
    response: {
      message: "Successfully add the media",
    },
  },
  {
    url: "/api/tenement/delete/rent/:id",
    method: "DELETE",
    response: {
      message: "Successfully delete the media",
    },
  },

  {
    url: "/api/tenement/edit/develop/:id",
    method: "get",
    response: {
      message: "Successfully update the media",
      data: {
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
      },
    },
  },

  {
    url: "/api/tenement/edit/develop/:id",
    /* tenement_address: "1234",
        tenement_product_type: "套房",
        tenement_type: "開發追蹤",
        tenement_face: "海景",
        tenement_images: [
          
        ],
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
        tenement_host_remark: "No remarks",*/
    method: "post",
    response: {
      message: "Successfully update the media",
    },
  },
  {
    url: "/api/tenement/add/develop",
    /* tenement_address: "1234",
        tenement_product_type: "套房",
        tenement_type: "開發追蹤",
        tenement_face: "海景",
        tenement_images: [
          
        ],
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
        tenement_host_remark: "No remarks",*/
    method: "post",
    response: {
      message: "Successfully add the media",
    },
  },
  {
    url: "/api/tenement/delete/develop/:id",
    method: "DELETE",
    response: {
      message: "Successfully delete the media",
    },
  },

  {
    url: "/api/tenement/edit/market/:id",
    method: "get",
    response: {
      message: "Successfully update the media",
      data: {
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
      },
    },
  },
  {
    url: "/api/tenement/edit/market/:id",
    /*   tenement_address: "1234",
        tenement_product_type: "套房",
        tenement_type: "行銷追蹤",
        tenement_face: "海景",
        tenement_images: [
          
        ],
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
        market_state: "租房",*/
    method: "post",
    response: {
      message: "Successfully update the media",
    },
  },
  {
    url: "/api/tenement/add/market",
    /*   tenement_address: "1234",
        tenement_product_type: "套房",
        tenement_type: "行銷追蹤",
        tenement_face: "海景",
        tenement_images: [
          
        ],
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
        market_state: "租房",*/
    method: "post",
    response: {
      message: "Successfully save the media",
    },
  },
  {
    url: "/api/tenement/delete/market/:id",
    method: "DELETE",
    response: {
      message: "Successfully delete the media",
    },
  },
] as MockMethod[];

import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/collection/1",
    method: "get",
    response: {
      message: "Successfully get the media",
      data: {
        tenement_address: "51734",
        collection_name: "水電空調費",
        collection_type: "代收",
        price: "100",
        payment: "現金",
        remittance_bank: "中國信託",
        remittance_account: "123456789",
        cus_remittance_bank: "土地銀行",
        cus_remittance_account: "987654321",
        collection_remark: "10樓以下",
        collection_date: "2023-01-01",
        collection_complete: "是",
        notices: [
          {
            id: "1",
            visitDate: "2023-01-01",
            record: "看房子",
            remindDate: "2023-02-01",
            remind: "提醒",
          },
        ],
      },
    },
  },
  {
    url: "/api/collection/2",
    method: "get",
    response: {
      message: "Successfully get the media",
      data: {
        tenement_address: "51734",
        collection_name: "管理費",
        collection_type: "代付",
        price: "100",
        payment: "匯款",
        collection_remark: "10樓以下",
        collection_date: "2023-01-01",
        remittance_bank: "中國信託",
        remittance_account: "123456789",
        cus_remittance_bank: "土地銀行",
        cus_remittance_account: "987654321",
        collection_complete: "是",
        notices: [
          {
            id: "1",
            visitDate: "2023-01-01",
            record: "看房子",
            remindDate: "2023-02-01",
            remind: "提醒",
          },
          {
            id: "2",
            visitDate: "2023-01-01",
            record: "繳水電",
            remindDate: "2023-02-01",
            remind: "繳房租",
          },
          {
            id: "3",
            visitDate: "2023-01-01",
            record: "繳水電",
            remindDate: "2023-02-01",
            remind: "繳房租",
          },
        ],
      },
    },
  },
  {
    url: "/api/collection/3",
    method: "get",
    response: {
      message: "Successfully get the media",
      data: {
        tenement_address: "51734",
        collection_name: "第四台",
        collection_type: "代收",
        price: "100",
        payment: "匯款",
        collection_remark: "10樓以下",
        collection_date: "2023-01-01",
        remittance_bank: "中國信託",
        remittance_account: "123456789",
        cus_remittance_bank: "土地銀行",
        cus_remittance_account: "987654321",
        collection_complete: "是",
        notices: [
          {
            id: "5",
            visitDate: "2023-01-01",
            record: "看房子",
            remindDate: "2023-02-01",
            remind: "提醒",
          },
          {
            id: "6",
            visitDate: "2023-01-01",
            record: "繳水電",
            remindDate: "2023-02-01",
            remind: "繳房租",
          },
          {
            id: "7",
            visitDate: "2023-01-01",
            record: "看房子",
            remindDate: "2023-02-01",
            remind: "提醒",
          },
          {
            id: "8",
            visitDate: "2023-01-01",
            record: "繳水電",
            remindDate: "2023-02-01",
            remind: "繳房租",
          },
        ],
      },
    },
  },
  {
    url: "/api/collection/4",
    method: "get",
    response: {
      message: "Successfully get the media",
      data: {
        tenement_address: "51734",
        collection_name: "其他",
        collection_type: "代付",
        price: "100",
        payment: "匯款",
        collection_remark: "10樓以下",
        collection_date: "2023-01-01",
        remittance_bank: "中國信託",
        remittance_account: "123456789",
        cus_remittance_bank: "土地銀行",
        cus_remittance_account: "987654321",
        collection_complete: "是",
        notices: [
          {
            id: "9",
            visitDate: "2023-01-01",
            record: "看房子",
            remindDate: "2023-02-01",
            remind: "提醒",
          },
          {
            id: "10",
            visitDate: "2023-01-01",
            record: "繳水電",
            remindDate: "2023-02-01",
            remind: "繳房租",
          },
        ],
      },
    },
  },
  {
    url: "/api/collection",
    method: "post",
    response: {
      message: "Successfully add the media",
      collection_id: 1,
    },
  },
  {
    url: "/api/collection/:collectionid",
    method: "put",
    response: {
      message: "Successfully update the media",
    },
  },
  {
    url: "/api/collection/notices",
    method: "post",
    response: {
      message: "Successfully add the media",
    },
  },
  {
    url: "/api/collection",
    method: "get",
    response: {
      message: "Successfully get the media",
      data: [
        {
          collection_name: "水電空調費",
          tenement_address: "1",
          collection_type: "代收",
          price: "1000",
          collection_id: 1,
        },
        {
          collection_name: "管理費",
          tenement_address: "2",
          collection_type: "代付",
          price: "2000",
          collection_id: 2,
        },
        {
          collection_name: "第四台",
          tenement_address: "3",
          collection_type: "代收",
          price: "3000",
          collection_id: 3,
        },
        {
          collection_id: 4,
          collection_name: "其他費用",
          tenement_address: "4",
          collection_type: "代付",
          price: "4000",
        },
      ],
    },
  },
  {
    url: "/api/collection/notice/:collectionid",
    method: "delete",
    response: {
      message: "Successfully delete the media",
    },
  },
  {
    url: "/api/collection/:collectionid",
    method: "delete",
    response: {
      message: "Successfully delete the media",
    },
  },
] as MockMethod[];

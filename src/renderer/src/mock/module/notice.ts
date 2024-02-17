import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/notices/:id/:type",
    method: "get",
    response: {
      message: "success",
      data: [
        {
          id: "1",
          visitDate: "2024-01-01",
          record: "紀錄事項1",
          remindDate: "2024-01-01",
          remind: "提醒事項1",
        },
        {
          id: "2",
          visitDate: "2024-01-01",
          record: "紀錄事項2",
          remindDate: "2024-01-01",
          remind: "提醒事項20",
        },
      ],
    },
  },
  {
    url: "/api/notices/:type",
    /*
     id: "",
      visitDate: today,
      record: "",
      remindDate: today,
      remind: "",
      isNew: true,
      */
    method: "post",
    response: {
      message: "notices saved",
      data: [
        {
          id: "1",
          visitDate: "2024-01-01",
          record: "紀錄事項1",
          remindDate: "2024-01-01",
          remind: "提醒事項1",
        },
      ],
    },
  },
  {
    url: "/api/notices/:type",
    method: "put",
    response: {
      message: "notices updated",
    },
  },
  {
    url: "/api/notices/:id/:type",
    method: "delete",
    response: {
      message: "notices deleted",
    },
  },
] as MockMethod[];

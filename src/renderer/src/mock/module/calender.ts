import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/calender/:year/:month",
    method: "get",
    response: {
      message: "Successfully update the media",
      data: [
        {
          day: 8,
          events: [
            {
              content: "代收付款",
              id: "1",
              class: "collection",
            },
            {
              content: "租房",
              id: "54322",
              class: "rent",
            },
          ],
        },
        {
          day: 10,
          events: [
            {
              content: "售房",
              id: "54321",
              class: "sell",
            },
            {
              content: "開發追蹤",
              id: "54323",
              class: "develop",
            },
            {
              content: "行銷追蹤",
              id: "54323",
              class: "market",
            },
          ],
        },
      ],
    },
  },
  {
    url: "/api/calender/collection/:year/:month",
    method: "get",
    response: {
      message: "Successfully update the media",
      data: [
        {
          day: 8,
          events: [
            {
              content: "代付",
              id: "2",
              class: "pay",
            },
            {
              content: "代收",
              id: "1",
              class: "prepay",
            },
          ],
        },
        {
          day: 10,
          events: [
            {
              content: "代付",
              id: "4",
              class: "pay",
            },
            {
              content: "代收",
              id: "3",
              class: "prepay",
            },
          ],
        },
      ],
    },
  },
] as MockMethod[];

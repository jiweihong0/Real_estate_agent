import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/aaa",
    method: "get",
    response: {
      message: "Successfully update the media",
      data: {
        name: "http://localhost:5173/public/default-thumb.png",
      },
    },
  },
] as MockMethod[];

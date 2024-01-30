import { useEffect, useState } from "react";
import type {
  Calender,
  Collection,
  FormData,
  NoticeData,
  User,
  TenementList,
  TenementSell,
  TenementDevelop,
  TenementRent,
  TenementMarket,
} from "../type";
import * as zod from "zod";

const APIBaseURL = process.env.VITE_API_BASE_URL;

const getFetch = (url: string, token: string) => {
  return fetch(`${APIBaseURL}/api${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const mutableFetch = <T>(
  url: string,
  method: string,
  token: string,
  body: T
) => {
  return fetch(`${APIBaseURL}/api${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
};

function basicZodSchema<T extends zod.ZodTypeAny>(
  zodSchema: T
): zod.ZodObject<{ message: zod.ZodString; data: T }> {
  return zod.object({
    message: zod.string(),
    data: zodSchema,
  });
}

export function useToken() {
  return localStorage.getItem("token") as string;
}
export function useGetCollectionList() {
  const token = useToken();
  const [datasa, setData] = useState<Collection[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getFetch("/collection", token);
        const newData = await res.json();

        const validSchema = basicZodSchema(
          zod
            .object({
              collection_name: zod.string(),
              tenement_address: zod.string(),
              collection_type: zod.string(),
              price: zod.string(),
              collection_id: zod.number(),
            })
            .array()
        );

        const validData = validSchema.parse(newData);
        setData(validData.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {
    isLoading,
    isError,
    datasa,
  };
}

export function usePostCollectionAdd() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSaveColumn = async (formDatas: FormData) => {
    setIsLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { tenement_address, collection_id, ...sendData } = formDatas;

      const res = await mutableFetch("/collection", "POST", token, {
        ...sendData,
        tenement_no: tenement_address.toString(),
      });
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }

      const data = await res.json();
      const validSchema = basicZodSchema(
        zod.object({
          collection_id: zod.number(),
        })
      );

      const validData = validSchema.parse(data);

      return validData;
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotice = async (notices: NoticeData[]) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(
        "/collection/notices",
        "POST",
        token,
        notices
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    handleSaveColumn,
    handleSaveNotice,
  };
}

export const useGetCollectionEdit = () => {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataEdit, setData] = useState<FormData>();

  const getCollectionEdit = async (id: string) => {
    try {
      const res = await getFetch(`/collection/${id}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod.object({
          tenement_address: zod.string(),
          collection_name: zod.string(),
          collection_type: zod.string(),
          price: zod.string(),
          payment: zod.string(),
          collection_remark: zod.string(),
          collection_date: zod.string(),
          remittance_bank: zod.string(),
          remittance_account: zod.string(),
          cus_remittance_bank: zod.string(),
          cus_remittance_account: zod.string(),
          collection_complete: zod.string(),
          notices: zod
            .object({
              id: zod.number(),
              visitDate: zod.string(),
              record: zod.string(),
              remindDate: zod.string(),
              remind: zod.string(),
            })
            .array(),
        })
      );

      const validData = validSchema.parse(data);

      setData({
        ...validData.data,
        collection_id: id,
      });
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    getCollectionEdit,
    dataEdit,
  };
};
export function usePostCollectionEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSaveColumn = async (formDatas: FormData) => {
    setIsLoading(true);

    try {
      const res = await mutableFetch(
        `/collection/${formDatas.collection_id}`,
        "PUT",
        token,
        {
          tenement_no: formDatas.tenement_address.toString(),
          collection_name: formDatas.collection_name,
          collection_type: formDatas.collection_type,
          price: formDatas.price,
          payment: formDatas.payment,
          collection_remark: formDatas.collection_remark,
          collection_date: formDatas.collection_date,
          remittance_bank: formDatas.remittance_bank,
          remittance_account: formDatas.remittance_account,
          cus_remittance_bank: formDatas.cus_remittance_bank,
          cus_remittance_account: formDatas.cus_remittance_account,
          collection_complete: formDatas.collection_complete,
        }
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotice = async (notices: NoticeData[]) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(
        "/collection/notices",
        "POST",
        token,
        notices
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteNoticeFetch = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(
        `/notices/${id}/collection`,
        "DELETE",
        token,
        {}
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCollectionFetch = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(`/collection/${id}`, "DELETE", token, id);
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    handleSaveColumn,
    handleSaveNotice,
    handleDeleteNoticeFetch,
    handleDeleteCollectionFetch,
  };
}

export function useGetUserList() {
  const token = useToken();
  const [dataUser, setDataUser] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getUserList = async () => {
    try {
      const res = await getFetch("/users", token);
      const newData = await res.json();

      const validSchema = basicZodSchema(
        zod
          .object({
            user_id: zod.string(),
            user_name: zod.string(),
            user_email: zod.string(),
            status: zod.string(),
          })
          .array()
      );

      const validData = validSchema.parse(newData);

      setDataUser(validData.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserList();
  }, []);

  return {
    isLoading,
    isError,
    dataUser,
  };
}

export function usePostUserAdd() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSaveUser = async (formDatas: User) => {
    setIsLoading(true);

    try {
      const res = await mutableFetch("/user", "POST", token, formDatas);
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    handleSaveUser,
  };
}

export function usePostUserEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSaveUser = async (formDatas: User) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(
        `/user/${formDatas.user_id}`,
        "PUT",
        token,
        formDatas
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteUserFetch = async (user_id: string) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(
        `/user/${user_id}`,
        "DELETE",
        token,
        user_id
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    handleSaveUser,
    handleDeleteUserFetch,
  };
}

export function useGetUserEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataEdit, setData] = useState<User>();

  const getUserEdit = async (user_id: string) => {
    try {
      const res = await getFetch(`/user/${user_id}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod.object({
          user_name: zod.string(),
          user_email: zod.string(),
          status: zod.string(),
          user_password: zod.string(),
          user_id: zod.string(),
          isadmin: zod.string(),
        })
      );

      const validData = validSchema.parse(data);

      setData(validData.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    getUserEdit,
    dataEdit,
  };
}

export function usePostCalender() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dataCalender, setDataCalender] = useState<Calender[]>([]);

  const handleGetCalender = async (formDatas: {
    year: number;
    month: number;
  }) => {
    setIsLoading(true);
    try {
      const res = await getFetch(
        `/calender/${formDatas.year}/${formDatas.month}`,
        token
      );
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod
          .object({
            day: zod.number(),
            events: zod
              .object({
                content: zod.string(),
                id: zod.string(),
                class: zod.string(),
              })
              .array(),
          })
          .array()
      );

      const validData = validSchema.parse(data);

      setDataCalender(validData.data);
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    handleGetCalender,
    dataCalender,
  };
}

export function usePostCalenderCollection() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dataCalender, setDataCalender] = useState<Calender[]>([]);

  const handleGetCalender = async (formDatas: {
    year: number;
    month: number;
  }) => {
    setIsLoading(true);
    try {
      const res = await getFetch(
        `/calender/collection/${formDatas.year}/${formDatas.month}`,
        token
      );
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod
          .object({
            day: zod.number(),
            events: zod
              .object({
                content: zod.string(),
                id: zod.string(),
                class: zod.string(),
              })
              .array(),
          })
          .array()
      );

      const validData = validSchema.parse(data);

      setDataCalender(validData.data);
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    handleGetCalender,
    dataCalender,
  };
}

export function useDeleteNotice() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleDeleteNoticeApi = async (id: number, type: string) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(
        `/notices/${id}/${type}`,
        "DELETE",
        token,
        id
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    handleDeleteNoticeApi,
  };
}

export function useGetTenementList() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataTenement, setDataTenement] = useState<TenementList[]>([]);

  const handleGetTenement = async (
    query: { [s: string]: string } | ArrayLike<string> | undefined
  ) => {
    setIsLoading(true);
    // drop undefined
    const querys = Object.fromEntries(
      Object.entries(query || {}).filter(([, value]) => value !== undefined)
    );
    const queryString = Object.keys(querys)
      .map((key) => `${key}=${querys[key]}`)
      .join("&");
    try {
      const res = await getFetch(`/tenement?${queryString}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod
          .object({
            tenement_id: zod.number(),
            tenement_address: zod.string(),
            tenement_face: zod.string(),
            tenement_status: zod.string(),
            tenement_type: zod.string(),
            tenement_product_type: zod.string(),
            management_fee_bottom: zod.number(),
            management_floor_bottom: zod.number(),
          })
          .array()
      );
      const validData = validSchema.parse(data);

      setDataTenement(validData.data);
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    dataTenement,
    handleGetTenement,
  };
}

export function useGetTenementListSell() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataTenement, setDataTenement] = useState<TenementList[]>([]);

  const handleGetTenement = async (
    query: { [s: string]: string } | ArrayLike<string> | undefined
  ) => {
    setIsLoading(true);
    // drop undefined
    const querys = Object.fromEntries(
      Object.entries(query || {}).filter(([, value]) => value !== undefined)
    );
    const queryString = Object.keys(querys)
      .map((key) => `${key}=${querys[key]}`)
      .join("&");
    try {
      const res = await getFetch(`/tenement/sell?${queryString}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod
          .object({
            tenement_id: zod.number(),
            tenement_address: zod.string(),
            tenement_face: zod.string(),
            tenement_status: zod.string(),
            tenement_type: zod.string(),
            tenement_product_type: zod.string(),
            management_fee_bottom: zod.number(),
            management_floor_bottom: zod.number(),
            selling_price: zod.number(),
            Total_rating: zod.number(),
            inside_rating: zod.number(),
            public_building: zod.number(),
            tenement_floor: zod.number(),
          })
          .array()
      );
      const validData = validSchema.parse(data);

      setDataTenement(validData.data);
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    dataTenement,
    handleGetTenement,
  };
}

export function useGetTenementListRent() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataTenement, setDataTenement] = useState<TenementList[]>([]);

  const handleGetTenement = async (
    query: { [s: string]: string } | ArrayLike<string> | undefined
  ) => {
    setIsLoading(true);
    // drop undefined
    const querys = Object.fromEntries(
      Object.entries(query || {}).filter(([, value]) => value !== undefined)
    );
    const queryString = Object.keys(querys)
      .map((key) => `${key}=${querys[key]}`)
      .join("&");
    try {
      const res = await getFetch(`/tenement/rent?${queryString}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod
          .object({
            tenement_id: zod.number(),
            tenement_address: zod.string(),
            tenement_face: zod.string(),
            tenement_status: zod.string(),
            tenement_type: zod.string(),
            tenement_product_type: zod.string(),
            management_fee_bottom: zod.number(),
            management_floor_bottom: zod.number(),
            rent: zod.number(),
            Total_rating: zod.number(),
            inside_rating: zod.number(),
            public_building: zod.number(),
            tenement_floor: zod.number(),
          })
          .array()
      );
      const validData = validSchema.parse(data);

      setDataTenement(validData.data);
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    dataTenement,
    handleGetTenement,
  };
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = async (formDatas: {
    user_email: string;
    user_password: string;
  }) => {
    setIsLoading(true);
    const res = await mutableFetch("/user/login", "POST", "", formDatas);
    const data = await res.json();
    const validSchema = basicZodSchema(
      zod.object({
        token: zod.string(),
      })
    );
    const validData = validSchema.parse(data);

    localStorage.setItem("token", validData.data.token);
    setIsLogin(true);
  };
  return {
    isLoading,
    handleLogin,
    isLogin,
  };
}

export function useGetSellEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataEdit, setData] = useState<TenementSell>();

  const getSellEdit = async (id: string) => {
    try {
      const res = await getFetch(`/tenement/edit/sell/${id}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod.object({
          tenement_id: zod.number(),
          tenement_address: zod.string(),
          tenement_product_type: zod.string(),
          tenement_type: zod.string(),
          tenement_status: zod.string(),
          tenement_face: zod.string(),
          tenement_images: zod.string().array(),
          total_rating: zod.number(),
          main_building: zod.number(),
          affiliated_building: zod.number(),
          public_building: zod.number(),
          unregistered_area: zod.number(),
          management_magnification: zod.number(),
          management_fee: zod.number(),
          selling_price: zod.number(),
          rent_price: zod.number(),
          deposit_price: zod.number(),
          tenement_floor: zod.number(),

          tenement_host_name: zod.string(),
          tenement_host_telphone: zod.string(),
          tenement_host_phone: zod.string(),
          tenement_host_line: zod.string(),
          tenement_host_remittance_bank: zod.string(),
          tenement_host_remittance_account: zod.string(),
          tenement_host_address: zod.string(),
          tenement_host_birthday: zod.string(),
          tenement_host_hobby: zod.string(),
          tenement_host_remark: zod.string(),

          buyer_order_date: zod.string(),
          buyer_handout_date: zod.string(),
          buyer_name: zod.string(),
          buyer_id_images: zod.string().array(),
          buyer_phone: zod.string(),
          buyer_jobtitle: zod.string(),
          buyer_remark: zod.string(),
        })
      );

      const validData = validSchema.parse(data);

      setData({
        ...validData.data,
        total_rating: validData.data.total_rating.toString(),
        main_building: validData.data.main_building.toString(),
        affiliated_building: validData.data.affiliated_building.toString(),
        public_building: validData.data.public_building.toString(),
        unregistered_area: validData.data.unregistered_area.toString(),
        management_magnification: validData.data.management_magnification.toString(),
        management_fee: validData.data.management_fee.toString(),
        selling_price: validData.data.selling_price.toString(),
        rent_price: validData.data.rent_price.toString(),
        tenement_floor: validData.data.tenement_floor.toString(),
      });
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    getSellEdit,
    dataEdit,
  };
}

export function usePostSellEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSaveColumn = async (formDatas: TenementSell) => {
    setIsLoading(true);

    try {
      const res = await mutableFetch(
        `/tenement/edit/sell/${formDatas.tenement_id}`,
        "POST",
        token,
        formDatas
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    handleSaveColumn,
  };
}

export function useGetDevelopEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataEdit, setData] = useState<TenementDevelop>();

  const getDevelopEdit = async (id: string) => {
    try {
      const res = await getFetch(`/tenement/edit/develop/${id}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod.object({
          tenement_id: zod.number(),
          tenement_address: zod.string(),
          tenement_product_type: zod.string(),
          tenement_type: zod.string(),
          tenement_face: zod.string(),
          tenement_images: zod.string().array(),
          total_rating: zod.string(),
          main_building: zod.string(),
          affiliated_building: zod.string(),
          public_building: zod.string(),
          unregistered_area: zod.string(),
          management_magnification: zod.string(),
          management_fee: zod.string(),
          selling_price: zod.string(),
          rent_price: zod.string(),
          deposit_price: zod.string(),
          tenement_floor: zod.string(),

          tenement_host_name: zod.string(),
          tenement_host_telphone: zod.string(),
          tenement_host_phone: zod.string(),
          tenement_host_line: zod.string(),
          tenement_host_remittance_bank: zod.string(),
          tenement_host_remittance_account: zod.string(),
          tenement_host_address: zod.string(),
          tenement_host_birthday: zod.string(),
          tenement_host_hobby: zod.string(),
          tenement_host_remark: zod.string(),
        })
      );

      const validData = validSchema.parse(data);

      setData({
        ...validData.data,
        total_rating: Number(validData.data.total_rating),
      });
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    getDevelopEdit,
    dataEdit,
  };
}

export function usePostDevelopEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSaveColumn = async (formDatas: TenementDevelop) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(
        `/tenement/edit/develop/${formDatas.tenement_id}`,
        "POST",
        token,
        formDatas
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    handleSaveColumn,
  };
}
export function useGetRentEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataEdit, setData] = useState<TenementRent>();

  const getRentEdit = async (id: string) => {
    try {
      const res = await getFetch(`/tenement/edit/rent/${id}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod.object({
          tenement_id: zod.number(),
          tenement_address: zod.string(),
          tenement_product_type: zod.string(),
          tenement_type: zod.string(),
          tenement_face: zod.string(),
          tenement_images: zod.string().array(),
          tenement_status: zod.string(),
          total_rating: zod.number(),
          main_building: zod.number(),
          affiliated_building: zod.number(),
          public_building: zod.number(),
          unregistered_area: zod.number(),
          management_magnification: zod.number(),
          management_fee: zod.number(),
          rent_price: zod.number(),
          deposit_price: zod.number(),
          tenement_floor: zod.number(),
          tenement_host_name: zod.string(),
          tenement_host_telphone: zod.string(),
          tenement_host_phone: zod.string(),
          tenement_host_line: zod.string(),
          tenement_host_remittance_bank: zod.string(),
          tenement_host_remittance_account: zod.string(),
          tenement_host_address: zod.string(),
          tenement_host_birthday: zod.string(),
          tenement_host_hobby: zod.string(),
          tenement_host_remark: zod.string(),
          renter_start_date: zod.string(),
          renter_end_date: zod.string(),
          renter_name: zod.string(),
          renter_id_images: zod.string().array(),
          renter_phone: zod.string(),
          renter_jobtitle: zod.string(),
          renter_guarantor_name: zod.string(),
          renter_guarantor_phone: zod.string(),
          renter_remark: zod.string(),
        })
      );

      const validData = validSchema.parse(data);

      setData({
        ...validData.data,
        total_rating: validData.data.total_rating.toString(),
        main_building: validData.data.main_building.toString(),
        affiliated_building: validData.data.affiliated_building.toString(),
        public_building: validData.data.public_building.toString(),
        unregistered_area: validData.data.unregistered_area.toString(),
        management_magnification:
          validData.data.management_magnification.toString(),
        management_fee: validData.data.management_fee.toString(),
        rent_price: validData.data.rent_price.toString(),
        deposit_price: validData.data.deposit_price.toString(),
        tenement_floor: validData.data.tenement_floor.toString(),
      });
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    getRentEdit,
    dataEdit,
  };
}
export function usePostRentEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSaveColumn = async (formDatas: TenementRent) => {
    setIsLoading(true);
    try {
      const res = await mutableFetch(
        `/tenement/edit/rent/${formDatas.tenement_id}`,
        "POST",
        token,
        formDatas
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    handleSaveColumn,
  };
}

export function useGetMarketEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataEdit, setData] = useState<TenementMarket>();

  const getMarketEdit = async (id: string) => {
    try {
      const res = await getFetch(`/tenement/edit/market/${id}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod.object({
          tenement_address: zod.string(),
          tenement_product_type: zod.string(),
          tenement_type: zod.string(),
          tenement_face: zod.string(),
          tenement_images: zod.string().array(),
          tenement_host_name: zod.string(),
          tenement_host_telphone: zod.string(),
          tenement_host_phone: zod.string(),
          tenement_host_line: zod.string(),
          tenement_host_remittance_bank: zod.string(),
          tenement_host_remittance_account: zod.string(),
          tenement_host_address: zod.string(),
          tenement_host_birthday: zod.string(),
          tenement_host_hobby: zod.string(),
          tenement_host_remark: zod.string(),
          tenement_area_max: zod.string(),
          tenement_area_min: zod.string(),
          burget_rent_max: zod.string(),
          burget_rent_min: zod.string(),
          hopefloor_max: zod.string(),
          hopefloor_min: zod.string(),
          market_state: zod.string(),
        })
      );

      const validData = validSchema.parse(data);

      setData(validData.data);
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    getMarketEdit,
    dataEdit,
  };
}

export function usePostMarketEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSaveColumn = async (formDatas: TenementMarket) => {
    setIsLoading(true);

    try {
      const res = await mutableFetch(
        `/tenement/edit/market/${formDatas.tenement_id}`,
        "POST",
        token,
        formDatas
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    handleSaveColumn,
  };
}

export function useGetNotice() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataNotice, setData] = useState<NoticeData[]>([]);

  const getNotice = async (id: string, type: string) => {
    try {
      const res = await getFetch(`/notices/${type}/${id}`, token);
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod
          .object({
            id: zod.number(),
            visitDate: zod.string(),
            record: zod.string(),
            remindDate: zod.string(),
            remind: zod.string(),
          })
          .array()
      );

      const validData = validSchema.parse(data);

      setData(validData.data);
    } catch (error) {
      console.error(error);
      alert("取得資料失敗");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    getNotice,
    dataNotice,
  };
}

export function usePostAddNotice() {
  const token = useToken();
  const [isDone, setIsDone] = useState(false);
  const [newNotices, setNotices] = useState<NoticeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handlePostAddNotice = async (
    type: string,
    notices: ICreateOrUpdateNotice[]
  ) => {
    setIsLoading(true);
    setIsDone(false);

    const organzedNotices = notices.map(({ collection_id, ...rest }) => {
      if (type === "collection") {
        return {
          ...rest,
          collection_id: Number(collection_id),
        };
      } else {
        return {
          ...rest,
          tenement_id: Number(collection_id),
        };
      }
    });

    try {
      const res = await mutableFetch(
        `/notices/${type}`,
        "POST",
        token,
        organzedNotices
      );
      const data = await res.json();

      const validSchema = basicZodSchema(
        zod
          .object({
            id: zod.number(),
            visitDate: zod.string(),
            record: zod.string(),
            remindDate: zod.string(),
            remind: zod.string(),
          })
          .array()
      );

      const validData = validSchema.parse(data);

      setNotices((prev) => [...prev, validData.data[0]]);
      setIsDone(true);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    isDone,
    handlePostAddNotice,
    newNotices,
  };
}

type ICreateOrUpdateNotice = Omit<NoticeData, "id" | "isNew"> & {
  collection_id?: number;
};

export function usePutNotice() {
  const token = useToken();
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handlePutNotice = async (type: string, notices: NoticeData[]) => {
    setIsLoading(true);
    setIsDone(false);

    try {
      const body = notices.map((notice) => ({
        id: notice.id,
        visitDate: notice.visitDate,
        record: notice.record,
        remindDate: notice.remindDate,
        remind: notice.remind,
        isNew: notice.isNew,
      }));

      const res = await mutableFetch(`/notices/${type}`, "PUT", token, body);
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
      setIsDone(true);
      console.log(res);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    isDone,
    handlePutNotice,
  };
}

export function usePostAddTenement() {
  const token = useToken();
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handlePostAddTenement = async (
    type: string,
    tenement: TenementSell | TenementRent | TenementMarket | TenementDevelop
  ) => {
    setIsLoading(true);
    setIsDone(false);

    try {
      const res = await mutableFetch(
        `/tenement/add/${type}`,
        "POST",
        token,
        tenement
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
      setIsDone(true);
      console.log(res);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    isDone,
    handlePostAddTenement,
  };
}

export function useDeleteTenement() {
  const token = useToken();
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleDeleteTenement = async (tenement_id: string) => {
    setIsLoading(true);
    setIsDone(false);

    try {
      const res = await mutableFetch(
        `/delete/tenement/${tenement_id}`,
        "DELETE",
        token,
        null
      );
      if (!res.ok) {
        alert("操作失敗");
        throw new Error(res.statusText);
      }
      setIsDone(true);
      console.log(res);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    isError,
    isDone,
    handleDeleteTenement,
  };
}

export function useGetUserRole(token: string) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const getUserRole = async () => {
    if (!token) return;
    const res = await getFetch(`/user/auth`, token);
    const data = await res.json();

    const validSchema = basicZodSchema(
      zod.object({
        isadmin: zod.boolean(),
      })
    );

    const validData = validSchema.parse(data);

    setIsAdmin(validData.data.isadmin);
  };
  return {
    isAdmin,
    getUserRole,
  };
}

export async function deleteFile(fileName: string) {
  const token = localStorage.getItem("token") as string;

  const res = await mutableFetch(
    `/files/delete/${fileName}`,
    "DELETE",
    token,
    null
  );

  if (!res.ok) {
    alert("操作失敗");
    throw new Error(res.statusText);
  }
}

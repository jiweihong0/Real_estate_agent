import { useEffect, useState } from "react";
import type { Calender, Collection, FormData, NoticeData, User } from "../type";

const APIBaseURL = process.env.BASE_URL;

const getFetch = (url: string, token: string) => {
  return fetch(`${APIBaseURL}/api${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const muliteFetch = <T>(
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

export function useToken() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return token;
}
export function useGetCollectionList() {
  const token = "";
  const [datasa, setData] = useState<Collection[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      if (token) return;
      try {
        const res = await getFetch("/collection/list", token);
        const newData = await res.json();
        setData(newData.data);
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
      const res = await muliteFetch("/coladd", "POST", token, formDatas);
      if (!res.ok) {
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
      const res = await muliteFetch("/coladd/notices", "POST", token, notices);
      if (!res.ok) {
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
      setData(data.data);
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
    const jsonFromData = JSON.stringify(formDatas);
    try {
      const res = await muliteFetch("/collection", "POST", token, jsonFromData);
      if (!res.ok) {
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
    const jsonNotices = JSON.stringify(notices);
    try {
      const res = await muliteFetch(
        "/collection/notices",
        "POST",
        token,
        jsonNotices
      );
      if (!res.ok) {
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

export function useGetUserList() {
  const token = "";
  const [dataUser, setDataUser] = useState<User[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getUserList = async () => {
    try {
      const res = await getFetch("/user/list", token);
      const newData = await res.json();
      setDataUser(newData.data);
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
      const res = await muliteFetch("/user/add", "POST", token, formDatas);
      if (!res.ok) {
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
      const res = await muliteFetch("/user/edit", "POST", token, formDatas);
      if (!res.ok) {
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

export function useGetUserEdit() {
  const token = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [dataEdit, setData] = useState<User>();

  const getUserEdit = async (id: string) => {
    try {
      const res = await getFetch(`/user/${id}`, token);
      const data = await res.json();

      setData(data.data);
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
      setDataCalender(data.data);
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
    handleGetCalender,
    dataCalender,
  };
}

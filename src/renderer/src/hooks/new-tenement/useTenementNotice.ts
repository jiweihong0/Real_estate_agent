import { useEffect, useState } from "react";
import {
  useGetNotice,
  usePutNotice,
  useDeleteNotice,
  handlePostAddNotice,
} from "../useAPI";

import moment from "moment";

type ITenementType = "develop" | "rent" | "sell" | "market";

type INotice = {
  id: number;
  visitDate: string;
  record: string;
  remindDate: string;
  remind: string;
};

export default function useTenementNotice(
  tenementType: ITenementType,
  tenementId: string
) {
  const nowdatestring = moment().format("YYYY-MM-DD");
  const [notices, setNotices] = useState<INotice[]>([
    {
      id: 1,
      visitDate: nowdatestring,
      record: "紀錄事項1",
      remindDate: nowdatestring,
      remind: "提醒事項1",
    },
  ]);

  const { isLoading, isError, getNotice, dataNotice } = useGetNotice();
  // const { handlePostAddNotice, newNotices } = usePostAddNotice();
  const { handlePutNotice } = usePutNotice();
  const handleSaveNoticeData = () => {
    handlePutNotice(tenementType, notices);
  };

  const handleAddNotice = async () => {
    console.log(tenementId);
    const newNotice = {
      visitDate: nowdatestring,
      record: "",
      remindDate: nowdatestring,
      remind: "",
      collection_id: Number(tenementId),
    };

    const newNoticeData = await handlePostAddNotice(tenementType, [newNotice]);

    if (newNoticeData === undefined) return;

    setNotices((prevNotices) => {
      return [...prevNotices, ...newNoticeData];
    });
  };

  useEffect(() => {
    getNotice(tenementType, tenementId);
  }, []);

  useEffect(() => {
    if (!dataNotice) return;
    setNotices(dataNotice);
  }, [dataNotice]);

  const handleNoticeChange = (index: number, key: string, value: string) => {
    setNotices((prev) =>
      prev.map((notice, i) =>
        i === index ? { ...notice, [key]: value } : notice
      )
    );
  };

  const { handleDeleteNoticeApi } = useDeleteNotice();
  const handleDeleteNotice = (index: number) => {
    handleDeleteNoticeApi(notices[index].id, tenementType);
    setNotices((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    states: {
      notices,
      isLoading,
      isError,
    },
    handlers: {
      handleNoticeChange,
      handleDeleteNotice,
      handleAddNotice,
      handleSaveNoticeData,
    },
  };
}

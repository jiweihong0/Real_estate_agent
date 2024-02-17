import { useState } from "react";
import { usePostCollectionAdd, handlePostAddNotice } from "./useAPI";
import type { FormData, NoticeData } from "../type";
import { z } from "zod";
import moment from "moment";
const useCollectionAdd = () => {
  const { handleSaveColumn } = usePostCollectionAdd();
  const nowdatestring = moment().format("YYYY-MM-DD");
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    tenement_address: "",
    collection_id: "",
    collection_name: "水電空調費",
    collection_type: "代收",
    price: "",
    payment: "現金",
    collection_remark: "",
    remittance_bank: "",
    remittance_account: "",
    cus_remittance_account: "",
    cus_remittance_bank: "",
    collection_date: nowdatestring,
    collection_complete: "是",
  });

  const handleChange = (key: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleNoticeChange = (
    index: number,
    key: keyof NoticeData,
    value: string
  ) => {
    setNotices((prevNotices) => {
      const newNotices = [...prevNotices];
      newNotices[index] = {
        ...newNotices[index],
        [key]: value,
      };
      return newNotices;
    });
  };

  const handleDeleteNotice = (index: number) => {
    setNotices((prevNotices) => {
      const newNotices = [...prevNotices];
      newNotices.splice(index, 1);
      return newNotices;
    });
  };
  // const { handlePostAddNotice } = usePostAddNotice();
  const handleSave = async () => {
    const schemaform = z.object({
      tenement_address: z.string().min(2, "地址至少兩個字"),
      collection_name: z.string(),
      collection_id: z.string(),
      collection_type: z.string(),
      price: z.string().nonempty("金額不得為空"),
      payment: z.string(),
      collection_remark: z.string(),
      remittance_bank: z.string(),
      remittance_account: z.string(),
      cus_remittance_account: z.string(),
      cus_remittance_bank: z.string(),
      collection_date: z.string(),
      collection_complete: z.string(),
    });

    const parseResult = schemaform.safeParse(formData);

    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map((error) => {
        return error.message;
      });

      alert(errorMessages.join("\n"));
      return;
    }

    const columnData = await handleSaveColumn(parseResult.data);
    if (!columnData) {
      alert("儲存失敗");
      return;
    }

    const noticeData = notices.map((notice) => {
      return {
        visitDate: notice.visitDate,
        record: notice.record,
        remindDate: notice.remindDate,
        remind: notice.remind,
        collection_id: columnData.data.collection_id,
      };
    });

    await handlePostAddNotice("collection", noticeData);
    alert("儲存成功");
  };

  const handleReset = () => {
    setFormData({
      tenement_address: "",
      collection_id: "",
      collection_name: "水電空調費",
      collection_type: "代收",
      price: "",
      payment: "現金",
      collection_remark: "",
      remittance_bank: "",
      remittance_account: "",
      cus_remittance_account: "",
      cus_remittance_bank: "",
      collection_date: nowdatestring,
      collection_complete: "是",
    });
    setNotices([]);
  };

  const handleAddNotice = () => {
    setNotices((prevNotices) => [
      ...prevNotices,
      {
        id: Math.random().toString(),
        visitDate: nowdatestring,
        record: "",
        remindDate: nowdatestring,
        remind: "",
        isNew: true,
      },
    ]);
  };

  return {
    formData,
    notices,
    handleChange,
    handleNoticeChange,
    handleSave,
    handleReset,
    handleAddNotice,
    handleDeleteNotice,
  };
};

export default useCollectionAdd;

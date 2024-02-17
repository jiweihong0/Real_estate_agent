import { useState, useEffect } from "react";
import {
  useGetCollectionEdit,
  usePostCollectionEdit,
  usePutNotice,
  useDeleteNotice,
  handlePostAddNotice,
  deleteCollectionFetchFn,
} from "./useAPI";
import type { FormData, NoticeData } from "../type";
import { useParams } from "react-router-dom";
import { z } from "zod";
import moment from "moment";

const useCollectionEdit = () => {
  const { getCollectionEdit, isError, isLoading, dataEdit } =
    useGetCollectionEdit();
  const {
    handleSaveColumn,

    handleDeleteCollectionFetch,
  } = usePostCollectionEdit();

  const { handlePutNotice } = usePutNotice();
  const { handleDeleteNoticeApi } = useDeleteNotice();

  // get param id from url
  const getparamid = useParams<{ id: string }>().id as string;

  const query = new URLSearchParams(window.location.search);
  const isRollback = query.get("rollback") || false;

  const nowdatestring = moment().format("YYYY-MM-DD");
  const { id } = useParams();
  const [notices, setNotices] = useState<NoticeData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    tenement_address: "",
    collection_id: "",
    collection_name: "",
    collection_type: "",
    price: "",
    payment: "",
    collection_remark: "",
    collection_date: nowdatestring,
    remittance_bank: "",
    remittance_account: "",
    cus_remittance_account: "",
    cus_remittance_bank: "",
    collection_complete: "",
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
    handleDeleteNoticeApi(notices[index].id, "collection");
    setNotices((prevNotices) => {
      const newNotices = [...prevNotices];
      newNotices.splice(index, 1);
      return newNotices;
    });
    if (notices[index].isNew) return;
    // handleDeleteNoticeFetch(notices[index].id);
  };
  const handleDeleteCollection = () => {
    confirm("確定要刪除嗎？");
    !isRollback && handleDeleteCollectionFetch(id || "");
    isRollback && deleteCollectionFetchFn(id || "");
    alert("刪除成功");
  };

  const handleSave = async () => {
    if (!id) return;

    const schemaform = z.object({
      tenement_address: z.string().min(2, "地址至少兩個字"),
      collection_name: z.string(),
      collection_type: z.string(),
      price: z.string().nonempty("金額不得為空"),
      payment: z.string(),
      collection_remark: z.string(),
      collection_date: z.string(),
      remittance_bank: z.string(),
      remittance_account: z.string(),
      cus_remittance_account: z.string(),
      cus_remittance_bank: z.string(),
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
    const newformdata = {
      ...parseResult.data,
      collection_id: id,
    };
    await handleSaveColumn(newformdata);
    if (notices.length > 0) {
      await handlePutNotice("collection", notices);
    }
    alert("儲存成功");
  };

  const handleReset = () => {
    setFormData({
      tenement_address: "",
      collection_id: "",
      collection_name: "水費",
      collection_type: "代收",
      price: "",
      payment: "現金",
      collection_remark: "",
      collection_date: nowdatestring,
      remittance_bank: "",
      remittance_account: "",
      cus_remittance_account: "",
      cus_remittance_bank: "",
      collection_complete: "",
    });
    setNotices([]);
  };

  const handleAddNotice = async () => {
    const newNotice = {
      visitDate: nowdatestring,
      record: "",
      remindDate: nowdatestring,
      remind: "",
      collection_id: Number(getparamid),
    };

    const newNoticeData = await handlePostAddNotice("collection", [newNotice]);

    if (newNoticeData === undefined) return;

    setNotices((prevNotices) => {
      return [...prevNotices, ...newNoticeData];
    });
  };

  const getapi = async () => {
    if (!id) return;
    await getCollectionEdit(id);
  };

  useEffect(() => {
    getapi();
  }, []);

  useEffect(() => {
    if (!dataEdit || dataEdit.notices === undefined) return;
    setFormData({
      tenement_address: dataEdit.tenement_address,
      collection_id: dataEdit.collection_id,
      collection_name: dataEdit.collection_name,
      collection_type: dataEdit.collection_type,
      price: dataEdit.price,
      payment: dataEdit.payment,
      collection_remark: dataEdit.collection_remark,
      remittance_bank: dataEdit.remittance_bank,
      remittance_account: dataEdit.remittance_account,
      collection_date: dataEdit.collection_date,
      cus_remittance_account: dataEdit.cus_remittance_account,
      cus_remittance_bank: dataEdit.cus_remittance_bank,
      collection_complete: dataEdit.collection_complete,
    });
    setNotices(dataEdit.notices);
  }, [dataEdit]);

  return {
    formData,
    notices,
    handleChange,
    handleNoticeChange,
    handleSave,
    handleReset,
    handleAddNotice,
    handleDeleteNotice,
    handleDeleteCollection,
    isLoading,
    isError,
  };
};

export default useCollectionEdit;

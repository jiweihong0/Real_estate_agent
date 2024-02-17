import { useState, useEffect } from "react";
import { useGetUserEdit, usePostUserEdit } from "./useAPI";
import type { User } from "../type";
import { z } from "zod";
import { useParams } from "react-router-dom";

const useCollectionEdit = () => {
  const { isLoading, isError, handleSaveUser, handleDeleteUserFetch } =
    usePostUserEdit();
  const { getUserEdit, dataEdit } = useGetUserEdit();
  const { user_id } = useParams();
  const query = new URLSearchParams(location.search);
  const isRollback = query.get("rollback") || false;

  const [formData, setFormData] = useState<User>({
    user_name: "",
    user_email: "",
    status: "是",
    user_password: "",
    isadmin: "否",
  });
  const handleChange = (key: keyof User, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (!user_id) return;
    const newformdata = {
      ...formData,
      user_id: user_id,
    };

    const schema = z.object({
      user_name: z.string().min(2, "請輸入至少兩個以上的名字"),
      user_email: z.string().email("不符合Email格式"),
      status: z.string(),
      user_password: z.string(),
      isadmin: z.string(),
      user_id: z.string(),
    });

    const parseResult = schema.safeParse(newformdata);

    if (!parseResult.success) {
      const errorMessages = parseResult.error.errors.map((error) => {
        return error.message;
      });

      alert(errorMessages.join("\n"));
      return;
    }

    await handleSaveUser(parseResult.data);
    alert("儲存成功");
  };
  const handleDeleteUser = () => {
    confirm("確定要刪除嗎？");
    !isRollback && handleDeleteUserFetch(user_id || "");
    isRollback && handleHardDeleteUser(user_id || "");
  };

  const handleReset = () => {
    setFormData({
      user_name: "",
      user_email: "",
      status: "是",
      user_password: "",
      isadmin: "否",
    });
  };

  const getapi = async () => {
    if (!user_id) return;
    await getUserEdit(user_id);
  };

  useEffect(() => {
    getapi();
  }, []);
  useEffect(() => {
    if (!dataEdit) return;
    setFormData({
      user_name: dataEdit.user_name,
      user_email: dataEdit.user_email,
      status: dataEdit.status,
      user_password: dataEdit.user_password,
      isadmin: dataEdit.isadmin,
    });
  }, [dataEdit]);

  return {
    formData,
    handleChange,
    handleSave,
    handleReset,
    isLoading,
    isError,
    handleDeleteUser,
  };
};

export default useCollectionEdit;

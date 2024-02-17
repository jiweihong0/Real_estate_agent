import { useState } from "react";
import { usePostUserAdd } from "./useAPI";
import type { User } from "../type";
import { z } from "zod";

const useCollectionAdd = () => {
  const { isLoading, isError, handleSaveUser } = usePostUserAdd();

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
    const schema = z.object({
      user_name: z.string().min(2, "請輸入至少兩個以上的名字"),
      user_email: z.string().email("不符合Email格式"),
      status: z.string(),
      user_password: z.string().min(6, "請輸入至少六個以上的密碼"),
      isadmin: z.string(),
    });

    const parseResult = schema.safeParse(formData);

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

  const handleReset = () => {
    setFormData({
      user_name: "",
      user_email: "",
      status: "是",
      user_password: "",
      isadmin: "否",
    });
  };

  return {
    formData,
    handleChange,
    handleSave,
    handleReset,
    isLoading,
    isError,
  };
};

export default useCollectionAdd;

import { Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import InputWithErrorMessage from "./InputWithErrorMessage";

export default function CollectionMange(props: any) {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const isRollback = query.get("rollback") || false;

  const isAdd = window.location.pathname === "/user";
  const handleback = () => {
    navigate(isRollback ? "/rollback/users" : "/users");
  };

  const {
    formData,
    handleChange,
    handleSave,
    handleReset,
    isLoading,
    isError,
    handleDeleteUser,
  } = props;

  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex flex-col w-4/5 h-full p-10 mt-12 bg-white shadow-2xl mx-36 rounded-xl ">
        <button className="flex w-12 h-20" onClick={handleback}>
          {"< 返回"}
        </button>
        {isLoading ? (
          <p className="col-span-1 ">loading...</p>
        ) : isError ? (
          <p className="col-span-1 ">error...</p>
        ) : (
          <div>
            <div className="inline-flex flex-col ml-5">
              <p className="text-4xl whitespace-normal">
                {isRollback && "復原"}使用者管理
              </p>
            </div>
            <div className="flex flex-col flex-wrap w-2/3 h-full gap-10 p-10 overflow-visible ">
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-2 pt-5">使用者名稱:</p>
                <InputWithErrorMessage
                  value={formData.user_name}
                  onChange={(e) => handleChange("user_name", e.target.value)}
                  isError={formData.user_name.length <= 2}
                  errorMessage={"至少兩個字"}
                />
              </div>
              <div className="grid grid-cols-5 gap-1 text-right ">
                <p className="col-span-2 pt-5">使用者信箱:</p>
                <InputWithErrorMessage
                  value={formData.user_email}
                  onChange={(e) => handleChange("user_email", e.target.value)}
                  isError={!formData.user_email.includes("@")}
                  errorMessage={"email格式錯誤"}
                />
              </div>
              <div className="grid grid-cols-5 gap-1 text-right ">
                <p className="col-span-2 pt-5 whitespace-nowrap">使用者密碼:</p>

                <InputWithErrorMessage
                  value={formData.user_password}
                  onChange={(e) =>
                    handleChange("user_password", e.target.value)
                  }
                  isError={false}
                  errorMessage={"至少六個字"}
                />
              </div>
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-2 ">是否啟用:</p>
                <Select
                  defaultValue="是"
                  className="col-span-1"
                  options={[{ value: "是" }, { value: "否" }]}
                  onChange={(value) => handleChange("status", value)}
                  value={formData.status}
                />
              </div>
              <div className="grid grid-cols-5 gap-1 text-right">
                <p className="col-span-2 ">管理員權限:</p>
                <Select
                  defaultValue="是"
                  className="col-span-1"
                  options={[{ value: "是" }, { value: "否" }]}
                  onChange={(value) => handleChange("isadmin", value)}
                  value={formData.isadmin}
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-5 m-10 ">
          <Button className="bg-blue-600 " type="primary" onClick={handleSave}>
            {isRollback ? "復原" : "儲存"}
          </Button>
          <Button type="default" onClick={() => handleReset()}>
            回復預設
          </Button>
          {isAdd ? null : (
            <Button danger onClick={() => handleDeleteUser()}>
              {isRollback ? "永久刪除" : "刪除"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

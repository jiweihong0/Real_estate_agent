import UserMange from "../../components/UserMange";
import useUserEdit from "../../hooks/useUserEdit";
export const UserEdit = () => {
  const {
    formData,
    handleChange,
    handleSave,
    handleReset,
    handleDeleteUser,
    isLoading,
    isError,
  } = useUserEdit();
  return (
    <UserMange
      formData={formData}
      handleChange={handleChange}
      handleSave={handleSave}
      handleReset={handleReset}
      isLoading={isLoading}
      isError={isError}
      handleDeleteUser={handleDeleteUser}
    />
  );
};
export default UserEdit;

import UserMange from "../../components/UserMange";
import useUserAdd from "../../hooks/useUserAdd";

export const Collection = () => {
  const { formData, handleChange, handleSave, handleReset } = useUserAdd();
  return (
    <UserMange
      formData={formData}
      handleChange={handleChange}
      handleSave={handleSave}
      handleReset={handleReset}
    />
  );
};
export default Collection;

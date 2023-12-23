import CollectionMange from "../../components/CollectionMange";
import useCollectionEdit from "../../hooks/useCollectionEdit";
export const Collection = () => {
  const {
    formData,
    notices,
    handleChange,
    handleNoticeChange,
    handleSave,
    handleReset,
    handleAddNotice,
    handleDeleteNotice,
    isLoading,
    isError,
  } = useCollectionEdit();
  return (
    <CollectionMange
      formData={formData}
      notices={notices}
      handleChange={handleChange}
      handleNoticeChange={handleNoticeChange}
      handleSave={handleSave}
      handleReset={handleReset}
      handleAddNotice={handleAddNotice}
      handleDeleteNotice={handleDeleteNotice}
      isLoading={isLoading}
      isError={isError}
    />
  );
};
export default Collection;

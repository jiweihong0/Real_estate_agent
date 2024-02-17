import { Routes, Route } from "react-router-dom";
import CollectionList from "../pages/collection/CollectionList";
import CollectionAdd from "../pages/collection/CollectionAdd";
import CollectionEdit from "../pages/collection/CollectionEdit";
import UserAdd from "../pages/user/UserAdd";
import UserEdit from "../pages/user/UserEdit";
import UserList from "../pages/user/UserList";
import Layout from "../components/Layout";
import CalenderList from "../pages/calender/CalenderList";
import TenementAdd from "../pages/tenement/TenementAdd";
import TenementList from "../pages/tenement/TenementList";
import Login from "../pages/Login";
import CalenderList_collection from "../pages/calender/CalenderList_collection";
import TenementListRent from "../pages/tenement/TenementListRent";
import TenementListSell from "../pages/tenement/TenementListSell";
import NewMarket from "../pages/new-tenement/market";
import NewRent from "../pages/new-tenement/rent";
import NewSell from "../pages/new-tenement/sell";
import NewDevelop from "../pages/new-tenement/develop";
import BackupCollectionsPage from "../pages/rollback/collections";
import BackupUsersPage from "../pages/rollback/users";
import BackupTenementsPage from "../pages/rollback/tenements";

const App = () => {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="collections" element={<CollectionList />} />
          <Route path="Collection/:id" element={<CollectionEdit />} />
          <Route path="Collection/Add" element={<CollectionAdd />} />

          {/* Admin Route */}
          <Route path="users" element={<UserList />} />
          <Route path="User/:user_id" element={<UserEdit />} />
          <Route path="user" element={<UserAdd />} />

          <Route path="Calenderlist" element={<CalenderList />} />
          <Route
            path="Calenderlist_collection"
            element={<CalenderList_collection />}
          />
          <Route path="Tenement/Add" element={<TenementAdd />} />
          <Route path="Tenements" element={<TenementList />} />
          <Route path="Tenements/Rent" element={<TenementListRent />} />
          <Route path="Tenements/Sell" element={<TenementListSell />} />

          {/* New Refactor Route */}
          <Route path="/tenement/:id/market" element={<NewMarket />} />
          <Route path="/tenement/:id/rent" element={<NewRent />} />
          <Route path="/tenement/:id/sell" element={<NewSell />} />
          <Route path="/tenement/:id/develop" element={<NewDevelop />} />

          <Route path="/rollback/tenements" element={<BackupTenementsPage />} />
          <Route
            path="/rollback/collections"
            element={<BackupCollectionsPage />}
          />
          <Route path="/rollback/users" element={<BackupUsersPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

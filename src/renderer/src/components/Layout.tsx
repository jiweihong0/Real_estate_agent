import Menu from "./Menu";
import { Outlet } from "react-router-dom";
export default function Layout() {
  // const route = useNavigate();
  // TODO 這裡要改成登入頁面
  // useEffect(() => {
  //   route("/collections");
  // }, []);

  return (
    <div className="flex w-full h-full min-h-screen bg-gray-100 ">
      <Menu />
      <Outlet />
    </div>
  );
}

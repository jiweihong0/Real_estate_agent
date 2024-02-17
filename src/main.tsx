import ReactDOM from "react-dom/client";
import Routes from "./routes";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/Authprovider";
import { ConfigProvider } from "antd";
import zh_TW from "antd/locale/zh_TW";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={zh_TW}>
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  </ConfigProvider>
);
sadas;

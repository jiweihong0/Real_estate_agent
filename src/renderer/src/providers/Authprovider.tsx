import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { useGetUserRole, useToken } from "../hooks/useAPI";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextType {
  isLogin: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  // isAdmin
  const token = useToken();
  const userRoleHook = useGetUserRole(token);
  const naviate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      userRoleHook.getUserRole().catch((err) => {
        alert("登入逾時，請重新登入");
        console.error(err);
        localStorage.removeItem("token");
        naviate("/login");
      });
    }
  }, [token, location.pathname]);

  return (
    <AuthContext.Provider value={{ isLogin, isAdmin: userRoleHook.isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth 必須在 AuthProvider 內使用");
  }
  return authContextValue;
};

export { AuthProvider, useAuth };

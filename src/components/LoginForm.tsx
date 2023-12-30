import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useLogin } from "../hooks/useAPI";
import { useAuth } from "../providers/Authprovider";

const App: React.FC = () => {
  const { handleLogin, isLogin, isError } = useLogin();
  const { setIsLogin } = useAuth();
  const onFinish = (values: { user_email: string; user_password: string }) => {
    handleLogin(values);

    if (!isLogin) {
      setIsLogin(true);
      window.location.href = "/";
    }
    if (isError) {
      alert("帳號或密碼錯誤");
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="user_email"
        rules={[{ required: true, message: "請輸入您的信箱" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="信箱"
        />
      </Form.Item>
      <Form.Item
        name="user_password"
        rules={[{ required: true, message: "請輸入您的密碼" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="user_password"
          placeholder="密碼"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-600 login-form-button"
        >
          登入
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;

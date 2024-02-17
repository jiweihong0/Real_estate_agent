import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-400 ">
      <div className="inline-flex flex-col items-center justify-center gap-10 p-20 shadow-2xl bg-slate-100 rounded-xl">
        <h1 className="text-4xl font-extrabold">使用者登入</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

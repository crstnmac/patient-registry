import "./index.less"
import LoginForm from "@/features/login/Login"

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <div className="login-logo">
            <span className="logo-text">Admin</span>
          </div>
          <LoginForm />
        </div>
        <div className="login-left">
          <div className="login-left-title"> Admin</div>
        </div>
      </div>
    </div>
  )
}

export default Login

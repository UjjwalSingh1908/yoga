import { BrowserRouter, Route } from "react-router-dom";
import { ConfigProvider } from 'antd';
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import "./App.css"
import Dashboard from "./components/user/Dashboard";

function App() {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#3EB489',
        fontFamily: 'Montserrat',
      },
    }}
  >
    <BrowserRouter>

    <Route exact  path="/" component={SignUp} />
    <Route exact  path="/login" component={Login} />
    <Route exact  path="/dashboard" component={Dashboard} />
 
    </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;

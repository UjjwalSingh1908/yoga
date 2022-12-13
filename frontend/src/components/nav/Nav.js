import { Menu } from 'antd';
import {Link} from 'react-router-dom';




const Nav = (props) => {

  return (
    <div >
        <Menu mode="horizontal" defaultSelectedKeys={[props.active]} >
    <Menu.Item key="register" >
        <Link to="/">
      Register
      </Link>
    </Menu.Item>
    <Menu.Item key="login" >
    <Link to="/login">
      Login
      </Link>
    </Menu.Item>
    
    </Menu>
    </div>
    
  )
}

export default Nav
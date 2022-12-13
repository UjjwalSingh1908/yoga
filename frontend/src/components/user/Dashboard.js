
import React, { useEffect, useState } from 'react'
import { Menu, Button } from 'antd';
import {Link} from 'react-router-dom';
import "./Dashboard.css"
import apiService from '../../apiService';


const Dashboard = () => {

  const [pay, setPay] = useState(null);

  useEffect(() => {

    let p = localStorage.getItem("payment");
    setPay(p);
    localStorage.setItem("payment", "true");
    setPay(true);

  },[])

  const payFees = () => {

    const data = {
      Date : (new Date()).toLocaleDateString('en-GB'),
      Pay : 500,

    }
    apiService.payfees(data).then(res=> {
      console.log(res)
    }).catch(err=>{
      console.log(err);
    })
    

  }

  return (
    <>
    <Menu mode="horizontal" defaultSelectedKeys={["Home"]} >
    <Menu.Item key="Home" >
        <Link to="/dashboard">
      Home
      </Link>
    </Menu.Item>
    <Menu.Item key="logout" >
    <Link to="/login">
      Logout
      </Link>
    </Menu.Item>
    
    </Menu>
    <div className='home-container' >
    <div className='home-h1' > Welcome User </div>
<div className='home-h2' >
  Payment Status :
  { pay == true ? <span> You have successfully paid for this month's yoga sessions. </span> : <div><p> You have not completed your payment. 
</p>
<Button onClick={payFees} type="primary" className='pay-btn' >
      Pay
    </Button>
</div> }
</div>
    </div>


    </>
  )
}

export default Dashboard
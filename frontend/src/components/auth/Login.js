import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import "./Auth.css"
import Nav from '../nav/Nav';
import apiService from '../../apiService';

import { Redirect } from 'react-router-dom';
import { Alert} from 'antd';




const Login = () => {
  const [redir, setRedir] = useState(null);
  const [msg, setMsg] = useState(false);
  const [er, setEr] = useState("");
  

    const SubmitHandler = (values) => {

        const data = {
          Email: values.email,
          Password: values.password,
          Date: (new Date()).toLocaleDateString('en-GB'),
        }
        apiService.login(data).then(res=>{
          console.log(res);
          localStorage.setItem("payment", res.data.Payment);
       
         setRedir("dashboard")
         
        }).catch(err=> {
           setMsg(true);
         setEr("Error Occurred !");
        })

   
    }

    if (redir) {
      return <Redirect to={`/${redir}`} />;
    }
  return (
    <>
    { msg? <Alert type="error" message={er} closable banner /> : null }
    <Nav active="login"/>
    <div className='form-container'>
    <div className='form-h1' >Welcome Back!</div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={SubmitHandler}
   
    >

<Form.Item name="email" label="Email" rules={[ {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },]}>
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />


      </Form.Item>

      <Form.Item wrapperCol={{offset:8, span: 8 }} >
        <Button style={{width: "100%"}} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>


        </Form>
        </div>
        {/* {success ? <Alerts alertdata={alertdata} /> : ""} */}
        
    </>

  )
}

export default Login
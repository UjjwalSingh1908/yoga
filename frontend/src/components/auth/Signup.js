import React, { useState } from 'react'
import { Button, Form, Input,InputNumber, Select } from 'antd';
import "./Auth.css"
import { Link } from 'react-router-dom';
import Nav from '../nav/Nav';
import apiService from '../../apiService';
import { Redirect } from 'react-router-dom';
import { Alert} from 'antd';

const Signup = () => {

  const [redir, setRedir] = useState(null);
  const [msg, setMsg] = useState(false);
  const [er, setEr] = useState("");
  

    const SubmitHandler = (values) => {
        
        const data = {
          Name : values.name,
          Age : values.age,
          Email : values.email,
          Contact: values.contact,
          Password : values.password,
          Batch : values.batch,
          Date : (new Date()).toLocaleDateString('en-GB'),
        }
        console.log(data);
        apiService.register(data).then(res => {
          console.log(res);
          localStorage.setItem("payment", res.data.Payment);
          setRedir("dashboard")
        }).catch(err=> {
          console.log(err);
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
    <Nav active="register" />
    <div className='form-container'>
    <div className='form-h1' >Register For our Yoga Classes</div>
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
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter your Name!',
          },
        ]}
      >
         <Input />
      </Form.Item>

        <Form.Item
        label="Age"
        name="age"
        rules={[
          {
            required: true,
            message: 'Please enter your Age!',
          },
        ]}
      >
         <InputNumber style={{width:"100%"}} min={18} max={65} />
      </Form.Item>

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
        label="Contact"
        name="contact"

        rules={[
            {
                type: 'number',
                 message: 'Please enter a number!',
               },
          {
            required: true,
            message: 'Please enter your contact!',
          },
          
        ]}
      > 
      <InputNumber style={{width:"100%"}}/>
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
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="batch" label="Batch"  rules={[
          {
            required: true,
            message: 'Please select your batch!',
          },
        ]}>
          <Select required placeholder='Select your batch' defaultActiveFirstOption='false'>
            <Select.Option value="6-7 am">6-7 am</Select.Option>
            <Select.Option value="7-8 am">7-8 am</Select.Option>
            <Select.Option value="8-9 am">8-9 am</Select.Option>
            <Select.Option value="5-6 pm">5-6 pm</Select.Option>

          </Select>
        </Form.Item>


        <Form.Item wrapperCol={{offset:8, span: 8 }} >
        <Button style={{width: "100%"}} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{offset:8, span: 8 }} >
        Allready Registered? <Link to="/login">Login!</Link> 
      </Form.Item>
     
      </Form>
    
    </div>
    </>
  )
}

export default Signup
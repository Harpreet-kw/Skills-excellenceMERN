import React from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { registerAction } from "../../redux/actions";
import './index.less'
import { useHistory } from "react-router-dom";
import { apiUrl } from "../../utils/settings";

function LoginRegisterForm({ value }) {
  const history = useHistory()

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const dispatch = useDispatch();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    if (value === "login") {
      // await dispatch(loginAction(values));
      let payload = {
        email: values?.email,
        password: values?.password
      }

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${apiUrl}/user/login`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
      };
      
      axios.request(config)
      .then((response) => {
        console.log("response ***************", response.data);
        sessionStorage.setItem('usersData', JSON.stringify(response.data))
        openNotificationWithIcon('success', "Logged in, Welcome Back!")
        history.push('/')
        dispatch({
          type: "LOGIN_USER",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("error ************",error);
      });

    } else if (value === "signup") {
      await dispatch(registerAction(values));
    }
  };

  return (
    <div className="text-left">
      <Form
        hideRequiredMark
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {value !== "login" && (
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter username" />
          </Form.Item>
        )}

        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
            },
          ]}
        >
          <Input size="large"  placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Enter password" />
        </Form.Item>

        {value !== "login" && (
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        )}
        <Form.Item>
          <Button type="primary" size="large" className="float-right" htmlType="submit">
            {value === "login" ? "Login" : "Register"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginRegisterForm;

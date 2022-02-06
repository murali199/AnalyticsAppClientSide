import { React, Component } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import { login, loadCurrentUser } from '../services/UtilService';
import { ACCESS_TOKEN } from '../assets/constants';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default class SignIn extends Component {

  handleLogin() {
    //loadCurrentUser();
    this.props.history.push("/dashboard");
  }

  render() {  
    const onFinish = (values) => {
      console.log("Success:", values);
      const loginRequest = Object.assign({}, values);
              login(loginRequest)
              .then(response => {
                  localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                  //this.props.onLogin();
                  this.handleLogin();
              })
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    
    return (
        <Layout className="layout-default layout-signin">
          <Content className="signin">
            <Row gutter={[24, 0]} >
            <Col
                className="sign-img"
                style={{ padding: 12, marginTop: 50 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 0 }}
                md={{ span: 12 }}
                style={{ padding: 12, marginTop: 150 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your details to sign in
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Username or Email"
                    name="usernameOrEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username or email!",
                      },
                    ]}
                  >
                    <Input placeholder="Username / Email" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input type="password" placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                  <p className="font-semibold text-muted">
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="text-dark font-bold">
                      Sign Up
                    </Link>
                  </p>
                </Form>
              </Col>
              
            </Row>
          </Content>
        </Layout>
    );
  }
}

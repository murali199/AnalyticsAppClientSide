import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar
} from "antd";
import { getAllUsers, getCurrentUser } from '../services/UtilService';
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import React, { useState, useEffect } from 'react';
const originData = [];
  const currentUser = getCurrentUser()
  .then(response => 
    originData.push({
      id: response.id,
      name: response.name,
      username: response.username,
      email: response.email,
    })
  );

function Profile() {
    const [data, setData] = useState(originData[0]);
    /* window.localStorage.setItem('currentUser', data);
    alert(window.localStorage.getItem('currentUser')) */
    console.log("ju"+data) 
    
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{data.name}</h4>
                  <p>@{data.username}</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Inspired Quotes</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link"></Button>}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              <ul>
                <li>If you can’t decide, the answer is no. </li>
                <li>If two equally difficult paths, choose the one more painful in the short term. </li>
                <li>Pain avoidance is creating an illusion of equality.</li>
              </ul>
              
              
              
            </p>
            <hr className="my-25" />
            <Descriptions title="Profile Details">
              <Descriptions.Item label="Full Name" span={3}>
              {data.name}
              </Descriptions.Item>
              <Descriptions.Item label="User ID" span={3}>
              {data.username}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
              {data.email}
              </Descriptions.Item>

            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">

        </Col>
      </Row>

    </>
  );
}

export default Profile;

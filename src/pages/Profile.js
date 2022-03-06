import {
  Row,
  Col,
  Card,
  Button,
  Descriptions,
  Avatar,
  Input
} from "antd";
import { getCurrentUser } from '../services/UtilService';
import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/mylogo.png";
import React, { useState, useEffect, Component } from 'react';
import { render } from "@testing-library/react";
import store from "./../components/reduxStore"
import {connect} from 'react-redux';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: ''
      },
      originData: {
        id: '',
        name: '',
        username: '',
        email: '',
      },
      quotes: 'If you can’t decide, the answer is no.#If two equally difficult paths, choose the one more painful in the short term.#Pain avoidance is creating an illusion of equality.'
    }
  }


  addNewQuote = () => {
    let newQuote = document.getElementById("newQuote").value;    
    let quoteStr = this.props.todo.quote != "" ? this.props.todo.quote : this.state.quotes;
    var newQuoteStr = quoteStr + '#' + newQuote;    
    this.setState({ quotes: newQuoteStr }, async () => {
      await store.dispatch({ type: "valueChanged", newQuoteStr: newQuoteStr })
      this.quotesGenerate();
    });
  }

  componentDidMount() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          originData: {
            id: response.id,
            name: response.name,
            username: response.username,
            email: response.email,
          }
        })
      }).catch(e => {
        this.setState({
          originData: {
            id: '',
            name: '',
            username: '',
            email: '',
          }
        })
        console.log(e)
      })

    this.quotesGenerate();

  }

  quotesGenerate = () => {
    let quoteStr = this.props.todo.quote != "" ? this.props.todo.quote : this.state.quotes;
    let quotes = [];
    quotes = quoteStr.split('#');
    var ul = document.getElementById("quotesUL");
    ul.innerHTML = "";
    quotes.map(quote => {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(quote));
      ul.appendChild(li);
    })
    document.getElementById("newQuote").value = "";
  }

  render() {

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
                    <h4 className="font-semibold m-0">{this.state.originData.name}</h4>
                    <p>@{this.state.originData.username}</p>
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
                
    <Button type="primary" size="large" style={{float: 'right'}} onClick={() => this.props.history.push("/users")} ghost >View All Users</Button>
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
              {/* <p className="text-dark"> */}
              <ul id="quotesUL">
                {/* <li>If you can’t decide, the answer is no. </li>
                  <li>If two equally difficult paths, choose the one more painful in the short term. </li>
                  <li>Pain avoidance is creating an illusion of equality.</li> */}
              </ul>
              <ul>
                <li>
                  <Input id="newQuote" placeholder="Add more quote" style={{ width: "80%" }} />
                  <Button type="primary" onClick={this.addNewQuote}>Submit</Button>
                </li>
              </ul>
              {/* </p> */}

              <hr className="my-25" />
              <Descriptions title="Profile Details">
                <Descriptions.Item label="Full Name" span={3}>
                  {this.state.originData.name}
                </Descriptions.Item>
                <Descriptions.Item label="User ID" span={3}>
                  {this.state.originData.username}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>
                  {this.state.originData.email}
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
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
      math: state.math,
      todo: state.todo
  };
};

export default connect(mapStateToProps, null)(Profile);

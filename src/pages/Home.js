import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Timeline,
} from "antd";
import { SwapOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

function Home(props) {
  const { Title, Text } = Typography;
  const [reverse, setReverse] = useState(false);
  const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  const myArr = [];
  
  //useEffect(() => {
    let quoteStr = props.todo.quote != "" ? props.todo.quote : 'If you can’t decide, the answer is no.#If two equally difficult paths, choose the one more painful in the short term.#Pain avoidance is creating an illusion of equality.';
    quoteStr = quoteStr[0] == "#" ? quoteStr.substring(1) :  quoteStr;
    let quotes = [];
    quotes = quoteStr.split('#');
    console.log(quotes)
    var ul = document.getElementById("quotesTimeline");
    //ul.innerHTML = "";

    quotes.map(quote => {
      /* var li = document.createElement("li");
      li.className = 'ant-timeline-item';
      var div1 = document.createElement("div");
      div1.className = 'ant-timeline-item-tail';
      var div2 = document.createElement("div");
      div2.className = 'ant-timeline-item-head ant-timeline-item-head-blue';
      var div3 = document.createElement("div");
      div3.className = 'ant-timeline-item-content';
      var h5 = document.createElement("h5");
      h5.className = 'ant-typography';
      h5.appendChild(document.createTextNode(quote));
      div3.appendChild(h5);
      li.appendChild(div1);
      li.appendChild(div2);
      li.appendChild(div3);
      ul.appendChild(li); */

      myArr.push({title: quote})
    })
    console.log(myArr)
    //console.log(timelineList)
  //})

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    width: 800,
    height: 400,
    autoFit: false,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  let chart;

  // Export Image
  const downloadImage = () => {
    chart?.downloadImage();
  };

  // Get chart base64 string
  const toDataURL = () => {
    console.log(chart?.toDataURL());
    alert(chart?.toDataURL());
  };

  


  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Sample Chart</Title>
                  <Paragraph className="lastweek">
                    Yearly values
                  </Paragraph>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Button type="primary" ghost onClick={downloadImage} style={{ marginRight: 15 }}>Export Image</Button>
                    <Button type="primary" ghost onClick={toDataURL}>Get base64</Button>
                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive" style={{ padding: "50px 0 0 130px" }}>
                <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
            <div className="project-ant" style={{paddingLeft: 0, paddingBottom: 20}}>
                <div>
                  <Title level={5}>Inspired Quotes</Title>
                  <Paragraph className="lastweek">
                    Made with Redux
                  </Paragraph>
                </div>
                <Button type="primary" onClick={() => setReverse(!reverse)} style={{ marginTop:'-20px', padding: '0 10px 0 15px' }}>
                    {<SwapOutlined rotate={90} style={{ fontSize: '20px' }}/>}
                  </Button>
              </div>

              <div className="timeline-box">
               
                <Timeline
                  pending="Waiting for you to enter more quotes..."
                  className="timelinelist"
                  reverse={reverse}
                  id = "quotesTimeline"
                >
                  {myArr.map((t, index) => (
                    <Timeline.Item  key={index}>
                      <Title level={5}>{t.title}</Title>
                      {/* <Text>{t.time}</Text> */}
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button type="primary" style={{float: 'right'}} onClick={() => props.history.push("/profile")} ghost >To Enter your quotes</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}


const mapStateToProps = (state) => {
  return {
      user: state.user,
      math: state.math,
      todo: state.todo
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch({
                type: "SET_NAME",
                payload: name
            });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//export default Home;
//export default connect(null,null)(Home);

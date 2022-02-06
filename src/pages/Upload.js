import {
  Row,
  Col,
  Card,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd";

import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import pencil from "../assets/images/pencil.svg";

const { Title } = Typography;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function Uploads() {
  return (
    <>
      <div className="tabled">
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Upload your data"
            >
              <Row gutter={[24, 0]}>
             <Col xs="8" xl={8}></Col>
             <Col xs="8" xl={8}>
             <div className="uploadfile pb-15 shadow-none">
                <Upload {...formProps} >
                  <Button
                    type="dashed"
                    className="ant-full-box"
                    icon={<ToTopOutlined />}
                    style={{"height": "200px"}}
                  >
                    Click to Uploadd
                  </Button>
                </Upload>
              </div>
             </Col>
             <Col xs="8" xl={8}></Col>
             </Row>
            </Card>
      </div>
    </>
  );
}

export default Uploads;

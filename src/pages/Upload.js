import {
  Row,
  Col,
  Card,
  Upload,
  message,
  Button,
  Table,
  Avatar,
  Typography,
  Spin
} from "antd";
import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import { ToTopOutlined, UploadOutlined, CloudDownloadOutlined, EditOutlined, DeleteOutlined, FileOutlined } from "@ant-design/icons";
import base64js from "base64-js"
import { ACCESS_TOKEN, API_BASE_URL } from '../assets/constants';

const { Title } = Typography;

// table code start
const columns = [
  {
    title: "FILE NAME",
    key: "name",
    dataIndex: "name",
    width: "35%",
  },
  {
    title: "FILE SIZE",
    dataIndex: "size",
    key: "size",
    width: "15%"
  },
  {
    title: "FILE TYPE",
    key: "type",
    dataIndex: "type",
    width: "15%"
  },
  {
    title: "DOWNLOAD",
    key: "download",
    dataIndex: "download",
    width: "10%"
  },
  {
    title: "UPDATE",
    key: "update",
    dataIndex: "update",
    width: "20%"
  },
  {
    title: "DELETE",
    key: "delete",
    dataIndex: "delete",
    width: "10%"
  },
];

const data1 = [];

const formProps = {
  name: "file",
  action: API_BASE_URL+"/files/upload",
  listType: "picture",
  className: "upload-list-inline",
  headers: {
    authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
  },
  
  onChange(info, updateData) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      window.location.reload();
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const props = {
  name: 'file',  
  headers: {
    authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    
  },
  
  onChange(info, updateData) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      window.location.reload();
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      loading: true, 
      progress: 0,
      message: "",
      fileInfos: [],
      myTable: [],
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'yyy.png',
          status: 'error',
        },
      ]
    };
  }

 async componentDidMount() {
   await UploadService.getFiles().then((response) => {  
    data1.length = 0;
    response.data.map((file, index) => {
      var updateLink = API_BASE_URL+'/files/update/'+file.id
      data1.push({          
        key: file.id,
        name: (
          <>
            <Avatar.Group>
              <div className="icon-box">
              <FileOutlined />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="avatar-info">
                <Title level={5}>{file.name}</Title>
                {/* <p>michael@mail.com</p> */}
              </div>
            </Avatar.Group>{" "}
          </>
        ),
        size: (
          <>
            <div className="author-info">
              <Title level={5}>{file.size}</Title>
            </div>
          </>
        ),
        type: (
          <>
            <div className="author-info">
              <Title level={5}>{file.type}</Title>
            </div>
          </>
        ),  
        download: (
          <>
            <div className="author-info" style={{ 'text-align': 'center'}}>
              <a onClick={() => this.downloadFile(file.id)}><CloudDownloadOutlined style={{ fontSize: '25px'}}/></a>
            </div>
          </>
        ),  
        update: (
          <>
            <div className="author-info" style={{ 'text-align': 'center'}}>
              {/* <a><EditOutlined style={{ fontSize: '25px'}}/></a> */}
              <Upload {...props} action={updateLink}>
    <Button icon={<UploadOutlined />}>Click to Update</Button>
  </Upload>
              
            </div>
          </>
        ),  
        delete: (
          <>
            <div className="author-info" style={{ 'text-align': 'center'}}>
              <a  onClick={() => this.deleteFile(file.id)}><DeleteOutlined style={{ fontSize: '25px'}}/></a>
            </div>
          </>
        ),    
      })
      
      })  
      this.setState({
        fileInfos: response.data,
        fileList: response.data,
        myTable: data1,
        loading: false
      });
    })
  }   

  downloadFile = (id) => {
    UploadService.downloadFile1(id).then((response) => {
      /* this.setState({
        fileInfos: response.data,
      }); */
      console.log(response)
      const url = window.URL.createObjectURL(new Blob([base64js.toByteArray(response.data.data)], { type: response.data.type }));
      const link = document.createElement('a');
      link.download = response.data.name
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      //window.open(url, "_blank");
    });
  }

  deleteFile = (id) => {
    UploadService.deleteFile(id).then((response) => {
      console.log(response.data)
      if (response.data === 'Success') {
        message.success(`File deleted successfully`);
      } else {
        message.error(`File delete failed.`);
      }
      window.location.reload();
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      fileList,
      myTable
    } = this.state;

    var buttonEl = document.getElementById('myBtn');
    buttonEl && buttonEl.parentElement.addEventListener('click', () => alert("Hi user!"));
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);

    return (
      <div>

        <div className="tabled">
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Upload your data"
          >
            <Row gutter={[24, 0]}>

              <Col xs="5" xl={5}>
                <div className="uploadfile pb-15 shadow-none">
                  <Upload {...formProps}  maxCount={1} >
                    <Button
                      type="dashed"
                      className="ant-full-box"
                      icon={<ToTopOutlined />}
                      style={{ "height": "300px", "width": "300px" }}
                    >
                      Click or drag to upload
                    </Button>
                  </Upload>
                </div>
              </Col>
              <Col xs="18" xl={18}>
              <Spin tip="Loading..." spinning={this.state.loading}>
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={myTable}
                  pagination={true}
                  className="ant-border-space"
                  style= {{ whiteSpace : 'unset', marginTop: '10px' }}
                />                
              </div>
              </Spin>
              </Col>
            </Row>
          </Card>
        </div>

      </div>
    );
  }
}


/* import {
  Row,
  Col,
  Card,
  Upload,
  message,
  Button,
} from "antd";
import React, { Component } from "react";
import UploadService from "../services/upload-files.service";
import { ToTopOutlined, StarOutlined } from "@ant-design/icons";
import base64js from "base64-js"

const formProps = {
  name: "file",
  action: "http://localhost:8080/api/files/upload",
  listType:"picture",
  className:"upload-list-inline",
  headers: {
    authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjQ1NjI1MDA4LCJleHAiOjE2NDYyMjk4MDh9.9j_yu7vX1SCdoqTDBvp_227pLEIperQJaxU5OnAAeaMScB_-z6vOJ1q4iI8_NmS80eKoaZWGnNgqIsLp21PPtA`,
  },
  showUploadList: {
    showDownloadIcon: true,
    downloadIcon: 'download ',
    showRemoveIcon: true,
    removeIcon: <StarOutlined id="myBtn" onClick={() => console.log('custom removeIcon event')} />,
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

const abb = [
  {
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/xxx.png',
  },
  {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  },
  {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500', // custom error message to show
    url: 'http://www.baidu.com/zzz.png',
  },
];

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-2',
          name: 'yyy.png',
          status: 'error',
        },
      ]
    };
  }

  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        fileInfos: response.data,
        fileList: response.data,
      });

      response.data.map((file, index) => {
          //alert(file.name)
      })
    });
  }

  selectFile(event) {
    this.setState({
      selectedFiles: event.target.files,
    });
  }

  upload() {
    let currentFile = this.state.selectedFiles[0];

    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    UploadService.upload(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  downloadFile = (id) => {
    UploadService.downloadFile1(id).then((response) => {
      /* this.setState({
        fileInfos: response.data,
      });
      console.log(response)
      const url = window.URL.createObjectURL(new Blob([base64js.toByteArray(response.data.data)], { type: response.data.type }) );
      const link = document.createElement('a');
      link.download = response.data.name
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      //window.open(url, "_blank");
    });
  }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
      fileList
    } = this.state;

    var buttonEl = document.getElementById('myBtn');
    buttonEl && buttonEl.parentElement.addEventListener('click', () => alert("Hi user!"));

    return (
      <div>

          <div className="tabled">
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Upload your data&nbsp;&nbsp;&nbsp;(For development of Java-R)"
              >
                <Row gutter={[24, 0]}>
               <Col xs="8" xl={8}></Col>
               <Col xs="8" xl={8}>
               <div className="uploadfile pb-15 shadow-none">
                  <Upload {...formProps} fileList={fileInfos} >
                    <Button
                      type="dashed"
                      className="ant-full-box"
                      icon={<ToTopOutlined />}
                      style={{"height": "200px"}}
                    >
                      Click or drag to upload
                    </Button>
                  </Upload>
                </div>
               </Col>
               <Col xs="8" xl={8}></Col>
               </Row>
              </Card>
        </div>

        {currentFile && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}

        <label className="btn btn-default">
          <input type="file" onChange={this.selectFile} />
        </label>

        <button
          className="btn btn-success"
          disabled={!selectedFiles}
          onClick={this.upload}
        >
          Upload
        </button>

        <div className="alert alert-light" role="alert">
          {message}
        </div>

        <div className="card">
          <div id="mmm" className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {fileInfos &&
              fileList.map((file, index) => (
                <li className="list-group-item" key={index}>
                  {/* <div onClick= {UploadService.getFile11(index+1)}>
                    <a>{file.name}</a>
                  </div> }

                  {/* <a href={file.url}>{file.name}</a> }
                  <a onClick={() => this.downloadFile(index+1)}>{file.name}</a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
} */

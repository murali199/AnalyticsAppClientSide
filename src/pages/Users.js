import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, notification } from 'antd';
import { getAllUsers, updateUser } from '../services/UtilService';
const originData = [];

const users = getAllUsers()
  .then(response => response.map((user, i) =>    
    originData.push({
      key: i,
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }))
  );

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      username: '',
      email: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      
      if (index > -1) {
        const item = newData[index];
        console.log(row.email+"===")
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
        row.id = item.id;
        console.log(item.id+"junhunu==="+row.id);
        
        const values = [];
        values.push({
          id: item.id,
      username: row.username,
      name: row.name,
      email: row.email,
    })
    
    const userProfile = Object.assign({}, values[0]);

        updateUser(userProfile, item.id)
        .then((response) => response.json())
        .then((result) => {        
          /* notification.success({
            message: 'Polling App',
            description: "Thank you!!!! You're successfully registered. Please Login to continue!",
          });  */
          console.log("=====Success====:", result);  
          //this.props.history.push("/sign-in");
        });
        /* alert("Success"+row)
        console.log("Success:", values); */
        
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      width: '15%',
      editable: true,
    },
    {
      title: 'E - mail',
      dataIndex: 'email',
      width: '40%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'username' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (

    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default EditableTable;
//ReactDOM.render(<EditableTable />, mountNode);
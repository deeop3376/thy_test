import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Table, notification } from "antd";
import { queryList } from "../../service";
import Update from "./update";
export default function UserList() {
  const columns = useMemo(
    () => [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "手机号",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "性别",
        dataIndex: "sex",
        key: "sex",
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "爱好",
        dataIndex: "hobby",
        key: "hobby",
      },
      {
        title: "操作",
        render: (text, record) => {
          return (
            <>
              <Button type="link" onClick={() => handleUpdate(record)}>
                编辑
              </Button>
              <Button type="link" onClick={()=>handleDelete(record)}>删除</Button>
            </>
          );
        },
      },
    ],
    []
  );
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nowUsername, setNowUsername] = useState({});
  const [updateVisible, setUpdateVisible] = useState(false);
  const queryData = useCallback(() => {
    setLoading(true);
    queryList()
      .then((res) => {
        console.log('querylist',res)
        if (Array.isArray(res)) {
          setList([...res]);
        }
      })
      .catch((err) => {
        notification.open({
          type: "error",
          message: err,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  //编辑
  const handleUpdate = (record) => {
    setNowUsername(record.username);
    setUpdateVisible(true);
  };
  //删除
  const handleDelete=record=>{
    
  }
  useEffect(() => {
    queryData();
  }, []);
  return (
    <>
      <Table
        rowKey={"username"}
        loading={loading}
        columns={columns}
        dataSource={list}
      />
      {updateVisible && (
        <Update
          username={nowUsername}
          hanldeClose={() => setUpdateVisible(false)}
          refreshParent={queryData}
        />
      )}
    </>
  );
}

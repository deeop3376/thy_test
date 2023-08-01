import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Table, notification, Popconfirm } from "antd";
import { queryList, deleteUser } from "../../service";
import Update from "./update";
export default function UserList() {
  const [pagination,setPagination]=useState({
    pageSize:3,
    current:1,
    total:0
  })
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
              <Popconfirm
                okText="确定"
                cancelText="取消"
                title="确定删除吗？"
                onConfirm={() => handleDelete(record)}
              >
                <Button type="link">删除</Button>
              </Popconfirm>
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
  const queryData = useCallback((page) => {
    setLoading(true);
    queryList({
      pageSize:pagination.pageSize,
      current:page||pagination.current
    })
      .then((res) => {
        console.log("querylist", res);
          const {data,total}=res
          setList([...data]);
          setPagination(pre=>({...pre,total}))
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
  }, [pagination]);
  //编辑
  const handleUpdate = (record) => {
    setNowUsername(record.username);
    setUpdateVisible(true);
  };
  //删除
  const handleDelete = (record) => {
    setLoading(true);
    deleteUser({ username: record.username })
      .then((res) => {
        refresh();
        notification.open({
          type: "success",
          message: "删除成功",
        });
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
  };
  useEffect(() => {
    queryData();
  }, []);
  const pageChange=(page,pageSize)=>{
    console.log('pageee',page)
    setPagination(pre=>({...pre,current:page}))
    queryData(page);
  }
  const refresh=()=>{
    
    setPagination(pre=>({...pre,current:1}))
    queryData(1)
  }
  return (
    <>
      <Table
        rowKey={"username"}
        loading={loading}
        columns={columns}
        dataSource={list}
        pagination={{
          pageSize:pagination.pageSize,
          current:pagination.current,
          total:pagination.total,
          onChange:pageChange
        }}
      />
      {updateVisible && (
        <Update
          username={nowUsername}
          hanldeClose={() => setUpdateVisible(false)}
          refreshParent={refresh}
        />
      )}
    </>
  );
}

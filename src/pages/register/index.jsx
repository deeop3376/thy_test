import React, { useState } from "react";
import {
  Button,
  Radio,
  Form,
  Input,
  InputNumber,
  notification,
  Modal,
  Spin,
} from "antd";
import s from "./index.module.css";
import { register, queryList } from "../../service";
import { useNavigate } from "react-router-dom";
import md5 from "md5";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //提交
  const onFinish = (values) => {
    setLoading(true);
    values.username = values.username.trim();
    //密码使用md5加密
    values.password = md5(values.password);
    register(values)
      .then((res) => {
        // notification.open({
        //   type:'success',message:'注册成功'
        // })
        Modal.confirm({
          title: "注册成功，是否去往用户列表页？",
          okText: "确定",
          cancelText: "取消",
          onOk(close) {
            navigate("/user-list");
            close();
          },
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

  return (
    <div className={s["register-cont"]}>
      <Spin spinning={loading}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          className={s.register}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input maxLength={20} />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password maxLength={20} />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              {
                pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
                message: "请输入合法手机号",
              },
            ]}
          >
            <Input addonBefore="+86" />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Radio.Group>
              <Radio value={"男"}>男</Radio>
              <Radio value={"女"}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="年龄" name="age" tooltip="范围为1-150">
            <InputNumber min={1} max={150} />
          </Form.Item>

          <Form.Item label="爱好" name="hobby">
            <Input.TextArea maxLength={100} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default Register;

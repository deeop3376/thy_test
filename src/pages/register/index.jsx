import React, { useState } from "react";
import { Button, Radio, Form, Input, InputNumber,notification } from "antd";
import s from "./index.module.css";
import { register } from "../../service";
import md5 from "md5";
const Register = () => {
  const [loading, setLoading] = useState(false);
  //提交
  const onFinish = (values) => {
    setLoading(true);
    values.username=values.username.trim()
    values.password=md5(values.password)
    register(values).then(res=>{
      notification.open({
        type:'success',message:'注册成功'
      })
    }).catch(err=>{
      notification.open({
        type:'error',message:err
      })
    }).finally(()=>{
      setLoading(false)
    })
  };
  return (
    <div className={s["register-cont"]}>
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
          rules={[
            { required: true, message: "请输入用户名" }
          
          ]}
          
        >
          <Input maxLength={20}  />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password maxLength={20} />
        </Form.Item>
        <Form.Item label="手机号" name="mobile" rules={[
            {
              pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
              message: "请输入合法手机号",
            },
          ]}>
          <Input addonBefore='+86' />
        </Form.Item>
        <Form.Item label="性别" name="sex">
          <Radio.Group>
            <Radio value={'男'}>男</Radio>
            <Radio value={'女'}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="年龄" name="age">
          <InputNumber min={1} max={200} />
        </Form.Item>

        <Form.Item label="爱好" name="hobby">
          <Input.TextArea maxLength={100} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

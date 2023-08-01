import React, { useEffect, useState } from "react";
import {
  Form,
  Modal,
  Radio,
  Input,
  notification,
  InputNumber,
  Button,
} from "antd";
import { updateUser, queryDetail } from "../../../service";
export default function Update(props) {
  const { username,hanldeClose,refreshParent } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  //提交
  const onFinish = (values) => {
    setLoading(true);
    values.username = values.username.trim();
    console.log('submittt',values)
    updateUser(values)
      .then((res) => {
        notification.open({
          type: "success",
          message: "修改成功",
        });
        hanldeClose&&hanldeClose();
        refreshParent&&refreshParent();
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
  //详情
  const getUserInfo = () => {
    setLoading(true);
    queryDetail({ username })
      .then((res) => {
        form.setFieldsValue(res);
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
    if(username){
        getUserInfo();
    }else{
        notification.open({
            type:'error',message:'username为空'
        })
    }
  }, []);
  return (
    <Modal open={true} title="修改" width={600} footer={false} onCancel={hanldeClose}>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="用户名"
          name="username"
        >
          <Input maxLength={20} disabled />
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
        <Form.Item label="年龄" name="age">
          <InputNumber min={1} max={200} />
        </Form.Item>

        <Form.Item label="爱好" name="hobby">
          <Input.TextArea maxLength={100} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            确定
          </Button>
          <Button style={{marginLeft:'10px'}}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

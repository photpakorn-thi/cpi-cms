"use client";

import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type LoginFieldType = {
  username: string;
  password: string;
  remember: boolean;
};

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
  const navRouter = useRouter();

  const [form] = Form.useForm<LoginFieldType>();

  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = (values: LoginFieldType) => {
    setLoading(true);
    console.log("onFinish :", { values });
    setTimeout(() => {
      setLoading(false);
      navRouter.push("/");
    }, 3000);
  };

  return (
    <div className="flex flex-nowrap h-screen">
      <div className="h-full hidden lg:block bg-gray-200 w-[50vw]"></div>
      <div className="h-full w-full lg:w-[50vw]">
        <Flex justify={"center"} align={"center"} className="h-full">
          <div className="w-[80%] lg:w-[60%] max-w-[327px] -bg-blue-100">
            <Typography.Title level={3} className="text-center">
              CPI Project
            </Typography.Title>
            <Form
              form={form}
              initialValues={{
                remember: false,
              }}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                label="Email AD"
                required
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Email AD" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                required
                rules={[{ required: true }]}
              >
                <Input size="large" placeholder="Password" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <div className="text-center">
                <Button
                  type="primary"
                  className="w-full h-[44px]"
                  onClick={() => form.submit()}
                  loading={loading}
                >
                  Sign in
                </Button>
                <div className="mt-2">
                  <a href="#" className=" underline">
                    Forgot your password ?
                  </a>
                </div>
              </div>
            </Form>
          </div>
        </Flex>
      </div>
    </div>
  );
}

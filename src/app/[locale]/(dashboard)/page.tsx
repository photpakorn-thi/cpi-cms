"use client";

import AntdDatePicker from "@/components/DatePicker/AntdDatePicker";
import FormDisabledDemo from "@/components/example/FormDisabledDemo";
import { DashboardOutlined, DashOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    <div className="bg-white rounded-md p-2 min-h-full">
      <div className="mb-2">
        <Space align="baseline">
          <div className="bg-blue-50 rounded-md p-3">
            <DashboardOutlined className="text-lg text-blue-700" />
          </div>
          <Typography className="text-2xl">{t("title")}</Typography>
        </Space>
      </div>

      <Button type="primary">{t("title")}</Button>
      <div className="m-3">
        <AntdDatePicker />
      </div>
      <div className="w-full">
        <FormDisabledDemo />
      </div>
    </div>
  );
}

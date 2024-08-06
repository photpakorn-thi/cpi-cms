"use client";

import { useEffect, useState } from "react";
import { IPagination } from "@/api-service/common.interface";
import {
  IResUserData,
  createUser,
  findAllUsers,
  innerFindAllUsers,
  removeUser,
  updateUser,
} from "@/api-service/user.api";
import CustomTable from "@/components/Table/CustomTable";
import { ACTIVE_STATUS } from "@/interface/response";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  TableProps,
  Tag,
  Typography,
} from "antd";
import { capitalizeFirstChar } from "@/utils/string.util";
import _, { omit } from "lodash";
import { useTranslations } from "next-intl";

const fieldUser: string[] = [
  "username",
  "password",
  "email",
  "firstname",
  "lastname",
];

export default function UserPage() {
  const t = useTranslations("UserManagement");
  const tCommon = useTranslations("Common");
  const [form] = Form.useForm<IResUserData>();

  const formStatus = Form.useWatch("status", form);

  const [usersData, setUsersData] = useState<IResUserData[]>([]);
  const [paginationData, setPaginationData] = useState<IPagination>({
    total: 0,
  });
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [listFilters, setListFilters] = useState<{
    pageSize?: number;
    current?: number;
  }>({
    pageSize: 10,
    current: 1,
  });

  const columns: TableProps<IResUserData>["columns"] = [
    {
      title: "#",
      width: "5%",
      align: "center",
      key: "id",
      render(_, record, index) {
        return (
          ((listFilters?.current || 1) - 1) * (listFilters?.pageSize || 1) +
          (index + 1)
        );
      },
    },
    {
      title: t("column.username"),
      width: "20%",
      key: "username",
      dataIndex: "username",
    },
    {
      title: t("column.email"),
      width: "20%",
      key: "email",
      dataIndex: "email",
    },
    {
      title: t("column.fullname"),
      key: "fullname",
      render(_, record) {
        return (
          <div>
            {record.firstname} {record.lastname}
          </div>
        );
      },
    },
    {
      title: t("column.status"),
      key: "status",
      dataIndex: "status",
      align: "center",
      width: "10%",
      render(val, record) {
        return (
          <Tag
            className="w-[75px] text-center"
            color={val === ACTIVE_STATUS.ACTIVE ? "green" : "red"}
          >
            {val}
          </Tag>
        );
      },
    },
    {
      title: t("column.action"),
      width: "10%",
      key: "action",
      fixed: "right",
      render(_, record) {
        return (
          <Space>
            <Button
              icon={<EditOutlined className="text-blue-400" />}
              type="text"
              onClick={() => onOpenForm(record)}
            />
            <Button
              icon={<DeleteOutlined className="text-red-400" />}
              type="text"
              onClick={() => onDelete(record.id)}
            />
          </Space>
        );
      },
    },
  ];

  const onOpenForm = (record?: IResUserData) => {
    form.resetFields();
    form.setFieldsValue({
      ...record,
      status: record ? record.status : ACTIVE_STATUS.ACTIVE,
    });
    setIsOpenForm(true);
  };

  const onSave = async () => {
    const values = await form.validateFields();
    const body = omit(values, ["id"]);
    const id = _.get(values, "id");
    let res = null;
    if (id) {
      res = await updateUser(body, id);
    } else {
      res = await createUser(body);
    }
    if (res) {
      getUserList();
      setIsOpenForm(false);
    }
  };

  const onDelete = async (id: number) => {
    await removeUser(id);
    getUserList();
  };

  useEffect(() => {
    const getUserList = async () => {
      console.log("getUserList is call!!");
      // const result = await findAllUsers(listFilters);
      const result = await innerFindAllUsers(listFilters);
      if (result?.statusCode === 200) {
        setUsersData(result.data);
        setPaginationData({ ...result.pagination });
      }
    };

    getUserList();
    // testFetch();
  }, [listFilters]);

  return (
    <div className="bg-white rounded-md p-4 min-h-full">
      <Modal
        title="From User"
        open={isOpenForm}
        okText="Save"
        closable={false}
        onCancel={() => setIsOpenForm(false)}
        onClose={() => setIsOpenForm(false)}
        onOk={onSave}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="id" hidden />

          {fieldUser.map((field: string) => (
            <Form.Item
              key={field}
              name={field}
              label={capitalizeFirstChar(field)}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          ))}
          <Form.Item name="status" hidden />
          <Form.Item label="Status" layout="horizontal" required>
            <Switch
              defaultChecked
              value={formStatus === ACTIVE_STATUS.ACTIVE}
              onChange={(e) =>
                form.setFieldValue(
                  "status",
                  e ? ACTIVE_STATUS.ACTIVE : ACTIVE_STATUS.INACTIVE
                )
              }
              checkedChildren={formStatus}
              unCheckedChildren={formStatus}
            />
          </Form.Item>
        </Form>
      </Modal>
      <div className="mb-2">
        <Space align="baseline">
          <div className="bg-blue-50 rounded-md p-3">
            <SettingOutlined className="text-lg text-blue-700" />
          </div>
          <Typography className="text-2xl">{t("title")}</Typography>
        </Space>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <div className="max-md:w-full w-2/4">
          <Input
            prefix={<SearchOutlined />}
            allowClear
            onChange={(e) =>
              setListFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
        <div className="w-auto text-right ml-auto">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined className="text-lg" />}
            onClick={() => onOpenForm()}
          >
            {t("action.create")}
          </Button>
        </div>
      </div>
      <CustomTable
        columns={columns}
        dataSource={usersData}
        pagination={{
          total: paginationData.total,
          ...(paginationData?.pageSize
            ? { pageSize: Number(paginationData?.pageSize) }
            : undefined),
          ...(paginationData?.current
            ? { current: Number(paginationData?.current) }
            : undefined),
          onChange(current, pageSize) {
            setListFilters((prev) => ({ ...prev, current, pageSize }));
          },
        }}
      />
    </div>
  );
}

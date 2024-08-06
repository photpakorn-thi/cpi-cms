"use client";

import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  BellOutlined,
  SettingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { uniq } from "lodash";
import { ISidebarMenu } from "@/common/interface";
import { useTranslations } from "next-intl";

const { Header, Content, Sider } = Layout;

export default function ManagementLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const t = useTranslations("Menu");
  const router = useRouter();
  const pathname = usePathname().slice(4);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(
    uniq([pathname.split("/", 1)[0], pathname])
  );
  const [userData, setUserData] = useState<any>({
    name: "Full Name",
    role: "Super Admin",
    email: "Example@email.com",
  });

  const navigation: ISidebarMenu[] = [
    { name: t("dashboard"), href: "", icon: <DashboardOutlined /> },
    // { name: "Timesheet", href: `timesheet`, icon: <FieldTimeOutlined /> },
    // { name: "Project", href: `project`, icon: <FileTextOutlined /> },
    // { name: "Report", href: `report`, icon: <LineChartOutlined /> },
    {
      name: t("setting"),
      href: "setting",
      icon: <SettingOutlined />,
      children: [
        { name: t("user"), href: "setting/user" },
        // { name: "Project", href: `setting/project` },
        // { name: "Task Type", href: `setting/task-type` },
      ],
    },
  ];

  const findInTree = (
    nodes: ISidebarMenu[],
    search: string
  ): ISidebarMenu | null => {
    for (const node of nodes) {
      if (String(node.href) === String(search)) {
        return node;
      }
      if (node.children) {
        const result = findInTree(node.children, search);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  return (
    <Layout className="h-screen">
      <Header className="bg-white drop-shadow-md px-2">
        <div className="flex h-16 items-center justify-between">
          <Space>
            <Button
              type="text"
              className="max-md:hidden size-[64px] text-md"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <h1>
              {/* {
                navigation?.find(
                  (na) => String(na.href) === pathname
                  // String(pathname.slice(1).split("/", 1)[0])
                )?.name
              } */}
              {findInTree(navigation, pathname)?.name}
            </h1>
          </Space>
          <div>
            <Avatar className="bg-white hover:bg-gray-100 cursor-pointer ">
              <BellOutlined className="text-black text-xl" />
            </Avatar>
            <Dropdown
              key={"dropdown-lang"}
              className="mx-2 hover:bg-gray-100 rounded-md px-2"
              placement={"bottomRight"}
              menu={{
                items: [
                  {
                    key: "lang-en",
                    label: "English",
                    onClick: () => router.replace(`/en/${pathname}`),
                  },
                  {
                    type: "divider",
                  },
                  {
                    key: "lang-th",
                    label: "Thai",
                    onClick: () => router.replace(`/th/${pathname}`),
                  },
                ],
              }}
            >
              <Space className="text-gray-400 hover:text-gray-900 ">
                <Avatar className="font-bold">
                  {String(locale).toLocaleUpperCase()}
                </Avatar>
                <DownOutlined />
              </Space>
            </Dropdown>
            <Dropdown
              key={"dropdown-profile"}
              className="mx-2 hover:bg-gray-100 rounded-md px-2"
              placement={"bottomRight"}
              menu={{
                items: userData
                  ? [
                      { key: "profile", label: "Profile" },
                      {
                        key: "sign-out",
                        label: "Sign out",
                        onClick: async () => {
                          router.push("/login");
                        },
                      },
                    ]
                  : [
                      {
                        key: "sign-in",
                        label: "Sign In",
                        onClick: () => router.push("/login"),
                      },
                    ],
              }}
            >
              <Space className="text-gray-400 hover:text-gray-900 ">
                {userData ? (
                  <>
                    <Avatar>
                      {String(userData.name)
                        .split(" ")
                        .map((n) => String(n)[0])
                        .join("")}
                    </Avatar>
                    <div className="text-gray-700 hidden md:block">
                      <p className="text-sm">
                        <b>{userData.name} | </b> {userData.role}
                      </p>
                      <p className="text-xs">{userData.email}</p>
                    </div>
                  </>
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )}
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider
          theme="light"
          className="overflow-auto"
          trigger={null}
          collapsible
          // collapsedWidth="64"
          collapsed={collapsed}
          breakpoint="md"
          onBreakpoint={(broken) => setCollapsed(broken)}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={selectedKeys}
            onSelect={(info) => setSelectedKeys(info.selectedKeys)}
            defaultOpenKeys={uniq([pathname.split("/", 1)[0], pathname])}
            items={navigation.map((item) => ({
              key: item.href,
              icon: item.icon,
              label: item?.children?.length ? (
                item.name
              ) : (
                <Link href={`/${locale}/${item.href}`}>{item.name}</Link>
              ),
              ...(item?.children?.length
                ? {
                    children: item.children.map((child) => ({
                      key: child.href,
                      label: (
                        <Link href={`/${locale}/${child.href}`}>
                          {child.name}
                        </Link>
                      ),
                    })),
                  }
                : undefined),
            }))}
          />
          {/* <Button className=" bottom-0 w-[100%]"> Sign out</Button> */}
        </Sider>
        <Content className="overflow-auto p-5">{children}</Content>
      </Layout>
    </Layout>
  );
}

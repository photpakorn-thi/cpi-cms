import { Table, TableProps } from "antd";
import * as React from "react";
import { useTranslations } from "use-intl";

export interface ICustomTableProps extends TableProps {}

export default function CustomTable(props: ICustomTableProps) {
  const t = useTranslations("Common");

  return (
    <div>
      <Table
        {...props}
        pagination={
          props.pagination !== false
            ? {
                ...props.pagination,
                size: "default",
                // defaultCurrent: 1,
                // defaultPageSize: 5,
                showSizeChanger: true,
                showQuickJumper: true,
                pageSizeOptions: [2, 5, 10, 25, 50, 100],
                // showTotal: (total, range) =>
                //   `${range[0]}-${range[1]} of ${total} items`,
                itemRender(page, type, element) {
                  switch (type) {
                    case "next":
                      element = <a>{t("next")}</a>;
                      break;
                    case "prev":
                      element = <a>{t("previous")}</a>;
                      break;
                  }
                  return element;
                },
              }
            : false
        }
        scroll={{ x: "max-content" }}
        // size="small"
      />
    </div>
  );
}

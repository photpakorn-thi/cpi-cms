import { PickerPropsWithMultiple } from "antd/lib/date-picker/generatePicker/interface";
import CustomDatePicker from "./CustomDatePicker";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import dayjs from "dayjs";

export default function AntdDatePicker(
  props: PickerPropsWithMultiple<
    dayjs.Dayjs,
    PickerProps<dayjs.Dayjs>,
    dayjs.Dayjs
  >
) {
  return <CustomDatePicker {...props} />;
}

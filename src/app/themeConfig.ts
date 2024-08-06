"use client";
import type { ThemeConfig } from "antd";
import { theme } from "antd";
import { AliasToken } from "antd/es/theme/internal";

const { getDesignToken } = theme;

const globalToken: AliasToken = getDesignToken();

const colorPrimary = "#4ac4b1"; // "#074E9F";
const bgColorPrimary = "#ebfbf5";
const bgColorContainerPrimary = "#FBFCFF";

export const themeVariable = {
  colorPrimary,
  bgColorPrimary,
  bgColorContainerPrimary,
};

const customTheme: ThemeConfig = {
  token: {
    fontFamily: '"Chakra Petch", sans-serif',
    colorPrimary: colorPrimary,
    // colorPrimary: globalToken.colorPrimary,
  },
  components: {
    Button: {
      colorPrimary: colorPrimary,
    },
    Radio: {
      colorPrimary: colorPrimary,
      // colorPrimaryHover: colorPrimary,
      // colorBgContainer: "#DEEDFE",
    },
    Calendar: {
      colorPrimary: colorPrimary,
      // colorBgTextHover: colorPrimary,
    },
    Table: {
      headerBg: colorPrimary,
      headerColor: "#FFF",
      colorBgContainer: bgColorContainerPrimary,
    },
    Menu: {
      fontSizeIcon: 16,
      // itemSelectedBg: bgColorPrimary,
    },
  },
};

export default customTheme;

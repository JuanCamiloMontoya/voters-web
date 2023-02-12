import { ThemeConfig } from "antd/es/config-provider/context"

export const colors = {
  primaryColor: '#012e7c',
  primaryDark: '#00143a',
  secondaryColor: '#70bcff',
  succesIconColor: '#52c41a'
}

export const theme: ThemeConfig = {
  token: {
    colorPrimary: colors.primaryColor,
    borderRadius: 5,
    colorLink: colors.primaryColor,
    colorLinkHover: colors.secondaryColor,
    colorLinkActive: colors.secondaryColor
  },
  components: {
    Layout: {
      colorBgHeader: colors.primaryColor,
      colorBgContainer: colors.primaryColor,
    },
    Menu: {
      colorItemBg: colors.primaryColor,
      colorItemBgSelected: colors.primaryDark
    }
  }
}

export const columnSizes = {
  xs: 24,
  sm: 12,
  md: 8,
  xl: 6,
  xxl: 4
}
import { ThemeConfig } from "antd/es/config-provider/context"

const primaryColor = '#017c5b'
const secondaryColor = '#003a2a'

export const theme: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,
    borderRadius: 5,
    colorLink: primaryColor,
    colorLinkHover: secondaryColor,
    colorLinkActive: secondaryColor
  },
  components: {
    Layout: {
      colorBgHeader: primaryColor,
      colorBgContainer: primaryColor,
    },
    Menu: {
      colorItemBg: primaryColor,
      colorItemBgSelected: secondaryColor
    }
  }
}
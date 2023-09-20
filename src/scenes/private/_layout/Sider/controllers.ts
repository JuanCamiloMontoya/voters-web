import { useNavigate, useLocation } from "react-router-dom";
import { MenuProps } from "antd";

const menuOptions = [
  {
    key: "/",
    label: "Inicio",
    icon: "HomeOutlined",
  },
  {
    key: "/leaders",
    label: "Líderes",
    icon: "UsergroupAddOutlined",
  },
  {
    key: "/voters",
    label: "Votantes",
    icon: "FormOutlined",
  },
  {
    key: "/messaging",
    label: "Mensajería",
    icon: "MessageOutlined",
  },
];

const useSider = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onOptionClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  return {
    onOptionClick,
    menuOptions,
    pathname,
  };
};

export default useSider;

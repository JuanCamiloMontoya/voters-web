import { matchPath, useLocation, useNavigate } from "react-router-dom";

const usePrivate = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onBreadcrumbClick = (route: string) => {
    if (!matchPath(route, pathname)) navigate(route);
  };

  return {
    pathname,
    onBreadcrumbClick,
  };
};

export default usePrivate;

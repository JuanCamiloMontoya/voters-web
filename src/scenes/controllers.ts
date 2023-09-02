import { useAuthSelectors } from "../services/auth/auth.selectors";

const useApp = () => {
  const { isAuthenticated } = useAuthSelectors();

  return {
    isAuthenticated,
  };
};

export default useApp;

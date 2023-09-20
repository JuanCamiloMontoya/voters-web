import { useState } from "react";

const useFileInput = () => {
  const [fileList, setFileList] = useState<any>([]);
  return { fileList, setFileList };
};

export default useFileInput;

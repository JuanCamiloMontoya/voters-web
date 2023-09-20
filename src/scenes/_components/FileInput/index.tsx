import { Button, Form, Typography, Upload as UploadAntd, message } from "antd";
import { Controller } from "react-hook-form";
import { FileInputProps } from "./models";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import useFileInput from "./controller";

const { Item } = Form;
const { Text } = Typography;
const { Dragger } = UploadAntd;

const FileInput = (props: FileInputProps) => {
  const {
    name,
    control,
    label,
    error = undefined,
    required = true,
    dragger = false,
    multiple = false,
    maxCount = 5,
  } = props;

  const { fileList, setFileList } = useFileInput();

  const Upload = dragger ? Dragger : UploadAntd;

  return (
    <Item label={label} required={required}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <>
            {
              <Upload
                {...field}
                name={name}
                multiple={multiple}
                beforeUpload={() => false}
                fileList={fileList}
                listType="picture-card"
                maxCount={multiple ? maxCount : 1}
                style={{
                  display: fileList.length >= maxCount ? "none" : "block",
                }}
                onChange={(info) => {
                  const { status } = info.file;
                  if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                  setFileList(info.fileList);
                  onChange(info.fileList);
                }}
              >
                {fileList.length >= maxCount ? null : dragger ? (
                  <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Haga clic o arrastre el archivo a esta área para cargarlo.
                    </p>
                    <p className="ant-upload-hint">
                      Soporte para una carga única o masiva.
                    </p>
                  </>
                ) : (
                  <div>
                    <UploadOutlined />
                    <div>Cargar</div>
                  </div>
                )}
              </Upload>
            }
          </>
        )}
      />
      {Array.isArray(error)
        ? error.map(({ message }, i) => (
            <Text type="danger" key={i}>
              {message}
            </Text>
          ))
        : error && <Text type="danger">{error.message}</Text>}
    </Item>
  );
};
export default FileInput;

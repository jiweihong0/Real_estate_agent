import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Progress, Upload } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { deleteFile } from "../../hooks/useAPI";
import axios from "axios";

type UploadFileProps = {
  fileList: string[];
  setFileList: (fileList: string[]) => void;
};

type IUploadFileResponse = {
  message: string;
  url: string;
};

function checkIsImageExist(url: string) {
  const http = new XMLHttpRequest();

  http.open("HEAD", url, false);
  http.send();

  return http.status !== 404;
}

const App = (props: UploadFileProps) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/api/files/upload`;
  const [progress, setProgress] = useState(0);
  const organizedFileList: UploadFile[] = props.fileList.reduce((acc, cur) => {
    const isThisImageExist = checkIsImageExist(cur);
    if (!isThisImageExist) {
      props.setFileList(props.fileList.filter((url) => url !== cur));
      return acc;
    }

    return [
      ...acc,
      {
        uid: cur,
        name: "",
        status: "done",
        url: cur,
      },
    ];
  }, [] as UploadFile[]);

  type IBeforeUpload = React.ComponentProps<typeof Upload>["beforeUpload"];
  const beforeUpload: IBeforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("您只能上傳 JPG/PNG 檔案");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert("圖片必須小於 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  type IUploadImage = React.ComponentProps<typeof Upload>["customRequest"];
  const uploadImage: IUploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();

    type AxiosConfig = Parameters<typeof axios.post>[2];
    const config: AxiosConfig = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total!) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress!({ percent: (event.loaded / event.total!) * 100 });
      },
    };
    fmData.append("file", file);
    try {
      const res = await axios.post<IUploadFileResponse>(url, fmData, config);
      props.setFileList([...props.fileList, res.data.url]);
      onSuccess!(res.data);
    } catch (err) {
      console.log("Eroor: ", err);
      onError!({ err });
    }
  };

  type IRemove = React.ComponentProps<typeof Upload>["onRemove"];

  const onRemove: IRemove = async (file) => {
    try {
      const fileName = file.url?.split("/")[4];
      console.log(fileName);

      await deleteFile(fileName as string);
      const fileList = props.fileList.filter((url) => url !== file.url);
      props.setFileList(fileList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Upload
        listType="picture"
        fileList={organizedFileList}
        onRemove={onRemove}
        customRequest={uploadImage}
        className="upload-list-inline"
        beforeUpload={beforeUpload}
        accept=".jpg,.png"
      >
        <Button
          type="primary"
          className="bg-blue-600 "
          icon={<UploadOutlined />}
        >
          新增照片
        </Button>
      </Upload>
      {progress > 0 ? <Progress percent={progress} /> : null}
    </>
  );
};

export default App;

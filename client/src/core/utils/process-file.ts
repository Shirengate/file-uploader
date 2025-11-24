import { getFileIcon, getFileExtType, getFileMimeType } from "./get-file-info";

export const proccessFile = (filename: string) => {
  const extenction = getFileExtType(filename);
  const fileIcon = getFileIcon(filename);
  const type = getFileMimeType(filename);
  return { extenction, Icon: fileIcon, type };
};

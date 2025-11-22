import { getFileIcon, getFileExt, getFileType } from "./getIcons";

export const proccessFile = (filename: string) => {
  const extenction = getFileExt(filename);
  const fileIcon = getFileIcon(filename);
  const type = getFileType(filename);
  return { extenction, Icon: fileIcon, type };
};

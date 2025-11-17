import { getFileIcon, getFileType } from "./getIcons";

export const proccessFile = (filename: string) => {
  const extenction = getFileType(filename);
  const fileIcon = getFileIcon(filename);
  return { extenction, Icon: fileIcon };
};

import {
  FILE_EXTENSIONS,
  FILE_TYPE_ICONS,
  FileType,
} from "../consts/media-types";

export function getFileType(fileName: string): FileType {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension
    ? FILE_EXTENSIONS[extension] || FileType.UNKNOWN
    : FileType.UNKNOWN;
}

export function getFileIcon(fileName: string): React.ComponentType {
  const fileType = getFileType(fileName);
  return FILE_TYPE_ICONS[fileType];
}

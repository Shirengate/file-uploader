import {
  FILE_EXTENSIONS,
  FILE_TYPE_ICONS,
  FileType,
  MIME_TYPES,
} from "@core/consts/media-types";

export function getFileExtType(fileName: string): FileType {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension
    ? FILE_EXTENSIONS[extension] || FileType.UNKNOWN
    : FileType.UNKNOWN;
}

export function getFileIcon(fileName: string): React.ComponentType {
  const fileType = getFileExtType(fileName);
  return FILE_TYPE_ICONS[fileType];
}

export function getFileMimeType(fileName: string): MIME_TYPES {
  const fileExtension = fileName.split(".").pop()?.toUpperCase();

  if (!fileExtension) return MIME_TYPES.DEF;

  return MIME_TYPES[fileExtension as keyof typeof MIME_TYPES];
}

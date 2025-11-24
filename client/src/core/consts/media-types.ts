import {
  AudioIcon,
  VideoIcon,
  TxtIcon,
  PdfIcon,
  ImgIcon,
} from "@core/ui/Icons";

export const FileType = {
  AUDIO: "audio",
  VIDEO: "video",
  IMAGE: "image",
  TEXT: "text",
  PDF: "pdf",
  UNKNOWN: "unknown",
  ZIP: "zip",
} as const;

export type FileType = (typeof FileType)[keyof typeof FileType];

// Маппинг расширений на типы
export const FILE_EXTENSIONS: Record<string, FileType> = {
  // Audio
  mp3: FileType.AUDIO,
  wav: FileType.AUDIO,
  ogg: FileType.AUDIO,
  m4a: FileType.AUDIO,
  flac: FileType.AUDIO,

  // Video
  mp4: FileType.VIDEO,
  avi: FileType.VIDEO,
  mov: FileType.VIDEO,
  webm: FileType.VIDEO,
  mkv: FileType.VIDEO,

  // Text
  txt: FileType.TEXT,
  md: FileType.TEXT,
  csv: FileType.TEXT,
  json: FileType.TEXT,

  // Image
  jpg: FileType.IMAGE,
  jpeg: FileType.IMAGE,
  png: FileType.IMAGE,
  gif: FileType.IMAGE,
  webp: FileType.IMAGE,

  // PDF
  pdf: FileType.PDF,
};

// Общие MIME типы
export enum MIME_TYPES {
  // Audio
  MP3 = "audio/mpeg",
  WAV = "audio/wav",
  OGG = "audio/ogg",
  M4A = "audio/x-m4a",

  // Video
  MP4 = "video/mp4",
  AVI = "video/x-msvideo",
  MOV = "video/quicktime",
  WEBM = "video/webm",

  // Text
  TXT = "text/plain",
  CSV = "text/csv",
  JSON = "application/json",
  HTML = "text/html",

  // Image
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  PNG = "image/png",
  GIF = "image/gif",
  WEBP = "image/webp",

  // PDF
  PDF = "application/pdf",

  // Documents
  DOC = "application/msword",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  // Archives
  ZIP = "application/zip",
  //Default
  DEF = "application/octet-stream",
}

// Маппинг типов на иконки
export const FILE_TYPE_ICONS: Record<FileType, React.ComponentType> = {
  [FileType.AUDIO]: AudioIcon,
  [FileType.VIDEO]: VideoIcon,
  [FileType.TEXT]: TxtIcon,
  [FileType.PDF]: PdfIcon,
  [FileType.IMAGE]: ImgIcon,
  [FileType.UNKNOWN]: TxtIcon,
  [FileType.ZIP]: TxtIcon,
};

export enum FILE_CATEGORY {
  DOCS = "docs",
  MEDIA = "media",
}

// Объект с группировкой типов файлов
export const FILE_TYPE_CATEGORIES = {
  docs: [FileType.TEXT, FileType.PDF],
  media: [FileType.AUDIO, FileType.VIDEO, FileType.IMAGE],
} as const;

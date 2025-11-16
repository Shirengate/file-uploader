import {
  AudioIcon,
  VideoIcon,
  TxtIcon,
  PdfIcon,
  ImgIcon,
} from "../assets/icons/Icons";

export const FileType = {
  AUDIO: "audio",
  VIDEO: "video",
  IMAGE: "image",
  TEXT: "text",
  PDF: "pdf",
  UNKNOWN: "unknown",
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

  /// Image
  jpg: FileType.IMAGE,
  png: FileType.IMAGE,

  // PDF
  pdf: FileType.PDF,
};

// Маппинг типов на иконки
export const FILE_TYPE_ICONS: Record<FileType, React.ComponentType> = {
  [FileType.AUDIO]: AudioIcon,
  [FileType.VIDEO]: VideoIcon,
  [FileType.TEXT]: TxtIcon,
  [FileType.PDF]: PdfIcon,
  [FileType.IMAGE]: ImgIcon,
  [FileType.UNKNOWN]: TxtIcon,
};

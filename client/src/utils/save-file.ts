import type { FileType, MIME_TYPES } from "../consts/media-types";

interface SaveFileArgs {
  name: string;
  ext: FileType | string;
  type: MIME_TYPES | string;
  file: Blob | File;
}

export const saveFile = async ({ ext, name, type, file }: SaveFileArgs) => {
  try {
    const handle = await globalThis.showSaveFilePicker({
      suggestedName: name,
      types: [
        {
          accept: {
            [type]: [`.${ext}`],
          },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(file);
    await writable.close();
  } catch (error) {
    return error;
  }
};

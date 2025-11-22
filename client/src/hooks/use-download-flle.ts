import { useMutation } from "@tanstack/react-query";
import JSZip from "jszip";
import { saveFile } from "../utils/save-file";
import { FileType, MIME_TYPES } from "../consts/media-types";

interface DownloadSingleFileArgs {
  url: string;
  name: string;
  ext: string;
  type: string;
}

export const useDownloadFile = () => {
  const downloadSingle = useMutation({
    mutationFn: async ({ url, name, ext, type }: DownloadSingleFileArgs) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return {
        blob: await response.blob(),
        name,
        ext,
        type,
      };
    },
  });

  const downloadToZip = useMutation({
    mutationFn: async (files: Map<string, string>) => {
      const jszip = new JSZip();

      for (const [name, url] of files.entries()) {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const blob = await response.blob();
          jszip.file(name, blob);
        } catch (error) {
          console.error(`Failed to download ${name}:`, error);
        }
      }
      return await jszip.generateAsync({
        type: "blob",
      });
    },
  });

  const downloadSingleFile = async (args: DownloadSingleFileArgs) => {
    const result = await downloadSingle.mutateAsync(args);

    await saveFile({
      ext: result.ext,
      name: result.name,
      file: result.blob,
      type: result.type,
    });
  };

  const downloadZipFile = async (
    files: Map<string, string>,
    zipName: string = "archive.zip"
  ) => {
    const zipBlob = await downloadToZip.mutateAsync(files);

    await saveFile({
      ext: FileType.ZIP,
      type: MIME_TYPES.ZIP,
      name: zipName,
      file: zipBlob,
    });
    return zipBlob;
  };

  return {
    downloadSingleFile,
    downloadZipFile,
  };
};

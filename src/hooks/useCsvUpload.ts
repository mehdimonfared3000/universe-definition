import { useCallback, useRef } from "react";
import { parseCsv } from "@/lib/csv";
import { createEntry } from "@/api/universe";

export const useCsvUpload = (onUploadComplete: () => void) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.name.endsWith(".csv")) {
        alert("Please select a .csv file");
        return;
      }

      file.text().then((text) => {
        const { headers, rows } = parseCsv(text);
        createEntry({ fileName: file.name, headers, rows }).then(
          onUploadComplete,
        );
      });

      e.target.value = "";
    },
    [onUploadComplete],
  );

  return { fileInputRef, openFilePicker, handleFileChange };
};

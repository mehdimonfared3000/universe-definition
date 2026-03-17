import Papa from "papaparse"
import type { CsvUpload } from "@/types/universe"

const STORAGE_KEY = "csv-uploads"

export function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  const result = Papa.parse<string[]>(text, {
    header: false,
    skipEmptyLines: true,
  })

  if (result.data.length === 0) return { headers: [], rows: [] }

  const [headers, ...rows] = result.data
  return { headers, rows }
}

export function getSavedUploads(): CsvUpload[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveUpload(upload: CsvUpload): CsvUpload[] {
  const uploads = [upload, ...getSavedUploads()]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads))
  return uploads
}

export function deleteUpload(id: string): void {
  const uploads = getSavedUploads().filter((u) => u.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads))
}

export function getUploadById(id: string): CsvUpload | undefined {
  return getSavedUploads().find((u) => u.id === id)
}

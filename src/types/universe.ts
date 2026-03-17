export interface UniverseEntry {
  id: string
  date: string
  service: string
  region: string
  submittedBy: string
  hasSud: boolean
  csvUpload?: CsvUpload
}

export interface CsvUpload {
  id: string
  fileName: string
  uploadedAt: string
  headers: string[]
  rows: string[][]
}

export interface PaginatedResponse {
  data: UniverseEntry[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

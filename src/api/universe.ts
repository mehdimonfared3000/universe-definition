import type {
  UniverseEntry,
  CsvUpload,
  PaginatedResponse,
} from "@/types/universe";

const API_BASE = "/api";

interface FetchEntriesParams {
  page?: number;
  pageSize?: number;
  query?: string;
}

export async function fetchUniverseEntries({
  page = 1,
  pageSize = 20,
  query = "",
}: FetchEntriesParams): Promise<PaginatedResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (query.trim()) params.set("q", query.trim());

  const res = await fetch(`${API_BASE}/entries?${params}`);
  if (!res.ok) throw new Error(`Failed to fetch entries: ${res.statusText}`);
  return res.json();
}

export async function createEntry(
  upload: Omit<CsvUpload, "id" | "uploadedAt">,
): Promise<UniverseEntry> {
  const res = await fetch(`${API_BASE}/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(upload),
  });
  if (!res.ok) throw new Error(`Failed to create entry: ${res.statusText}`);
  return res.json();
}

export async function deleteEntry(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/entries/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete entry: ${res.statusText}`);
}

export async function deleteEntries(ids: string[]): Promise<void> {
  const res = await fetch(`${API_BASE}/entries`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) throw new Error(`Failed to delete entries: ${res.statusText}`);
}

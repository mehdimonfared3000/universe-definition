import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { toEntry } from "./utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "data.json");

let uploads = JSON.parse(readFileSync(DATA_PATH, "utf-8"));

function persist() {
  writeFileSync(DATA_PATH, JSON.stringify(uploads, null, 2));
}

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// GET /api/entries?page=1&pageSize=20&q=searchterm
app.get("/api/entries", (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, Number.parseInt(req.query.pageSize) || 20),
  );
  const query = (req.query.q || "").trim().toLowerCase();

  let entries = uploads.map(toEntry);

  if (query) {
    entries = entries.filter((entry) => {
      return hasQueryTerm(entry, query);
    });
  }

  const total = entries.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const data = entries.slice(start, start + pageSize);

  res.json({ data, page: safePage, pageSize, total, totalPages });
});

// GET /api/entries/:id
app.get("/api/entries/:id", (req, res) => {
  const upload = uploads.find((u) => u.id === req.params.id);
  if (!upload) return res.status(404).json({ error: "Not found" });
  res.json(toEntry(upload));
});

// POST /api/entries
app.post("/api/entries", (req, res) => {
  const { fileName, headers, rows } = req.body;
  if (!fileName || !headers || !rows) {
    return res
      .status(400)
      .json({ error: "fileName, headers, and rows are required" });
  }

  const upload = {
    id: randomUUID(),
    fileName,
    uploadedAt: new Date().toISOString(),
    headers,
    rows,
  };

  uploads.unshift(upload);
  persist();
  res.status(201).json(toEntry(upload));
});

// DELETE /api/entries/:id
app.delete("/api/entries/:id", (req, res) => {
  const idx = uploads.findIndex((u) => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  uploads.splice(idx, 1);
  persist();
  res.status(204).end();
});

// DELETE /api/entries (bulk delete)
app.delete("/api/entries", (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "ids array is required" });
  }

  const idSet = new Set(ids);
  uploads = uploads.filter((u) => !idSet.has(u.id));
  persist();
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`  ${uploads.length} entries loaded from data.json`);
});

function parseFileName(fileName) {
  const name = fileName.replace(/\.csv$/i, "");
  const lastUnderscore = name.lastIndexOf("_");
  if (lastUnderscore === -1) return { service: name, region: "N/A" };
  return {
    service: name.slice(0, lastUnderscore),
    region: name.slice(lastUnderscore + 1).toUpperCase(),
  };
}

export function toEntry(upload) {
  const { service, region } = parseFileName(upload.fileName);
  return {
    id: upload.id,
    date: new Date(upload.uploadedAt).toLocaleString(),
    service,
    region,
    submittedBy: "Placeholder User",
    hasSud: false,
    csvUpload: upload,
  };
}

export function hasQueryTerm(entry, term) {
  return (
    entry.service.toLowerCase().includes(term) ||
    entry.region.toLowerCase().includes(term) ||
    entry.submittedBy.toLowerCase().includes(term) ||
    entry.date.toLowerCase().includes(term)
  );
}

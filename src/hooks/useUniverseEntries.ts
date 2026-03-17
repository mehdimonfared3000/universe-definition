import { useCallback, useEffect, useState } from "react";
import type { UniverseEntry, PaginatedResponse } from "@/types/universe";
import { fetchUniverseEntries, deleteEntries } from "@/api/universe";

const PAGE_SIZE = 20;

export const useUniverseEntries = () => {
  const [entries, setEntries] = useState<UniverseEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const applyResponse = useCallback((res: PaginatedResponse) => {
    setEntries(res.data);
    setCurrentPage(res.page);
    setTotalPages(res.totalPages);
    setTotal(res.total);
    setLoading(false);
  }, []);

  const loadEntries = useCallback(
    (page: number, query: string, showLoading = true) => {
      if (showLoading) setLoading(true);
      fetchUniverseEntries({ page, pageSize: PAGE_SIZE, query }).then(
        applyResponse,
      );
    },
    [applyResponse],
  );

  useEffect(() => {
    fetchUniverseEntries({ page: 1, pageSize: PAGE_SIZE, query: "" }).then(
      applyResponse,
    );
  }, [applyResponse]);

  const handlePageChange = useCallback(
    (page: number) => {
      loadEntries(page, searchQuery);
    },
    [loadEntries, searchQuery],
  );

  const handleSearch = useCallback(
    (q: string) => {
      setSearchQuery(q);
      loadEntries(1, q, false);
    },
    [loadEntries],
  );

  const handleDelete = useCallback(
    (entriesToDelete: UniverseEntry[]) => {
      const ids = entriesToDelete.map((e) => e.id);
      deleteEntries(ids).then(() => {
        loadEntries(currentPage, searchQuery);
      });
    },
    [loadEntries, currentPage, searchQuery],
  );

  const reload = useCallback(() => {
    loadEntries(1, searchQuery);
  }, [loadEntries, searchQuery]);

  return {
    entries,
    loading,
    currentPage,
    totalPages,
    total,
    searchQuery,
    pageSize: PAGE_SIZE,
    handlePageChange,
    handleSearch,
    handleDelete,
    reload,
  };
};

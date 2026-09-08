import { useEffect, useState } from "react";
import type { FilterParams, Insight } from "../types";
import { fetchInsights } from "../api";

export function useInsights(params: FilterParams) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchInsights(params);
        if (isMounted && res.success) {
          setInsights(res.data);
          setTotal(res.total);
          setPage(res.page);
          setTotalPages(res.totalPages);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || "Failed to load insights data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(params)]);

  return { insights, total, page, totalPages, loading, error };
}

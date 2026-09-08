import { useEffect, useState } from "react";
import type { FilterOptions } from "../types";
import { fetchFilters } from "../api";

export function useFilters() {
  const [filters, setFilters] = useState<FilterOptions>({
    topics: [],
    sectors: [],
    regions: [],
    pestles: [],
    sources: [],
    countries: [],
    endYears: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchFilters();
        if (isMounted) {
          setFilters(res);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message || "Failed to load filter options");
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
  }, []);

  return { filters, loading, error };
}

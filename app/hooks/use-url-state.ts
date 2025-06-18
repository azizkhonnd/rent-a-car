'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { SortOrder } from '../types/car';

interface UrlState {
  page: number;
  sort: SortOrder;
}

interface UseUrlStateReturn {
  urlState: UrlState;
  updateUrl: (page: number, sort: SortOrder) => void;
  updatePage: (page: number) => void;
  updateSort: (sort: SortOrder) => void;
  resetToDefaults: () => void;
}

export function useUrlState(): UseUrlStateReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1');
  const sortParam = searchParams.get('sort') as SortOrder;
  const currentSort: SortOrder = sortParam === 'asc' || sortParam === 'desc' ? sortParam : null;

  const urlState: UrlState = {
    page: currentPage,
    sort: currentSort,
  };

  const updateUrl = useCallback((page: number, sort: SortOrder) => {
    const params = new URLSearchParams();

    if (page !== 1) {
      params.set('page', page.toString());
    }

    if (sort) {
      params.set('sort', sort);
    }

    const url = params.toString() ? `/?${params.toString()}` : '/';
    router.replace(url);
  }, [router]);

  const updatePage = useCallback((page: number) => {
    updateUrl(page, currentSort);
  }, [updateUrl, currentSort]);

  const updateSort = useCallback((sort: SortOrder) => {
    updateUrl(1, sort);
  }, [updateUrl]);

  const resetToDefaults = useCallback(() => {
    updateUrl(1, null);
  }, [updateUrl]);

  return {
    urlState,
    updateUrl,
    updatePage,
    updateSort,
    resetToDefaults,
  };
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchCars } from '@/lib/api';
import { ApiResponse, SortOrder } from '../types/car';

interface UseCarsState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
}

interface UseCarsReturn extends UseCarsState {
  loadCars: (page: number, sort: SortOrder) => Promise<void>;
  refetch: () => Promise<void>;
  clearError: () => void;
}

interface UseCarsOptions {
  initialPage?: number;
  initialSort?: SortOrder;
  autoLoad?: boolean;
}

export function useCars(options: UseCarsOptions = {}): UseCarsReturn {
  const { 
    initialPage = 1, 
    initialSort = null, 
    autoLoad = true 
  } = options;

  const [state, setState] = useState<UseCarsState>({
    data: null,
    loading: false,
    error: null,
  });

  const [currentParams, setCurrentParams] = useState({
    page: initialPage,
    sort: initialSort,
  });

  const loadCars = useCallback(async (page: number, sort: SortOrder) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetchCars(page, sort);

      setState(prev => ({
        ...prev,
        data: response,
        loading: false
      }));

      setCurrentParams({ page, sort });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при получении данных';
      console.error(err);
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
    }
  }, []);

  const refetch = useCallback(async () => {
    await loadCars(currentParams.page, currentParams.sort);
  }, [loadCars, currentParams.page, currentParams.sort]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  useEffect(() => {
    if (autoLoad) {
      loadCars(initialPage, initialSort);
    }
  }, [loadCars, initialPage, initialSort, autoLoad]);

  return {
    ...state,
    loadCars,
    refetch,
    clearError,
  };
}
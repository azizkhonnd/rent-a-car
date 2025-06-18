'use client';

import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import Pagination from '../pagination';
import CarCard from '../car-card';
import { useCars, useUrlState } from '@/app/hooks';
import { useDelayedLoading } from '@/app/utils/delay';

export default function CarGrid() {
  const { urlState, updatePage } = useUrlState();
  const { data, loading, error, loadCars } = useCars({ autoLoad: false });

  const showCards = useDelayedLoading(loading);

  useEffect(() => {
    loadCars(urlState.page, urlState.sort);
  }, [urlState.page, urlState.sort, loadCars]);

  const handlePageChange = (page: number) => {
    updatePage(page);
  };

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container">
      <div className="flex flex-col mt-4 mb-4 sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Каталог автомобилей</h1>
        </div>
      </div>

      {loading || !showCards ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-0">
                <Skeleton className="aspect-[4/3] w-full rounded-t-lg" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data?.data?.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.data.map((car, index) => (
              <CarCard key={`car-${car.id ?? index}`} car={car} />
            ))}
          </div>

          {data.meta && (
            <Pagination
              currentPage={data.meta.current_page}
              totalPages={data.meta.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Автомобили не найдены</p>
        </div>
      )}
    </div>
  );
}
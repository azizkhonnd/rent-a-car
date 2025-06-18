'use client';

import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CarGrid from './components/car-grid';
import Header from './components/header';

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={`loading-skeleton-${index}`} className="h-full">
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
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
       <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className="min-h-screen bg-background">
        <div className="container">
          <Suspense fallback={<LoadingSkeleton />}>
            <CarGrid />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
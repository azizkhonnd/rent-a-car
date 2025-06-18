'use client';

import React from 'react';
import Image from 'next/image';
import { Settings, Calendar, Fuel, Car as CarIcon, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Car } from '@/app/types/car';
import { buildCarName } from '@/lib/api';
import { formatMileage, formatPrice } from '@/lib/utils';

interface CarCardProps {
  car: Car;
  searchTerm?: string;
}

export default function CarCard({ car, searchTerm = '' }: CarCardProps) {

  const highlightSearchTerm = (text: string, searchTerm: string): React.ReactNode => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-blue-200 text-blue-800 font-medium">
          {part}
        </span>
      ) : part
    );
  };

  return (
    <div className='container'>
      <Card
        className="flex flex-col min-h-[430px] overflow-hidden hover:shadow-[8px_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer hover:scale-[1.00]"
      >
        <CardHeader className="p-0 relative group">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={car.images?.image?.[0] || '/placeholder-car.jpg'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={buildCarName(car.mark_id, car.folder_id)}
              fill
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-102"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 text-black text-xs px-2 py-1">
                {car.year}
              </Badge>
            </div>
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge variant="destructive" className="font-bold text-xs px-2 py-1">
                {formatPrice(car.price)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-3 pb-2">
          <CardTitle className="text-base font-bold text-gray-900 line-clamp-1 mb-2">
            {searchTerm ? (
              <>
                {highlightSearchTerm(car.mark_id, searchTerm)}{' '}
                {highlightSearchTerm(car.folder_id, searchTerm)}
              </>
            ) : (
              `${car.mark_id} ${car.folder_id}`
            )}
          </CardTitle>

          <CardDescription className="flex items-center justify-between mb-4">
            <div className="text-lg font-bold text-blue-600">
              {formatPrice(car.price)}
            </div>
            <div className="text-xs text-gray-500">
              от {formatPrice(Math.round(car.price / 70))} /мес.
            </div>
          </CardDescription>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Settings className="w-3 h-3 text-gray-500" />
                <span className="text-gray-700">{car.engine_volume} л</span>
              </div>
              <div className="flex items-center gap-1">
                <CarIcon className="w-3 h-3 text-gray-500" />
                <span className="text-gray-700">{formatMileage(car.mileage ?? car.run ?? 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Fuel className="w-3 h-3 text-gray-500" />
                <span className="text-gray-700">
                  {searchTerm
                    ? highlightSearchTerm(car.gearbox ?? car.transmission ?? '', searchTerm)
                    : car.gearbox ?? car.transmission ?? ''}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-500" />
                <span className="text-gray-700">
                  {searchTerm
                    ? highlightSearchTerm(car.year.toString(), searchTerm)
                    : car.year}{' '}
                  г.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                {searchTerm ? highlightSearchTerm(car.engine_type, searchTerm) : car.engine_type}
              </span>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                {car.body_type}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 pb-2">
          <div className="flex items-center gap-2 w-full">
            <Button
              className="w-10 h-10 bg-gray-200 text-black transition-colors"
              size='sm'>
              <Heart className="!w-5 !h-5" />
            </Button>
            <Button
              className="w-8 h-10 flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
              size="sm"
            >
              Подробнее
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  SlidersHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { SortOrder } from '@/app/types/car';

interface SortFilterProps {
  currentSort: SortOrder;
  onSortChange: (sortOrder: SortOrder) => void;
}

export default function SortFilter({
  currentSort,
  onSortChange,
}: SortFilterProps) {
  const [open, setOpen] = useState(false);

  const handleSortSelect = (sortOrder: SortOrder) => {
    onSortChange(sortOrder);
    setOpen(false);
  };

  const getSortLabel = (sortOrder: SortOrder) => {
    switch (sortOrder) {
      case 'asc':
        return 'Цена: от низкой к высокой';
      case 'desc':
        return 'Цена: от высокой к низкой';
      default:
        return 'Сортировка';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 min-w-[200px] justify-between"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span>{getSortLabel(currentSort)}</span>
          </div>
          {currentSort && (
            <Badge variant="secondary" className="ml-2">
              1
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Сортировка
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          <h4 className="font-medium text-sm text-muted-foreground">
            По цене
          </h4>

          <div className="space-y-2">
            <Button
              variant={currentSort === 'asc' ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => handleSortSelect('asc')}
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              От низкой к высокой
            </Button>

            <Button
              variant={currentSort === 'desc' ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => handleSortSelect('desc')}
            >
              <ArrowDown className="w-4 h-4 mr-2" />
              От высокой к низкой
            </Button>

            <Button
              variant={currentSort === null ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => handleSortSelect(null)}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              По умолчанию
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

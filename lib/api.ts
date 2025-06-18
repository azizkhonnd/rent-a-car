import { ApiResponse, SortOrder } from "@/app/types/car";

export async function fetchCars(
  page: number = 1,
  sortOrder: SortOrder = null
): Promise<ApiResponse> {
  const params = new URLSearchParams({
    _limit: '12',
    _page: page.toString(),
  });

  if (sortOrder) {
    params.append('_sort', 'price');
    params.append('_order', sortOrder);
  }

  const response = await fetch(`/api/cars?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }

  return response.json();
}

export function buildCarName(markId: string, folderId: string): string {
  return `${markId} ${folderId}`;
}
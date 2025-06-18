export interface Car {
  id: number;
  mark_id: string;
  folder_id: string;
  price: number;
  year: number;
  mileage?: number;
  run?: number; 
  engine_volume: number;
  fuel_type: string;
  transmission?: string;
  color: string;
  image: string;
  location: string;
  body_type: string;
  gearbox?: string;
  engine_type: string; 
  car: string
  images?: {
    image: string[]; 
  };
}

export interface ApiResponse {
  data: Car[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
    per_page: number;
  };
}

export type SortOrder = 'asc' | 'desc' | null;

export interface FilterState {
  sortOrder: SortOrder;
  page: number;
}
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const limit = searchParams.get('_limit') || '12';
  const page = searchParams.get('_page') || '1';
  const sort = searchParams.get('_sort');
  const order = searchParams.get('_order');

  const apiUrl = new URL('https://testing-api.ru-rating.ru/cars');
  apiUrl.searchParams.set('_limit', limit);
  apiUrl.searchParams.set('_page', page);
  
  if (sort && order) {
    apiUrl.searchParams.set('_sort', sort);
    apiUrl.searchParams.set('_order', order);
  }

  try {
    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse = await response.json();
    
    const cars = apiResponse.data || [];
    const externalMeta = apiResponse.meta || {};
        
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    const totalCount = externalMeta.total || externalMeta.total_no_filters || cars.length;
    const totalPages = Math.ceil(totalCount / perPage);

    const result = {
      data: cars, 
      meta: {
        current_page: currentPage,
        total_pages: totalPages,
        total_count: totalCount,
        per_page: perPage,
      },
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}
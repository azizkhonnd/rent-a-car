'use client';

import Link from 'next/link';
import React from 'react';
import SortFilter from '../sort-filter';
import { useUrlState } from '@/app/hooks';
import { SortOrder } from '@/app/types/car';

const Header = () => {
    const { urlState, updateSort } = useUrlState();

    const handleSortChange = (sort: SortOrder) => {
        updateSort(sort);
    };

    return (
        <div className='container border-b-1 flex sm:flex-row justify-between items-center sm:items-center gap-4'>
                <div>
                    <Link href="/">
                        <h2 className='font-semibold text-3xl text-blue-500'>MORENT</h2>
                    </Link>
                </div>

                <div>
                    <SortFilter
                        currentSort={urlState.sort}
                        onSortChange={handleSortChange}
                    />
                </div>
        </div>
    );
};

export default Header;
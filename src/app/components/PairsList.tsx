import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NotFound from '@/app/components/NotFound';
import { fetchPairsByTitle } from '@/app/helpers/pairs';
import Loading from '@/app/components/Loading';
import { PairListResponse } from '@/app/types/pairs';

export default function PairsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<PairListResponse>();

  useEffect(() => {
    fetchPairsByTitle().then((response) => {
      setItems(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="card-title">Pairs</div>
      <div className="grid grid-cols-4 gap-5 mb-1">
        <div className="text-xs text-gray-600">Pair</div>
        <div className="text-xs text-gray-600">Last Price</div>
        <div className="text-xs text-gray-600">24h Change</div>
        <div className="text-xs text-gray-600">Volume</div>
      </div>
      <div className="space-y-1">
        {isLoading ? (
          <Loading />
        ) : items?.status === 'success' ? (
          items?.data?.map((item) => (
            <div key={item?._id} className="grid grid-cols-4 gap-5">
              <div>
                <Link href={'/trade/' + item?.key}>
                  <div className="text-default hover:text-gray-500">{item?.title}</div>
                </Link>
              </div>
              <div className="text-xs text-gray-400">-</div>
              <div className="text-xs text-green-700">+0.00%</div>
              <div className="text-xs text-gray-400">-</div>
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}

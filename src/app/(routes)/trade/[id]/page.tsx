'use client';
import OrderSendBuy from '@/app/components/forms/orderSendBuy';
import OrderSendSell from '@/app/components/forms/orderSendSell';
import Loading from '@/app/components/Loading';
import NotFound from '@/app/components/NotFound';
import OrderBook from '@/app/components/OrderBook';
import { selectPair, setPair } from '@/app/features/trade/tradeSlice';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPairsDetail } from '@/app/helpers/pairs';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const itemData = useSelector(selectPair);
  const itemId = useParams().id;

  useEffect(() => {
    fetchPairsDetail(itemId).then((response) => {
      dispatch(setPair(response));
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mx-auto items-center justify-items-center p-3 text-nowrap">
      {isLoading ? (
        <Loading />
      ) : itemData?.status === 'success' ? (
        <div className="flex flex-row gap-4">
          <div className="p-3 basis-1/4 border rounded  shadow-md border-zinc-800 bg-zinc-900">
            <OrderBook />
          </div>
          <div className="p-3 border rounded  shadow-md border-zinc-800 bg-zinc-900">
            <div className="text-xs text-gray-400 flex-1">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <OrderSendBuy />
                </div>
                <div>
                  <OrderSendSell />
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 basis-1/4 border rounded  shadow-md border-zinc-800 bg-zinc-900">
            <div>
              <div className="text-xs text-neutral-300 border-b border-b-zinc-800 pb-1 mb-2">
                Pairs
              </div>
              <div className="my-1 mb-2"></div>
            </div>
            <div>
              <div className="text-xs text-neutral-300 border-b border-b-zinc-800 pb-1 mb-2">
                Market Trades
              </div>
              <div className="my-1 mb-2"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex p-3 justify-center items-center border rounded  shadow-md border-zinc-800 bg-zinc-900">
          <NotFound />
        </div>
      )}
    </div>
  );
}

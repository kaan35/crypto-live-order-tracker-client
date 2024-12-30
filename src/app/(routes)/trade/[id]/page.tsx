'use client';
import OrderSendLimitBuy from '@/app/components/forms/OrderSendLimitBuy';
import OrderSendLimitSell from '@/app/components/forms/OrderSendLimitSell';
import Loading from '@/app/components/Loading';
import NotFound from '@/app/components/NotFound';
import OrderBook from '@/app/components/OrderBook';
import { selectPair, setPair } from '@/app/features/trade/tradeSlice';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPairsDetail } from '@/app/helpers/pairs';
import PairsList from '@/app/components/PairsList';
import OrderSendMarketBuy from '@/app/components/forms/OrderSendMarketBuy';
import OrderSendMarketSell from '@/app/components/forms/OrderSendMarketSell';
import MarketTrades from '@/app/components/MarketTrades';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [openTab, setOpenTab] = useState(1);
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
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="card basis-1/4">
            <OrderBook />
          </div>
          <div className="card">
            <div className="text-xs text-gray-400 flex-1">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-col sm:flex-row gap-4 sm:gap-2"
                role="tablist">
                <li className="flex-auto text-center">
                  <a
                    className={`tab-default ${openTab === 1 ? 'tab-active' : 'tab-inactive'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#"
                    role="tablist">
                    Limit
                  </a>
                </li>
                <li className="flex-auto text-center">
                  <a
                    className={`tab-default ${openTab === 2 ? 'tab-active' : 'tab-inactive'}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#"
                    role="tablist">
                    Market
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
                <div className="py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div className={openTab === 1 ? 'block' : 'hidden'} id="tab1">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                          <OrderSendLimitBuy />
                        </div>
                        <div>
                          <OrderSendLimitSell />
                        </div>
                      </div>
                    </div>
                    <div className={openTab === 2 ? 'block' : 'hidden'} id="tab2">
                      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                          <OrderSendMarketBuy />
                        </div>
                        <div>
                          <OrderSendMarketSell />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card basis-1/4">
            <div className="my-1 mb-2">
              <PairsList />
            </div>
            <div className="my-1 mb-2">
              <MarketTrades />
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <NotFound />
        </div>
      )}
    </div>
  );
}

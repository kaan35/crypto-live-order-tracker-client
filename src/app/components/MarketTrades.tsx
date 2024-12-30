import { SignalIcon, SignalSlashIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Order } from '@/app/types/orders';
import { useSelector } from 'react-redux';
import { selectPair } from '@/app/features/trade/tradeSlice';
import { Config } from '@/lib/config';
import Loading from '@/app/components/Loading';
import NotFound from '@/app/components/NotFound';
import { fetchOrdersMarket } from '@/app/helpers/orders';

export default function MarketTrades() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Order[]>([
    {
      _id: '',
      actionType: '',
      amount: '',
      insertDateTime: '',
      orderType: '',
      price: '',
      total: '',
    },
  ]);
  const itemData = useSelector(selectPair);
  const itemId = useParams().id;
  const socket = io(Config.socketUrl);

  useEffect(() => {
    fetchOrdersMarket(itemId).then((response) => {
      setItems(response?.data || []);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    if (socket.connected) {
      onConnect();
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    socket.on(`pair-${itemData?.data?.key}-order-market`, (data) => {
      setItems((prev: Order[]) => {
        if (prev.length >= 10) prev.pop();
        return [data, ...prev];
      });
    });
  }, []);

  return (
    <>
      <div className="card-title">
        <div className="flex flex-row justify-between items-center">
          Market Trades
          <div className="flex flex-row justify-between items-center gap-2">
            Connection :
            {isConnected && itemData?.status === 'success' ? (
              <SignalIcon className="size-5 text-green-500 animate-pulse" />
            ) : (
              <SignalSlashIcon className="size-5 text-red-500" />
            )}
          </div>
        </div>
      </div>
      <div className="my-1 mb-2">
        {isLoading ? (
          <Loading />
        ) : itemData?.status === 'success' ? (
          <div>
            <div className="grid grid-cols-3 gap-5 mb-1 pb-1">
              <div className="text-xs text-gray-600">
                Price ({itemData?.data?.titleSeparatedEnd})
              </div>
              <div className="text-xs text-gray-600">
                Amount ({itemData?.data?.titleSeparatedBegin})
              </div>
              <div className="text-xs text-gray-600">Time</div>
            </div>
            {items?.length > 0 ? (
              items?.map((item) => (
                <div key={item._id} className="grid grid-cols-3 gap-4">
                  <div
                    className={`text-xs ${item.actionType === 'buy' ? 'text-green-700' : ' text-red-700'}`}>
                    {item.price}
                  </div>
                  <div className="text-xs text-gray-400">{item.amount}</div>
                  <div className="text-xs text-gray-400">{item.insertDateTime.split(' ')[1]}</div>
                </div>
              ))
            ) : (
              <NotFound />
            )}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
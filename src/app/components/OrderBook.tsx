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
import { fetchOrders } from '@/app/helpers/orders';

export default function OrderBook() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ordersBuy, setOrdersBuy] = useState<Order[]>([
    { _id: '', amount: '', orderType: '', price: '', total: '' },
  ]);
  const [ordersSell, setOrdersSell] = useState<Order[]>([
    { _id: '', amount: '', orderType: '', price: '', total: '' },
  ]);
  const itemData = useSelector(selectPair);
  const itemId = useParams().id;
  const socket = io(Config.socketUrl);

  useEffect(() => {
    fetchOrders(itemId).then((response) => {
      setOrdersBuy(response?.data?.groups?.buy ? response?.data?.groups?.buy : []);
      setOrdersSell(response?.data?.groups?.sell ? response?.data?.groups?.sell : []);
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
    socket.on(`pair-${itemData?.data?.key}-order`, (data) => {
      if (data.orderType === 'buy') {
        setOrdersBuy((prev: Order[]) => {
          if (prev.length >= 10) prev.pop();
          return [data, ...prev];
        });
      }

      if (data.orderType === 'sell') {
        setOrdersSell((prev: Order[]) => {
          if (prev.length >= 10) prev.pop();
          return [data, ...prev];
        });
      }
    });
  }, []);

  return (
    <>
      <div className="text-xs text-neutral-300 border-b border-b-zinc-800 pb-1 mb-2">
        <div className="flex flex-row justify-between items-center">
          Order Book
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
            <div className="grid grid-cols-3 gap-5 mb-1">
              <div className="text-xs text-gray-600">
                Price ({itemData?.data?.titleSeparatedEnd})
              </div>
              <div className="text-xs text-gray-600">
                Amount ({itemData?.data?.titleSeparatedBegin})
              </div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            {ordersBuy?.map((item) => (
              <div key={item._id} className="grid grid-cols-3 gap-4">
                <div className="text-xs text-green-700">{item.price}</div>
                <div className="text-xs text-gray-400">{item.amount}</div>
                <div className="text-xs text-gray-400">{item.total}</div>
              </div>
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
      <div className="my-1 mb-2">
        {isLoading ? (
          <Loading />
        ) : itemData?.status === 'success' ? (
          <div>
            <div className="grid grid-cols-3 gap-5 mb-1">
              <div className="text-xs text-gray-600">
                Price ({itemData?.data?.titleSeparatedEnd})
              </div>
              <div className="text-xs text-gray-600">
                Amount ({itemData?.data?.titleSeparatedBegin})
              </div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            {ordersSell?.map((item) => (
              <div key={item._id} className="grid grid-cols-3 gap-4">
                <div className="text-xs text-red-700">{item.price}</div>
                <div className="text-xs text-gray-400">{item.amount}</div>
                <div className="text-xs text-gray-400">{item.total}</div>
              </div>
            ))}
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}

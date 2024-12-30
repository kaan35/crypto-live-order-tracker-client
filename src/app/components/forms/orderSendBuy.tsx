import { ArrowPathIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import {
  setNotificationMessage,
  setNotificationType,
  showNotification,
} from '@/app/features/notification/notificationSlice';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectPair } from '@/app/features/trade/tradeSlice';
import { sendOrder } from '@/app/helpers/orders';

export default function OrderSendBuy() {
  const dispatch = useDispatch();
  const itemData = useSelector(selectPair);
  const [formData, setFormData] = useState({
    amount: 0,
    isFormSending: false,
    price: 0,
    total: 0,
  });
  const itemTotal = formData?.price * formData?.amount;
  const itemId = useParams().id;

  const handleFormChange = (e: { target: { name: string; value: string } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let requestDataCheck = false;

    if (formData?.amount && formData?.price) {
      requestDataCheck = true;
    }

    if (!requestDataCheck) {
      dispatch(showNotification());
      dispatch(setNotificationType('failed'));
      dispatch(setNotificationMessage('Please fill required fields'));
    } else if (formData?.isFormSending) {
      dispatch(showNotification());
      dispatch(setNotificationType('failed'));
      dispatch(setNotificationMessage('Please wait'));
    } else {
      dispatch(showNotification());
      dispatch(setNotificationType('info'));
      dispatch(setNotificationMessage('Order sending'));
      setFormData({ ...formData, isFormSending: true });
      await sendOrder({
        amount: formData?.amount,
        orderType: 'buy',
        pairKey: itemId,
        price: formData?.price,
      }).then((response) => {
        setFormData({ ...formData, isFormSending: false });
        dispatch(showNotification());
        dispatch(setNotificationType(response.status));
        dispatch(setNotificationMessage(response.message));
      });
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="flex flex-row justify-between items-center pb-1">
        <div className="text-gray-300 text-lg">Buy</div>
        <div className="text-gray-300 text-xs">{itemData?.data?.titleSeparatedEnd}</div>
      </div>
      <div className="space-y-3">
        <div className="relative flex items-center mb-3">
          <div className="absolute inset-y-0 start-0 px-2 place-content-center">
            <div className="text-gray-600 hover:text-gray-700">Price</div>
          </div>
          <input
            className="input-column text-right pe:20"
            name="price"
            onChange={handleFormChange}
            step="0.000001"
            type="number"
          />
          <div className="absolute inset-y-0 end-0 px-2 place-content-center">
            <div className="text-gray-600 hover:text-gray-700">
              {itemData?.data?.titleSeparatedEnd}
            </div>
          </div>
        </div>
        <div className="relative flex items-center mb-3">
          <div className="absolute inset-y-0 start-0 px-2 place-content-center">
            <div className="text-gray-600 hover:text-gray-700">Amount</div>
          </div>
          <input
            className="input-column text-right pe:20"
            name="amount"
            onChange={handleFormChange}
            step="0.000001"
            type="number"
          />
          <div className="absolute inset-y-0 end-0 px-2 place-content-center">
            <div className="text-gray-600 hover:text-gray-700">
              {itemData?.data?.titleSeparatedBegin}
            </div>
          </div>
        </div>
        <div className="relative flex items-center mb-3">
          <div className="absolute inset-y-0 start-0 px-2 place-content-center">
            <div className="text-gray-600 hover:text-gray-700">Total</div>
          </div>
          <input
            className="input-column text-right pe:20"
            value={itemTotal}
            name="total"
            disabled
          />
          <div className="absolute inset-y-0 end-0 px-2 place-content-center">
            <div className="text-gray-600 hover:text-gray-700">
              {itemData?.data?.titleSeparatedEnd}
            </div>
          </div>
        </div>
        <button type="submit" disabled={formData.isFormSending} className="btn-success w-full">
          {formData.isFormSending ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <ArrowPathIcon className="size-4 animate-spin" />
              Order Sending
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              <PaperAirplaneIcon className="size-4" />
              Limit Buy {itemData?.data?.titleSeparatedBegin}
            </div>
          )}
        </button>
      </div>
    </form>
  );
}

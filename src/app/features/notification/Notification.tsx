'use client';

import {
  closeNotification,
  selectMessage,
  selectType,
  selectVisibility,
  setNotificationMessage,
  setNotificationType,
} from '@/app/features/notification/notificationSlice';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';

export function Notification() {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const type = useSelector(selectType);
  const visibility = useSelector(selectVisibility);
  let statusArea;

  if (type === 'success') {
    statusArea = (
      <div className="bg-green-200 rounded-full p-2">
        <CheckCircleIcon className="size-6 text-green-700" />
      </div>
    );
  } else if (type === 'info') {
    statusArea = (
      <div className="bg-blue-200 rounded-full p-2">
        <InformationCircleIcon className="size-6 text-sky-700" />
      </div>
    );
  } else {
    statusArea = (
      <div className="bg-red-200 rounded-full p-2">
        <ExclamationCircleIcon className="size-6 text-rose-700" />
      </div>
    );
  }

  if (visibility) {
    setTimeout(() => {
      dispatch(closeNotification());
      dispatch(setNotificationType(''));
      dispatch(setNotificationMessage(''));
    }, 5000);
  }

  return (
    <div className="flex fixed right-0 items-center justify-center w-full max-w-sm z-[100]">
      <div
        className={
          visibility ? 'opacity-100 transition-all duration-500 ease-in-out' : 'opacity-0 h-0'
        }>
        <div
          className={
            visibility ? 'bg-zinc-900 border mt-2 border-blue-500 rounded-lg shadow-lg p-5' : ''
          }>
          <div className="flex flex-row justify-around items-center gap-5">
            <div className={visibility ? 'flex-none items-center' : ''}>
              {visibility ? statusArea : ''}
            </div>
            <div className="flex flex-row justify-around items-center gap-5">
              <div className="text-default">{message}</div>
              <div>
                <button className="btn-outline p-1" onClick={() => dispatch(closeNotification())}>
                  <XMarkIcon className="h-6 w-6 text-gray-200" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

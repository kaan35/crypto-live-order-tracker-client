import { Config } from '@/lib/config';

export const fetchOrders = async (itemId: string | Array<string> | undefined) =>
  await fetch(`${Config.apiUrl}orders/${itemId}/group/type`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((response) => response);

export const sendOrder = async (data: object) =>
  await fetch(`${Config.apiUrl}orders`, {
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((result) => result.json())
    .then((response) => response);

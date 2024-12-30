import { Config } from '@/lib/config';

export const fetchOrdersLimit = async (itemId: string | Array<string> | undefined) =>
  await fetch(`${Config.apiUrl}orders/${itemId}/limit`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((response) => response);

export const fetchOrdersMarket = async (itemId: string | Array<string> | undefined) =>
  await fetch(`${Config.apiUrl}orders/${itemId}/market`, {
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

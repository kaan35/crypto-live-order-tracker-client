import { Config } from '@/lib/config';

export const fetchPairsDetail = async (itemId: string | Array<string> | undefined) =>
  await fetch(`${Config.apiUrl}pairs/key/${itemId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((response) => response);

export const fetchPairsByTitle = async () =>
  await fetch(`${Config.apiUrl}pairs/sort/title`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((response) => response);

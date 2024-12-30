export type Pair = {
  _id: string;
  key: string;
  title: string;
  titleSeparatedBegin: string;
  titleSeparatedEnd: string;
};

export type PairResponse = {
  data: Pair;
  status: string;
};

export type PairListResponse = {
  data: [Pair];
  status: string;
};

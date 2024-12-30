export type OrderItemData = {
  data: {
    key: string;
    titleSeparatedBegin: string;
    titleSeparatedEnd: string;
  };
  status: string;
};

export type OrderItem = {
  _id: string;
  amount: string;
  orderType: string;
  price: string;
  total: string;
};

export type OrderState = OrderItem[];

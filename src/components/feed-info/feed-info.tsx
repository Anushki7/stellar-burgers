import { FC, useEffect } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeedsThunk } from '../../services/slices/feed-info-slice';
import { useDispatch, useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const dispatch = useDispatch();

  //useEffect(() => {
  //dispatch(getFeedsThunk());
  //}, [dispatch]);

  const orders: TOrder[] = useSelector((state) => state.feedInfo.orders);
  const total = useSelector((state) => state.feedInfo.total);
  const totalToday = useSelector((state) => state.feedInfo.totalToday);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed = {
    total: total,
    totalToday: totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedsThunk,
  getOrdersFeeds
} from '../../services/slices/feed-info-slice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.feedInfo.loading);
  const orders = useSelector((state) => state.feedInfo.orders);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI
        orders={orders}
        handleGetFeeds={() => {
          dispatch(getFeedsThunk());
        }}
      />
      ;
    </>
  );
};

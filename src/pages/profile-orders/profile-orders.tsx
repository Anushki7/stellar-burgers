import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserOrderHistory } from '../../services/slices/order-slice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrderHistory());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(
    (state) => state.order.orderHistory || []
  );

  return <ProfileOrdersUI orders={orders} />;
};

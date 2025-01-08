import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';
import { v4 as uuidv4 } from 'uuid';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={uuidv4()} />
    ))}
  </div>
);

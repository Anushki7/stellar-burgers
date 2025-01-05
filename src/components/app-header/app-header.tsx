import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserSelector } from '../../services/slices/user-slice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(getUserSelector)?.name;
  return <AppHeaderUI userName={user} />;
};

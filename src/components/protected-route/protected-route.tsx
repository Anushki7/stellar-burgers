import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { TProtectedRouteProps } from './type';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  //доступ к защищенному маршруту
  isAuthOnly = false,
  children
}) => {
  const { isAuthChecked, user } = useSelector((state) => state.user);

  const location = useLocation();

  if (!isAuthChecked) {
    //проверка не завершена
    return <Preloader />;
  }

  if (isAuthOnly && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!isAuthOnly && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

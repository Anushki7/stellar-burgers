import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { useDispatch } from '../../services/store';
import {
  addBun,
  addIngredient
} from '../../services/slices/burger-constructor-slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> =
  memo<TBurgerIngredientProps>(({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const transformToConstructorIngredient = (
      ingredient: TIngredient
    ): TConstructorIngredient => ({
      ...ingredient,
      id: nanoid()
    });

    const handleAdd = () => {
      //обработчик при добавлении иегридиента в конструктор
      if (ingredient.type === 'bun') {
        //проверяем тип ингридиента
        dispatch(addBun(transformToConstructorIngredient(ingredient)));
        return;
      }
      dispatch(addIngredient(transformToConstructorIngredient(ingredient)));
    };

    return (
      <>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </>
    );
  });

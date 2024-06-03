import { useCallback, createContext, useContext, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM_TO_ORDER, AddItemToOrderResult } from '../graphql/mutations';
import useStateWithStorage from './useStateWithStorage';
import { QUANTITY } from '../utils/constants';

interface OrderState {
  quantity: number;
  subTotal: number;
}

const defaultValue: OrderState = {
  quantity: 0,
  subTotal: 0
}

interface OrderStateContextValue {
  order: OrderState;
  setOrder: React.Dispatch<React.SetStateAction<OrderState>>
}

interface OrderStateProviderProps {
  children: JSX.Element;
}

const OrderStateContext = createContext<OrderStateContextValue | null>(null);

export function OrderStateProvider({ children }: OrderStateProviderProps) {
  const [order, setOrder] = useStateWithStorage('orderState', defaultValue);
  const state = useMemo(() => ({ order, setOrder }), [order, setOrder]);

  return (
    <OrderStateContext.Provider value={state}>
      {children}
    </OrderStateContext.Provider>
  );
};

export default function useOrderState() {
  const [addItemToOrder] = useMutation<AddItemToOrderResult>(ADD_ITEM_TO_ORDER);
  const orderState = useContext(OrderStateContext);

  const addItem = useCallback(async (variantId: string) => {
    try {
      const { data } = await addItemToOrder({
        variables: {
          productVariantId: variantId,
          quantity: QUANTITY
        },
      });
      if (data?.addItemToOrder && data.addItemToOrder.subTotal && data.addItemToOrder.totalQuantity) {
        orderState?.setOrder({
          subTotal: data.addItemToOrder.subTotal,
          quantity: data.addItemToOrder.totalQuantity
        });
      }
    } catch (error) {
      console.error('Error adding item to order:', error);
    }
  }, [orderState, addItemToOrder]);

  return { order: orderState?.order, addItem };
};

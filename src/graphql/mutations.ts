import {gql } from '@apollo/client';

export interface AddItemToOrderResult {
  addItemToOrder: {
    subTotal: number;
    totalQuantity: number;
  }
};

export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
      ... on Order {
        subTotal
        totalQuantity
      }
    }
  }
`;
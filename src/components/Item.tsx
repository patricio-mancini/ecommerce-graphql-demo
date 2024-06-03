import { useCallback } from 'react';
import styled from 'styled-components';
import useOrderState from '../hooks/useOrderState';
import { priceFormatter } from '../utils/formatters';

interface ItemProps {
  name: string;
  previewSrc: string;
  previewName: string;
  description: string;
  price: number;
  variantId: string;
};

const Description = styled.p`
  font-size: 0.8em;
  margin-top: 0;
`;

const ItemContainer = styled.li`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  align-self: center;
`;

const Price = styled.p`
  margin-top: 0;
  font-size: 0.8em;
  font-weight: 600;
`;

const AddToCartButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #3f51b5;
  border-radius: 4px;
  color: #3f51b5;
  background-color: transparent;
  font-size: .9em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #3f51b5;
    color: white;
  }
`;

export default function Item({ name, previewSrc, previewName, description, price, variantId }: ItemProps) {
  const { addItem } = useOrderState();

  const AddToCartHandler = useCallback(async () => {
    addItem(variantId);
  }, [variantId, addItem]);

  return (
    <ItemContainer>
      <PreviewImage src={previewSrc} alt={previewName} />
      <h3>{name}</h3>
      <Description>{description}</Description>
      <Price>{priceFormatter.format(price)}</Price>
      <AddToCartButton onClick={AddToCartHandler}>Add to cart</AddToCartButton>
    </ItemContainer>
  );
};

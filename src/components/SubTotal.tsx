import styled from 'styled-components';
import useOrderState from '../hooks/useOrderState';
import { priceFormatter } from '../utils/formatters';

const SubTotalContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-weight: 600;
`;

const ShoppingCartIcon = styled.span`
  font-size: 20px;
  margin-left: .25rem;
`;

const StyledSubTotal = styled.span`
  font-weight: 700;
  margin-right: .25em;
  font-size: 0.9em;
`;

const Quantity = styled.span`
  font-size: 0.8em;
`;

export default function SubTotal() {
  const { order } = useOrderState();
  const qty = order?.quantity || 0;
  return (
    <SubTotalContainer>
      <StyledSubTotal>{priceFormatter.format(order?.subTotal || 0)}</StyledSubTotal>
      <Quantity>{qty > 0 && `(${qty} item${qty > 1 ? 's' : ''})`}</Quantity>
      <ShoppingCartIcon className='material-symbols-outlined'>shopping_cart</ShoppingCartIcon>
    </SubTotalContainer>
  );
};

import { render } from '@testing-library/react';
import SubTotal from './SubTotal';
import useOrderState from '../hooks/useOrderState';
import { priceFormatter } from '../utils/formatters';



jest.mock('../hooks/useOrderState', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('SubTotal', () => {
  it('renders only subTotal and no quantity when there is quantity 0 and subTotal 0', async () => {
    const mockOrder = {
      quantity: 0,
      subTotal: 0
    };
    (useOrderState as any).mockImplementationOnce(() => ({ order: mockOrder }));

    const { getByText, queryByText } = render(
      <SubTotal />
    );

    const formattedSubTotal = priceFormatter.format(mockOrder.subTotal);
    const expectedItemsText = `(${mockOrder.quantity} item)`;

    expect(getByText(formattedSubTotal)).toBeInTheDocument();
    expect(queryByText(expectedItemsText)).not.toBeInTheDocument();
  });
  it('renders subTotal and quantity for one item', async () => {
    const mockOrder = {
      quantity: 1,
      subTotal: 20
    };
    (useOrderState as any).mockImplementationOnce(() => ({ order: mockOrder }));

    const { getByText } = render(
      <SubTotal />
    );

    const formattedSubTotal = priceFormatter.format(mockOrder.subTotal);
    const expectedItemsText = `(${mockOrder.quantity} item)`;

    expect(getByText(formattedSubTotal)).toBeInTheDocument();
    expect(getByText(expectedItemsText)).toBeInTheDocument();
  });
  it('renders subTotal and quantity for more than one item', async () => {
    const mockOrder = {
      quantity: 2,
      subTotal: 50
    };
    (useOrderState as any).mockImplementationOnce(() => ({ order: mockOrder }));

    const { getByText } = render(
      <SubTotal />
    );

    const formattedSubTotal = priceFormatter.format(mockOrder.subTotal);
    const expectedItemsText = `(${mockOrder.quantity} items)`;

    expect(getByText(formattedSubTotal)).toBeInTheDocument();
    expect(getByText(expectedItemsText)).toBeInTheDocument();
  });
});
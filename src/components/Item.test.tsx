import { render, fireEvent } from '@testing-library/react';
import Item from './Item';
import useOrderState from '../hooks/useOrderState';
import { priceFormatter } from '../utils/formatters';

jest.mock('../hooks/useOrderState', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockItem = {
  name: 'Test Item',
  previewSrc: 'preview.jpg',
  previewName: 'Preview',
  description: 'Test description',
  price: 10,
  variantId: 'variant-123',
};

describe('Item', () => {
  it('renders all elements correctly', () => {
    (useOrderState as any).mockReturnValueOnce({ addItem: jest.fn() });
    const { getByText, getByAltText } = render(<Item {...mockItem} />);

    const formattedSubTotal = priceFormatter.format(mockItem.price);

    expect(getByText(mockItem.name)).toBeInTheDocument();
    expect(getByAltText(mockItem.previewName)).toBeInTheDocument();
    expect(getByText(mockItem.description)).toBeInTheDocument();
    expect(getByText(formattedSubTotal)).toBeInTheDocument();
    expect(getByText('Add to cart')).toBeInTheDocument();
  });

  it('calls useOrderState with correct variantId when Add to cart button is clicked', () => {
    const mockAddItem = jest.fn();
    (useOrderState as any).mockReturnValueOnce({ addItem: mockAddItem });
    const { getByText } = render(<Item {...mockItem} />);
    const addToCartButton = getByText('Add to cart');

    fireEvent.click(addToCartButton);

    expect(useOrderState).toHaveBeenCalled();
    expect(mockAddItem.mock.calls[0][0]).toEqual(mockItem.variantId);
  });
});

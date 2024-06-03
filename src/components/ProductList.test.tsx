import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import { ProductList } from './ProductList';
import { GET_PRODUCTS } from '../graphql/queries';
import { LOADING_ERROR, NUMBER_OF_PRODUCTS } from '../utils/constants';
import { priceFormatter } from '../utils/formatters';

const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    featuredAsset: {
      preview: 'preview-url-1',
      name: 'Preview 1'
    },
    description: 'Description 1',
    variants: [
      {
        price: 10,
        id: 'variant-1'
      }
    ]
  },
  {
    id: '2',
    name: 'Product 2',
    featuredAsset: {
      preview: 'preview-url-2',
      name: 'Preview 2'
    },
    description: 'Description 2',
    variants: [
      {
        price: 20,
        id: 'variant-2'
      }
    ]
  }
];

describe('ProductList', () => {
  it('renders loading state', async () => {
    const mocks = [
      {
        delay: Infinity,
        request: {
          query: GET_PRODUCTS,
          variables: {
            take: NUMBER_OF_PRODUCTS
          }
        }
      }
    ];

    const { getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error message', async () => {
    const mocks = [
      {
        request: {
          query: GET_PRODUCTS,
          variables: {
            take: NUMBER_OF_PRODUCTS
          }
        },
        error: new Error("An error occurred")
      }
    ];

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    expect(await findByText(LOADING_ERROR)).toBeInTheDocument();
  });

  it('renders products', async () => {
    const mocks = [
      {
        request: {
          query: GET_PRODUCTS,
          variables: {
            take: NUMBER_OF_PRODUCTS
          }
        },
        result: {
          data: {
            products: {
              items: mockProducts
            }
          }
        }
      }
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    await waitFor(() => {
      mockProducts.forEach(product => {
        expect(getByText(product.name)).toBeInTheDocument();
        expect(getByText(product.description)).toBeInTheDocument();
        expect(getByText(priceFormatter.format(product.variants[0].price))).toBeInTheDocument();
      });
    });

  });
});

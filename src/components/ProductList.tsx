import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Item from './Item';
import { GET_PRODUCTS } from '../graphql/queries';
import { LOADING_ERROR, NUMBER_OF_PRODUCTS } from '../utils/constants';

interface ItemInterface {
  name: string;
  featuredAsset: {
    preview: string;
    name: string;
  };
  description: string;
  variants: [{
    price: number;
    id: string;
  }]
};

const StyledGridContainer = styled.div`
  padding: 1em 3em;
`;

const StyledGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2em;
`;

const LoadingOrErrorLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      take: NUMBER_OF_PRODUCTS
    }
  });

  if (loading || error) {
    return (
      <LoadingOrErrorLayout>
        {loading && <CircularProgress />}
        {error && <div>{LOADING_ERROR}</div>}
      </LoadingOrErrorLayout>
    );
  };

  const items: ItemInterface[] = data.products.items;

  return (
    <StyledGridContainer>
      <StyledGrid>
        {
          items.map(item => (
            <Item
              key={item.variants[0].id}
              name={item.name}
              previewSrc={item.featuredAsset.preview}
              previewName={item.featuredAsset.name}
              description={item.description}
              price={item.variants[0].price}
              variantId={item.variants[0].id}
            />
          ))
        }
      </StyledGrid>
    </StyledGridContainer>
  );
};

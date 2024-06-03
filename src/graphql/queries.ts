import {gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($take: Int!) {
    products(options: { take: $take }) {
      items {
        name
        description
        featuredAsset {
          name
          preview
        }
        variants {
          id
          price
        }
      }
    }
  }
`;
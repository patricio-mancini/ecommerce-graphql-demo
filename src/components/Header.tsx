import styled from 'styled-components';
import SubTotal from './SubTotal';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  background: red;
  height: 6rem;
  display: flex;
  align-items: center;
  padding: 0 3rem;
`;

const Logo = styled.img`
  height: 50px;
`;

const Heading = styled.h1`
  font-size: 2.75rem;
  color: white;
`;

export function Header() {
  return (
    <StyledHeader>
      <Heading>E-Commerce</Heading>
      <SubTotal />
    </StyledHeader>
  );
};

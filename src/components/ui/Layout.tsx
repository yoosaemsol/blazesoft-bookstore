import { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <Container>{children}</Container>;
}

const Container = styled.section`
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
`;

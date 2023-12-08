import { ReactNode } from 'react';
import styled from 'styled-components';

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 52px 40px;
`;

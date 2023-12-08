import { ReactNode } from 'react';
import styled from 'styled-components';

interface LabelProps {
  children: ReactNode;
}

export default function Label({ children }: LabelProps) {
  return <LabelComponent>{children}</LabelComponent>;
}

const LabelComponent = styled.div`
  padding: 4px;
  background-color: var(--color-light-level1);
  border-radius: 2px;
  font-size: 13px;
  font-weight: 600;
`;

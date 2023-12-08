import { ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ children, onClick }: ButtonProps) {
  return <ButtonComponent onClick={onClick}>{children}</ButtonComponent>;
}

const ButtonComponent = styled.button`
  padding: 7px 12px;
  background-color: var(--color-primary);
  border: none;
  border-radius: 6px;
  color: var(--color-light-level0);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-active);
  }
`;

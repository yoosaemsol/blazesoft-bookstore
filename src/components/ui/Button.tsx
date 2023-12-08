import { ReactNode, MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  layoutVariant?: 'contained' | 'outlined';
  variant?: 'primary' | 'accent';
  size?: 'medium' | 'large';
}

interface ButtonStyleProps {
  $layoutVariant: 'contained' | 'outlined';
  $variant: 'primary' | 'accent';
  $size?: 'medium' | 'large';
}

export default function Button({
  children,
  onClick,
  layoutVariant = 'contained',
  variant = 'primary',
  size = 'medium',
}: ButtonProps) {
  return (
    <ButtonComponent
      $layoutVariant={layoutVariant}
      $variant={variant}
      $size={size}
      onClick={onClick}
    >
      {children}
    </ButtonComponent>
  );
}

const getColorVaribale = (variant: 'primary' | 'accent') => {
  switch (variant) {
    case 'primary':
      return 'var(--color-primary)';
    case 'accent':
      return 'var(--color-accent)';
    default:
      return '';
  }
};

const ButtonComponent = styled.button<ButtonStyleProps>`
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

  ${({ $variant }) =>
    `
    background-color: ${getColorVaribale($variant)};
    border: 1px solid;
    color : var(--color-light-level0);
    border-color :${getColorVaribale($variant)};

      &:hover {
        border-color :  ${getColorVaribale($variant)};
        background-color : inherit;
        color: ${getColorVaribale($variant)};
      }
  `}

  ${({ $layoutVariant, $variant }) =>
    $layoutVariant === 'outlined' &&
    `
    background-color: inherit;
    border: 1px solid;
    border-color: ${getColorVaribale($variant)};
    color : ${getColorVaribale($variant)};

      &:hover {
        border-color :  ${getColorVaribale($variant)};
        background-color: ${getColorVaribale($variant)};
        color: var(--color-light-level0);
      }
  `}

${({ $size }) =>
    $size === 'large' &&
    `
  font-size: 16px;
  padding: 7px 20px;
  `}
`;

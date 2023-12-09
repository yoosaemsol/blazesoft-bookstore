import styled, { keyframes } from 'styled-components';
import { flexbox } from 'styles/utils';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  ${flexbox()};
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const Spinner = styled.div<{ size?: string }>`
  display: inline-block;
  width: ${(props) => (props?.size ? props.size : '24px')};
  height: ${(props) => (props?.size ? props.size : '24px')};
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid var(--color-accent);
  animation: ${spinAnimation} 1s linear infinite;
`;

interface LoadingSpinnerProps {
  size?: string;
}

const LoadingSpinner = ({ size }: LoadingSpinnerProps) => {
  return (
    <SpinnerContainer>
      <Spinner size={size} />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

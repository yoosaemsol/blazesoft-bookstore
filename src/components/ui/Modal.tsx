import { ReactNode } from 'react';

import styled, { keyframes } from 'styled-components';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <>
      <Overlay onClick={() => onClose()} />
      <ModalComponent>{children}</ModalComponent>
    </>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
  opacity: 0;
  animation: ${fadeIn} 0.3s; /* fadeIn 애니메이션을 1초 동안 적용합니다. */
  animation-fill-mode: forwards; /* 애니메이션 종료 시 마지막 스타일 유지 */
`;

const ModalComponent = styled.div`
  width: 800px;
  height: 700px;
  padding: 70px 60px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  border-radius: 20px;
  background-color: var(--color-light-level0);
  z-index: 99999999;
  box-shadow: 10px 10px 80px 0px rgba(0, 0, 0, 0.2);
`;

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const modalElement = document.getElementById('modal')!;

export function Portal({ children }: PortalProps) {
  return createPortal(<>{children}</>, modalElement);
}

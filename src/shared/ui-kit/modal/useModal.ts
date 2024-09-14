import { useCallback, useEffect, useState } from 'react';

export function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeydown);
    }

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isOpen, closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
  };
}

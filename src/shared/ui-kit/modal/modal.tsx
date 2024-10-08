import styles from './modal.module.scss';
import cnBind from 'classnames/bind';
import { MouseEvent, ReactNode } from 'react';
import { Button } from '../button/button.tsx';
import { Icon } from '../icon/icon.tsx';
import { Portal } from '../portal/portal.tsx';

const cx = cnBind.bind(styles);

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

export function Modal({ children, isOpen, closeModal }: ModalProps) {
  const handleOverlayClick = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  const handleCloseButton = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    closeModal();
  };

  return (
    <Portal>
      <div className={cx('modal', { 'modal--active': isOpen })}>
        <div className={cx('modal__overlay')} onClick={handleOverlayClick}>
          <div className={cx('modal__content')}>
            <div className={cx('modal__control')}>
              <Button className={cx('modal__button-close')} onClick={handleCloseButton}>
                <Icon className={cx('modal__icon-close')} iconType={'cross'} />
              </Button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

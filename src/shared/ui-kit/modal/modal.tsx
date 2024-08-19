import styles from './modal.module.scss';
import cnBind from 'classnames/bind';
import { MouseEvent, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/redux/reduxHooks.ts';
import { closeModal, selectIsOpen } from './model/modalSlice.ts';

const cx = cnBind.bind(styles);

interface ModalProps {
  children: ReactNode;
}

export function ModalLayout({ children }: ModalProps) {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  const handleOverlayClick = (evt: MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) {
      dispatch(closeModal());
    }
  };

  return (
    <div className={cx('modal', { 'modal--active': isOpen })}>
      <div className={cx('modal__overlay')} onClick={handleOverlayClick}>
        <div className={cx('modal__content')}>{children}</div>
      </div>
    </div>
  );
}

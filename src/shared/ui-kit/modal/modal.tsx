import styles from './modal.module.scss';
import cnBind from 'classnames/bind';
import { ReactNode, useState } from 'react';

const cx = cnBind.bind(styles);

interface ModalProps {
  children: ReactNode;
}

export function ModalLayout({ children }: ModalProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={cx('overlay')}>
      <div className={cx('modal')}>{children}</div>
    </div>
  );
}

import styles from './icon.module.scss';
import cnBind from 'classnames/bind';
import { IconType, iconTypes } from './iconType.tsx';
import { ReactNode } from 'react';

const cx = cnBind.bind(styles);

export interface IconProps {
  className?: string;
  iconType: IconType;
  onClick?: () => void;
}

const getIcon = (type: IconType): ReactNode => iconTypes.get(type);

export function Icon({ className, iconType, onClick }: IconProps) {
  return (
    <div className={cx('icon', className)} onClick={onClick}>
      {getIcon(iconType)}
    </div>
  );
}

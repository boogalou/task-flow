import styles from './nav-actions.module.scss';
import cnBind from 'classnames/bind';
import { IconType } from '../../shared/ui-kit/icon/iconType.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { useState } from 'react';
import { useAppDispatch } from '../../app/redux/reduxHooks.ts';
import { taskFiltering } from '../task/model/taskSlice.ts';

const cx = cnBind.bind(styles);

interface ButtonData {
  id: number;
  label: string;
  action: string;
  iconType: IconType;
}

const buttonsData: ButtonData[] = [
  { id: 1, label: 'Completed', iconType: 'success', action: 'completed' },
  { id: 2, label: 'Trash', iconType: 'trash-bin', action: 'trash' },
];

export function NavActions() {
  const dispatch = useAppDispatch();
  const [buttonIsPressed, setButtonIsPressed] = useState<null | number>(null);

  const handleOnClick = (id: number, action: string) => {
    setButtonIsPressed(id);
    dispatch(taskFiltering(action));
  };

  return (
    <div className={cx('nav-actions')}>
      {buttonsData.map((it) => (
        <Button
          className={cx('nav-actions__button', {
            'nav-actions__button--pressed': it.id === buttonIsPressed,
          })}
          onClick={() => handleOnClick(it.id, it.action)}
          key={it.id}
        >
          {<Icon className={cx('nav-actions__icon')} iconType={it.iconType} />}
          {it.label}
        </Button>
      ))}
    </div>
  );
}

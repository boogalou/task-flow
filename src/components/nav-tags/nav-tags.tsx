import styles from './nav-tags.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { useState } from 'react';

const cx = cnBind.bind(styles);

type ButtonsData = {
  id: number;
  label: string;
};

const tags: ButtonsData[] = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Work' },
  { id: 3, label: 'Education' },
];

export function NavTags() {
  const [buttonIsPressed, setButtonIsPressed] = useState<null | number>(null);

  const handleOnClick = (id: number) => {
    setButtonIsPressed(id);
  };

  return (
    <div className={cx('nav-tags')}>
      <div className={cx('nav-tags__action')}>
        <h3 className={cx('nav-tags__title')}>My List</h3>
        <Button className={cx('nav-tags__button--add')} icon={<Icon iconType={'cross'} />} />
      </div>
      {tags.map((it) => (
        <Button
          className={cx('nav-tags__button', {
            'nav-tags__button--pressed': it.id === buttonIsPressed,
          })}
          onClick={() => handleOnClick(it.id)}
          key={it.id}
        >
          {it.label}
        </Button>
      ))}
    </div>
  );
}

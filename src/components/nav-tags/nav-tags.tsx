import styles from './nav-tags.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { useState } from 'react';
import { useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectCategories } from '../task/model/taskSlice.ts';

const cx = cnBind.bind(styles);

type ButtonsData = {
  id: number;
  label: string;
};

export function NavTags() {
  const categories = useAppSelector(selectCategories);
  const [buttonIsPressed, setButtonIsPressed] = useState<null | number>(null);
  const handleOnClick = (id: number) => {
    setButtonIsPressed(id);
  };
  const categoriesButton: ButtonsData[] = categories.map((it, index) => ({
    id: index + 1,
    label: it,
  }));

  return (
    <div className={cx('nav-tags')}>
      <div className={cx('nav-tags__action')}>
        <h3 className={cx('nav-tags__title')}>My List</h3>
        <Button className={cx('nav-tags__button--add')}>
          <Icon iconType={'cross'} />
        </Button>
      </div>
      {categoriesButton.map((it) => (
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

import styles from './nav-tags.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../shared/ui-kit/button/button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/redux/reduxHooks.ts';
import { selectCategories, setCriteriaFilter } from '../task/model/taskSlice.ts';

const cx = cnBind.bind(styles);

type ButtonsData = {
  id: number;
  label: string;
};

export function NavTags() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [activeButton, setActiveButton] = useState<null | number>(null);

  const handleOnClick = (id: number, label: string) => {
    if (activeButton === id) {
      setActiveButton(null);
      dispatch(setCriteriaFilter({ category: null }));
    } else {
      setActiveButton(id);
      dispatch(setCriteriaFilter({ category: label }));
    }
  };

  const categoriesButton: ButtonsData[] = categories.map((it, index) => ({
    id: index + 1,
    label: it,
  }));

  return (
    <div className={cx('nav-tags')}>
      <Button className={cx('nav-tags__button--add')}>
        <span>My List</span>
        <Icon iconType={'cross'} />
      </Button>

      {categoriesButton.map((it) => (
        <Button
          className={cx('nav-tags__button', {
            'nav-tags__button--pressed': it.id === activeButton,
          })}
          variant="primary"
          onClick={() => handleOnClick(it.id, it.label)}
          key={it.id}
        >
          {it.label}
        </Button>
      ))}
    </div>
  );
}

//TODO: refactoring

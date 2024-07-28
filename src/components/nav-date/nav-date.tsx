import styles from './nav-date.module.scss';
import cnBind from 'classnames/bind';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { IconType } from '../../shared/ui-kit/icon/iconType.tsx';
import { useEffect, useState } from 'react';
import { routes } from '../../shared/routes/routes.ts';
import { Link, useNavigate } from 'react-router-dom';

const cx = cnBind.bind(styles);

interface ButtonsData {
  id: number;
  label: string;
  iconType: IconType;
  link: string;
}

const buttonsData: ButtonsData[] = [
  { id: 1, label: 'Today', iconType: 'calendar-one', link: routes.TODAY_PAGE },
  { id: 2, label: 'Next 7 Days', iconType: 'calendar-seven', link: routes.WEEK_PAGE },
  { id: 3, label: 'All', iconType: 'calendar-all', link: routes.ALL_PAGE },
];

const countTasks = 42;

export function NavDate() {
  const navigate = useNavigate();

  const [buttonIsPressed, setButtonIsPressed] = useState(1);
  const handleOnClick = (id: number) => {
    setButtonIsPressed(id);
  };

  useEffect(() => {
    if (buttonIsPressed === 1) {
      navigate(routes.TODAY_PAGE);
    }
  }, []);

  return (
    <div className={cx('nav-date')}>
      {buttonsData.map((it) => (
        <Link to={it.link} key={it.id} className={cx('nav-date__link')}>
          <Button
            className={cx('nav-date__button', {
              'nav-date__button--pressed': it.id === buttonIsPressed,
            })}
            onClick={() => handleOnClick(it.id)}
          >
            <div className={cx('nav-date__wrapper')}>
              <Icon className={cx('nav-date__icon')} iconType={it.iconType} />
              <span className={cx('nav-date__button-label')}>{it.label}</span>
            </div>
            <span className={cx('nav-date__counter')}>{countTasks}</span>
          </Button>
        </Link>
      ))}
    </div>
  );
}

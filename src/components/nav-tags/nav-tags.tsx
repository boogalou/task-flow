import styles from './nav-tags.module.scss';
import cnBind from 'classnames/bind';
import { Button } from '../../shared/ui-kit/button/Button.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';

const cx = cnBind.bind(styles);

const tags: string[] = ['Personal', 'Work', 'Education'];

export function NavTags() {
  return (
    <div className={cx('nav-tags')}>
      <div className={cx('nav-tags__action')}>
        <h3 className={cx('nav-tags__title')}>My List</h3>
        <Button className={cx('nav-tags__button--add')} icon={<Icon iconType={'cross'} />} />
      </div>
      {tags.map((it) => (
        <Button className={cx('nav-tags__button')} key={it}>
          {it}
        </Button>
      ))}
    </div>
  );
}

import { ChangeEvent, useRef, useState } from 'react';
import styles from './search.module.scss';
import cnBind from 'classnames/bind';
import Input from 'shared/ui-kit/input/input.tsx';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { useAppDispatch, useAppSelector } from 'shared/lib/reduxHooks.ts';
import { selectFilter, setCriteriaFilter } from 'entities/task/model/taskSlice.ts';

const cx = cnBind.bind(styles);

export function Search() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilter);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleOnClick = () => {
    setIsInputVisible(true);
    inputRef.current?.focus();
  };

  const onBlur = () => {
    setIsInputVisible(false);
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setCriteriaFilter({ searchQuery: evt.target.value }));
  };

  return (
    <div className={cx('search')}>
      <Input
        classNameInput={cx('search__input', { 'search__input--visible': isInputVisible })}
        id="search"
        type="text"
        name="search"
        placeholder="Search"
        value={filters.searchQuery}
        onChange={handleOnChange}
        onBlur={onBlur}
        ref={inputRef}
      />
      <div className={cx('search__icon')}>
        <Icon iconType={'search'} onClick={handleOnClick} />
      </div>
    </div>
  );
}

import { ChangeEvent, useRef, useState } from 'react';
import styles from './search.module.scss';
import cnBind from 'classnames/bind';
import Input from '../../shared/ui-kit/input/input.tsx';
import { Icon } from '../../shared/ui-kit/icon/icon.tsx';

const cx = cnBind.bind(styles);

export function Search() {
  // const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleOnClick = () => {
    setIsInputVisible(true);
    inputRef.current?.focus();
  };

  const onBlur = () => {
    setIsInputVisible(false);
    setSearchTerm('');
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <div className={cx('search')}>
      <Input
        classNameInput={cx('search__input', { 'search__input--visible': isInputVisible })}
        id="search"
        type="text"
        name="search"
        placeholder="Search"
        value={searchTerm}
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

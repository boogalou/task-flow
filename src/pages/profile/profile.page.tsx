import style from './profile-page.module.scss';
import cnBind from 'classnames/bind';
import { updateUserRequest, userSelector } from 'entities/user';
import { ChangeEvent, useState } from 'react';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { Modal } from 'shared/ui-kit/modal/modal.tsx';
import { useModal } from 'shared/ui-kit/modal/useModal.ts';
import Input from 'shared/ui-kit/input/input.tsx';
import { UserUpdate } from 'shared/types/types.ts';
import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { ProfileAvatar } from 'features/user/update-avatar/profile-avatar.tsx';

const cx = cnBind.bind(style);

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = userSelector();
  const { isOpen, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState({} as UserUpdate);
  const [currentValue, setCurrentValue] = useState('');
  const [currentField, setCurrentField] = useState('');

  const handleFieldClick = (field: string, value: string) => {
    setCurrentField(field);
    setCurrentValue(value);
    openModal();
  };

  const handleSave = () => {
    setFormData((prevState) => ({
      ...prevState,
      [currentField]: currentValue,
    }));
    closeModal();
  };

  const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(evt.target.value);
  };

  const handleSubmit = () => {
    console.log(formData);
    dispatch(updateUserRequest(formData));
  };

  return (
    <>
      <div className={cx('profile')}>
        <ProfileAvatar avatarUrl={user?.userPic} />

        <div className={cx('profile__form')}>
          <div
            className={cx('profile__form-field')}
            onClick={() => handleFieldClick('username', user!.username)}
          >
            {formData.username || user?.username || 'Username'}
          </div>

          <div
            className={cx('profile__form-field')}
            onClick={() => handleFieldClick('email', user!.email)}
          >
            {formData.email || user?.email || 'Email'}
          </div>
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </div>
        <Icon iconType="camera" />
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className={cx('popup')}>
          <Input type="text" value={currentValue} onChange={handleOnChange} />
          <div className={cx('popup__controls')}>
            <Button variant="primary">Cancel</Button>
            <Button variant="primary" onClick={handleSave}>
              Svae
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

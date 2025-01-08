import styles from './profile-avatar.module.scss';
import cnBind from 'classnames/bind';
import { Avatar } from 'shared/ui-kit/avatar/avatar.tsx';
import { Icon } from 'shared/ui-kit/icon/icon.tsx';
import { ChangeEvent, useState } from 'react';
import { CropAvatar } from 'features/user/crop-avatar/crop-avatar.tsx';

const cx = cnBind.bind(styles);

interface ProfileAvatarProps {
  avatarUrl?: string;
}

export function ProfileAvatar({ avatarUrl }: ProfileAvatarProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    if (files && files[0]) {
      setSelectedFile(URL.createObjectURL(files[0]));
    }

    evt.target.value = '';
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <div className={cx('avatar')}>
        <Avatar className={cx('avatar__img')} avatarUrl={avatarUrl}>
          <label className={cx('avatar__icon-overlay')}>
            <input
              className={cx('avatar__input')}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Icon className={cx('avatar__icon')} iconType={'camera'} />
          </label>
        </Avatar>
      </div>
      {selectedFile ? (
        <CropAvatar imageSrc={selectedFile!} clearSelectedFile={clearSelectedFile} />
      ) : null}
    </>
  );
}

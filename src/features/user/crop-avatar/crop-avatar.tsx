import styles from './crop-avatar.module.scss';
import cnBind from 'classnames/bind';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useCallback, useState } from 'react';
import { Button } from 'shared/ui-kit/button/button.tsx';
import { getCroppedImage } from 'shared/lib/getCroppedImage.ts';
import { useAppDispatch } from 'shared/lib/reduxHooks.ts';
import { userSelector } from 'entities/user';
import { updateUserAvatarRequest } from 'entities/user/model/update-avatar.thunk.ts';

const cx = cnBind.bind(styles);

interface CropAvatarProps {
  imageSrc: string;
  clearSelectedFile: () => void;
}

export function CropAvatar({ imageSrc, clearSelectedFile }: CropAvatarProps) {
  const dispatch = useAppDispatch();
  const user = userSelector()!;
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedAreaPixels: Area) => {
    setCropArea(croppedAreaPixels);
  }, []);

  const handleAccept = async () => {
    if (imageSrc && cropArea) {
      const file = await getCroppedImage(imageSrc, cropArea);
      dispatch(updateUserAvatarRequest({ id: user.id, avatarImg: file }));
      clearSelectedFile();
      console.log(file);
    }
  };

  const handleCancel = () => {
    clearSelectedFile();
  };

  return (
    <div className={cx('cropper')}>
      <div className={cx('cropper__content')}>
        <Cropper
          classes={{ containerClassName: cx('crop-container') }}
          cropShape="round"
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className={cx('cropper__footer')}>
        <div className={cx('cropper__controls')}>
          <div className={cx('cropper__slider-wrapper')}></div>

          <div className={cx('cropper__buttons')}>
            <Button
              className={cx('cropper__button', 'cropper__button--cancel')}
              variant="primary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className={cx('cropper__button', 'cropper__button--accept')}
              variant="primary"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from './colorpicker.module.scss';
import cnBind from 'classnames/bind';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

const cx = cnBind.bind(styles);

const buttonData = [
  { id: nanoid(), color: '#E68EA6', colorName: '' },
  { id: nanoid(), color: '#E5A96D', colorName: '' },
  { id: nanoid(), color: '#DED882', colorName: '' },
  { id: nanoid(), color: '#C6E3A0', colorName: '' },
  { id: nanoid(), color: '#AACBA4', colorName: '' },
  { id: nanoid(), color: '#82BFD0', colorName: '' },
  { id: nanoid(), color: '#9ABEE2', colorName: '' },
  { id: nanoid(), color: '#B7A6D5', colorName: '' },
  { id: nanoid(), color: '#D7BFD7', colorName: '' },
  { id: nanoid(), color: '#D9CCB0', colorName: '' },
  { id: nanoid(), color: '#E9E9E9', colorName: '' },
];

interface ColorpickerProps {
  onClick: (color: string) => void;
  currentColor: string;
}

export function Colorpicker({ onClick, currentColor }: ColorpickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>(currentColor);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onClick(color);
  };

  return (
    <div className={cx('colorpicker')}>
      {buttonData.map((btn) => (
        <button
          className={cx('colorpicker__button', {
            'colorpicker__button--selected': btn.color === selectedColor,
          })}
          onClick={() => handleColorSelect(btn.color)}
          type="button"
          key={btn.id}
          style={{ backgroundColor: `${btn.color}` }}
        />
      ))}
    </div>
  );
}

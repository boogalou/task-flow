import styles from './colorpicker.module.scss';
import cnBind from 'classnames/bind';
import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

const cx = cnBind.bind(styles);

const buttonData = [
  { id: nanoid(), color: '#faafa9', colorName: '' },
  { id: nanoid(), color: '#f29f75', colorName: '' },
  { id: nanoid(), color: '#fff8b8', colorName: '' },
  { id: nanoid(), color: '#e2f6d3', colorName: '' },
  { id: nanoid(), color: '#b4ded3', colorName: '' },
  { id: nanoid(), color: '#d3e4ec', colorName: '' },
  { id: nanoid(), color: '#afccdc', colorName: '' },
  { id: nanoid(), color: '#d3bedb', colorName: '' },
  { id: nanoid(), color: '#f5e2dc', colorName: '' },
  { id: nanoid(), color: '#e9e3d3', colorName: '' },
  { id: nanoid(), color: '#efeff1', colorName: '' },
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

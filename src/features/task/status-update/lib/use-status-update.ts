import { ChangeEvent, MouseEvent } from 'react';
import { updateTaskRequest } from 'entities/task';
import { useAppDispatch } from 'shared/lib/reduxHooks.ts';

export function useStatusUpdate(id: number) {
  const dispatch = useAppDispatch();

  const handleOnChangeCheckBox = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTaskRequest({
        id: id,
        isCompleted: evt.target.checked,
      }),
    );
  };

  const handleClickOnCheckbox = (evt: MouseEvent<HTMLDivElement>) => {
    evt.stopPropagation();
  };

  return {
    handleClickOnCheckbox,
    handleOnChangeCheckBox,
  };
}

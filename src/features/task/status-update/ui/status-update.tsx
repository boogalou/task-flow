import { CustomInput } from 'shared/ui-kit/checkbox/customInput.tsx';
import { useStatusUpdate } from 'features/task/status-update/lib/use-status-update.ts';

interface StatusUpdateProps {
  id: number;
  isCompleted: boolean;
}

export function StatusUpdate({ id, isCompleted }: StatusUpdateProps) {
  const { handleOnChangeCheckBox, handleClickOnCheckbox } = useStatusUpdate(id);

  return (
    <div onClick={handleClickOnCheckbox}>
      <CustomInput
        id={id.toString()}
        type="checkbox"
        onChange={handleOnChangeCheckBox}
        checked={isCompleted}
      />
    </div>
  );
}

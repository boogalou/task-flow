import { Button } from 'shared/ui-kit/button/button.tsx';
import { useSaveSettings } from 'features/settings/save-settings/use-save-settings.ts';

export function SaveSettings() {
  const { handleSaveButton } = useSaveSettings();

  return (
    <Button className="button--primary" onClick={handleSaveButton}>
      Save
    </Button>
  );
}

import { Toaster } from 'react-hot-toast';

export function Notificaion() {
  return (
    <Toaster
      position={'bottom-right'}
      toastOptions={{
        duration: 3500,
      }}
    />
  );
}

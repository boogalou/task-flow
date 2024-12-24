import { JSX } from 'react';
import { DataLoadProvider } from 'app/providers/dataLoadProvider/data-load.provider.tsx';

export const withDataLoadProvider = (component: () => JSX.Element) => () => (
  <DataLoadProvider>{component()}</DataLoadProvider>
);

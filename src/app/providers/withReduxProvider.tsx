import { Provider } from 'react-redux';
import { store } from '../store/store.ts';

export const withReduxProvider = (component: () => JSX.Element) => () => (
  <Provider store={store}>{component()}</Provider>
);

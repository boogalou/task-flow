import { createLogger } from 'redux-logger';

export const reduxLogger = createLogger({
  duration: true,
  collapsed: true,
  colors: {
    title: (action): string => (action.error ? 'firebrick' : '#458588'),
    prevState: (): string => '#fabd2f',
    action: (): string => '#83a598',
    nextState: (): string => '#d3869b',
    error: (): string => '#ff0005',
  },
});
import { withHook, useObservable } from '../src';
import * as rx from 'rxjs';

type TestProps = {
  content: string;
};
const Test = (props: TestProps) => <div></div>;

const content$ = rx.of('content');

// Adds a custom hook, that might produce props,
// which are then removed from the component's props type.
export const TestContainer = withHook(Test)(() => {
  const content = useObservable(content$, '');

  return { content };
});

const rendered = <TestContainer />;

const Same = withHook(Test)(() => {});
const sameRendered = <Same content="" />;

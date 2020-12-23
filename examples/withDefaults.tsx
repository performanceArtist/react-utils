import { memo } from 'react';
import { withDefaults } from '../src';

type TestProps = {
  content: string;
};
const Test = memo<TestProps>(props => <div></div>);

const DTest = withDefaults(Test)({ content: 'content' });

const rendered = <DTest />;
const overloaded = <DTest content="newContent" />;

const ExtraProps = withDefaults(Test)({ content: 'content', test: 0 });
const rendered1 = <ExtraProps content="" />;
const overloaded1 = <ExtraProps content="newContent" test={0} />;

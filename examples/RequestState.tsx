import { requestResult, RequestResult } from '@performance-artist/fp-ts-adt';
import { makeWithData, RequestStateRenderer, withDefaults } from '../src';

type RequestStateProps<T> = {
  data: RequestResult<T>;
  onSuccess: (result: T) => JSX.Element;
};

const onError = (error: Error) => <h2>{error.toString()}</h2>;
const onPending = () => <div>Loading...</div>;
const onInitial = () => <div>Loading...</div>;

export const RequestState = function<T>({
  data,
  onSuccess,
}: RequestStateProps<T>) {
  return (
    <RequestStateRenderer
      onError={onError}
      onPending={onPending}
      onInitial={onInitial}
      onSuccess={onSuccess}
      data={data}
    />
  );
};

type Todo = {
  id: number;
  content: string;
};
const data: RequestResult<Todo> = requestResult.pending;
const rendered = (
  <RequestState data={data} onSuccess={({ content }) => <div>{content}</div>} />
);

const withData = makeWithData(RequestState);

type Props = {
  todos: RequestResult<Todo[]>;
  user: RequestResult<{ username: string }>;
};
const renderedAlt = withData<Props>()(['todos', 'user'], ({ todos, user }) => {
  return (
    <div>
      Username: {user.username}
      {todos.map(todo => (
        <div key={todo.id}>{todo.content}</div>
      ))}
    </div>
  );
});

import { pipe } from 'fp-ts/lib/pipeable';
import { either } from 'fp-ts';
import { requestResult, RequestResult } from '@performance-artist/fp-ts-adt';

type RequestStateRendererProps<T> = {
  data: RequestResult<T>;
  onInitial: () => JSX.Element;
  onSuccess: (result: T) => JSX.Element;
  onPending: () => JSX.Element;
  onError: (error: Error) => JSX.Element;
};

export function makeRequestStateRenderer<T>(props: RequestStateRendererProps<T>) {
  const { data, onSuccess, onError, onPending, onInitial } = props;

  return pipe(
    data,
    either.fold(left => {
      if (requestResult.isPending(left)) {
        return onPending();
      } else if (requestResult.isInitial(left)) {
        return onInitial();
      } else {
        return onError(left);
      }
    }, onSuccess),
  );
}

import { Behavior } from '@performance-artist/rx-utils';
import { pipe } from 'fp-ts/lib/pipeable';
import { useObservable } from './useObservable';
import { useMemo } from 'react';
import { Selector } from '@performance-artist/fp-ts-adt';
import * as rxo from 'rxjs/operators';

export const useBehavior = <T>(b: Behavior<T>) => {
  const value$ = useMemo(() => pipe(b.value$, rxo.skip(1)), [b]);
  return useObservable(value$, b.get());
};

export const useBehaviorSelector = <T, A>(
  b: Behavior<T>,
  selector: Selector<T, A>,
) => {
  const { value$, initial } = useMemo(
    () => ({
      value$: pipe(
        b.value$,
        rxo.map(selector.run),
        rxo.distinctUntilChanged(),
        rxo.skip(1),
      ),
      initial: selector.run(b.get()),
    }),
    [b, selector],
  );

  return useObservable(value$, initial);
};

type Values<S extends Selector<any, any>[]> = {
  [key in keyof S]: S[key] extends Selector<any, infer V> ? V : never;
};

export const useBehaviorSelectors = <T, S extends Selector<T, any>[]>(
  b: Behavior<T>,
  ...selectors: S
): Values<S> => {
  const { value$, initial } = useMemo(
    () => ({
      value$: pipe(
        b.value$,
        rxo.map(state => selectors.map(selector => selector.run(state))),
        rxo.distinctUntilChanged((a, b) =>
          a.every((value, index) => value === b[index]),
        ),
        rxo.skip(1),
      ),
      initial: selectors.map(selector => selector.run(b.get())),
    }),
    [b, ...selectors],
  );

  return useObservable(value$, initial) as any;
};

import { DependencyList, useEffect, useMemo } from 'react';

export type Subscription = {
  unsubscribe: () => void;
};

export type Subscribable = {
  subscribe: () => Subscription;
};

export const useSubscribable = (
  s: Subscribable,
  deps: DependencyList | undefined,
) => {
  const sub = useMemo(() => s.subscribe(), deps);

  useEffect(() => () => sub.unsubscribe(), [sub]);
};

export const useSubscription = (
  s: () => Subscription,
  deps: DependencyList | undefined,
) => {
  const sub = useMemo(() => s(), deps);

  useEffect(() => () => sub.unsubscribe());
};

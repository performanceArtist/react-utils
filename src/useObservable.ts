import { useMemo, useState } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <A>(fa: Observable<A>, initial: A): A => {
  const [value, setValue] = useState(initial);

  useMemo(() => {
    const subscription = fa.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, []);

  return value;
};

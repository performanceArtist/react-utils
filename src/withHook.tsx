import React, { ComponentType } from 'react';

export const withHook = <T extends object>(C: ComponentType<T>) => <
  D extends Partial<T>
>(
  hook: (rest: T) => D | void,
): ComponentType<Omit<T, keyof D>> => (props: any) => (
  <C {...(hook(props) || {})} {...props} />
);

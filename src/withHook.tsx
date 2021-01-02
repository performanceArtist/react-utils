import React, { ComponentType } from 'react';

export const withHook = <T extends object>(C: ComponentType<T>) => <
  D extends Partial<T> | void
>(
  hook: (rest: T) => D,
): D extends void ? ComponentType<T> : ComponentType<Omit<T, keyof D>> =>
  ((props: any) => <C {...(hook(props) || {})} {...props} />) as any;

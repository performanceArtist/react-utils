import { ComponentType, createElement, memo } from 'react';
import { Object, Boolean, Any } from 'ts-toolbelt';

type MapFalse<T, O extends Partial<T>> = {
  [key in keyof O]: key extends keyof T ? T[key] : Boolean.False;
};
type FilterNever<O extends object> = {
  [key in keyof Object.Select<O, Boolean.False>]: never;
};
type FilterPartial<O extends object> = {
  [key in keyof Object.Filter<O, Boolean.False>]?: key extends keyof O
    ? O[key]
    : never;
};

export const withDefaults = <P>(c: ComponentType<P>) => <D extends Partial<P>>(
  defaults: D,
): ComponentType<
  Any.Compute<
    Omit<P, keyof D> &
      FilterNever<MapFalse<P, D>> &
      FilterPartial<MapFalse<P, D>>,
    'flat'
  >
> => memo(props => createElement(c, { ...defaults, ...(props as any) })) as any;

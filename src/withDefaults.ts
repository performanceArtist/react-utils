import { ComponentType, createElement, memo } from 'react';

type Compute<A> = A extends object
  ? {
      [K in keyof A]: A[K];
    } & {}
  : never;

type MapNever<T, O extends Partial<T>> = {
  [key in keyof O]: key extends keyof T ? T[key] : never;
};

type PickBy<T extends object, C> = Pick<
  T,
  {
    [key in keyof T]: T[key] extends C ? key : never;
  }[keyof T]
>;

type OmitBy<T extends object, C> = Pick<
  T,
  {
    [key in keyof T]: T[key] extends C ? never : key;
  }[keyof T]
>;

export const withDefaults = <P>(c: ComponentType<P>) => <D extends Partial<P>>(
  defaults: D,
): ComponentType<
  Compute<
    Omit<P, keyof D> &
      PickBy<MapNever<P, D>, never> &
      Partial<OmitBy<MapNever<P, D>, never>>
  >
> => memo(props => createElement(c, { ...defaults, ...(props as any) })) as any;

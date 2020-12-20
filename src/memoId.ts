import { ComponentType, memo } from 'react';

export const memoId = memo as <E extends ComponentType<any>>(e: E) => E;

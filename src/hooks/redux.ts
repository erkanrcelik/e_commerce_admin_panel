import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '@/store';

/**
 * Typed dispatch hook for Redux
 *
 * Provides type-safe dispatch function for Redux actions.
 * Use this instead of plain `useDispatch` for better TypeScript support.
 *
 * @returns AppDispatch - Typed dispatch function
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed selector hook for Redux
 *
 * Provides type-safe selector function for Redux state.
 * Use this instead of plain `useSelector` for better TypeScript support.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

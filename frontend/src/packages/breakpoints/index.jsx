import { createBreakpointHooks } from './useBreakpoint';
import { createBreakpointComponents } from './Breakpoint';
import  { createBreakpointMediaQueries } from './breakpointMediaQuery';

export const DEFAULT_BREAKPOINTS = {
  mobile: 640,
  tablet: 1000,
  desktop: 1800,
};

export const createBreakpoints = (breakpoints = DEFAULT_BREAKPOINTS) => ({
  ...createBreakpointHooks(breakpoints),
  ...createBreakpointComponents(breakpoints),
  mediaQuery: createBreakpointMediaQueries(breakpoints),
});

export default createBreakpoints;

import { createBreakpoints } from "@/packages/breakpoints";

export const {
  useMobileBreakpoint,
  useTabletBreakpoint,
  useDesktopBreakpoint,
  useXLDesktopBreakpoint,
  useBreakpointName,
  MobileBreakpoint,
  TabletBreakpoint,
  DesktopBreakpoint,
  XLDesktopBreakpoint,
  mediaQuery,
} = createBreakpoints({
  mobile: 640,
  tablet: 1200,
  desktop: 1800,
});

export default mediaQuery;

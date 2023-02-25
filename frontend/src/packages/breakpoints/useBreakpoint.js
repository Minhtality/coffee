import { useMediaQuery } from 'react-responsive';

export const useBreakpoint = ({
  up = false,
  down = false,
  minWidth,
  maxWidth,
}) => useMediaQuery({
  minWidth: down ? undefined : minWidth,
  maxWidth: up ? undefined : maxWidth,
});

export const createBreakpointHooks = (breakpoints) => ({
  useMobileBreakpoint: (props) => useBreakpoint({ maxWidth: breakpoints.mobile, ...props}),
  useTabletBreakpoint: (props) => useBreakpoint({ minWidth: breakpoints.mobile + 1, maxWidth: breakpoints.tablet, ...props}),
  useDesktopBreakpoint: (props) => useBreakpoint({ minWidth: breakpoints.tablet + 1, maxWidth: breakpoints.desktop, ...props}),
  useXLDesktopBreakpoint: (props) => useBreakpoint({ minWidth: breakpoints.desktop + 1, ...props}),
  useBreakpointName: (props) => {
    const mobile = useMediaQuery({ maxWidth: breakpoints.mobile, ...props });
    const tablet = useMediaQuery({ minWidth: breakpoints.mobile + 1, maxWidth: breakpoints.tablet, ...props });

    if (mobile) return 'mobile';

    if (tablet) return 'tablet';

    return 'desktop';
  }
});

export default useBreakpoint;

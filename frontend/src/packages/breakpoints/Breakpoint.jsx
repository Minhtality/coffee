import React from 'react';
import Responsive from 'react-responsive';

export const Breakpoint = ({
  up = false,
  down = false,
  minWidth,
  maxWidth,
  children,
  ...props
}) => {
  if (!children) {
    return null;
  }
  return (
    <Responsive {...props} maxWidth={up ? undefined : maxWidth} minWidth={down ? undefined : minWidth}>
      {children}
    </Responsive>
  );
};

export const createBreakpointComponents = (breakpoints) => ({
  MobileBreakpoint: (props) => <Breakpoint maxWidth={breakpoints.mobile} {...props} />,
  TabletBreakpoint: (props) => <Breakpoint minWidth={breakpoints.mobile + 1} maxWidth={breakpoints.tablet} {...props} />,
  DesktopBreakpoint: (props) => <Breakpoint minWidth={breakpoints.tablet + 1} maxWidth={breakpoints.desktop} {...props} />,
  XLDesktopBreakpoint: (props) => <Breakpoint minWidth={breakpoints.desktop + 1} {...props} />,
});

export default Breakpoint;

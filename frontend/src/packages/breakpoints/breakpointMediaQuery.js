
export const breakpointMediaQuery = ({
  min,
  max,
  direction,
}) => {
  const query = [];
  if (min && direction !== 'down') {
    query.push(`(min-width: ${min}px)`);
  }
  if (max && direction !== 'up') {
    query.push(`(max-width: ${max}px)`);
  }

  if(query.length === 0) {
    return '@media ';
  }

  return `@media ${query.join(' and ')}`;
};


export const createBreakpointMediaQueries = (breakpoints) => (point, direction) => {
  let min, max;
  if (point === 'tablet') {
    min = breakpoints.mobile + 1;
    max = breakpoints.tablet;
  } else if (point === 'desktop') {
    min = breakpoints.tablet + 1;
    max = breakpoints.desktop;
  } else if (point === 'xldesktop') {
    min = breakpoints.desktop + 1;
  } else {
    max = breakpoints.mobile;
  }
  
  return breakpointMediaQuery({
    min,
    max,
    direction,
  });
};

export default breakpointMediaQuery;
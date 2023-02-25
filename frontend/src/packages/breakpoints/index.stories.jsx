import React from 'react';
import createBreakpoints from './';

const { 
  useMobileBreakpoint,
  useTabletBreakpoint,
  useDesktopBreakpoint,
  useXLDesktopBreakpoint,
  MobileBreakpoint,
  TabletBreakpoint,
  DesktopBreakpoint,
  XLDesktopBreakpoint,
  mediaQuery,
} = createBreakpoints();

export default {
  title: 'packages/Breakpoints',
  parameters: {
    componentSubtitle: 'A library used to create breakpoint functions and components for simple responsive renderings.',
  }
};

export const Intro = () => {
  return (
  <pre style={{margin: 0}}>{`export default {
  mobile: 640,
  tablet: 1000,
  desktop: 1800
}`}</pre>
  );
};
Intro.story = {
  parameters: {
    docs: {
      storyDescription: `
  By default, this package exports a \`createBreakpoints\` function that will return all supported methods. 
  
  We recommend using this function to initialize a breakpoints library for your own application, rather than exporting each method separately.

  Every method, including \`createBreakpoints\`, takes a configuration object with specific keys that denotes the breakpoint sizes:
      `
    }
  }
};

export const ComponentExample = () => {
  return (
  <div>
    <MobileBreakpoint>
      <img src="https://via.placeholder.com/200x200?text=Mobile" alt="Mobile" />
    </MobileBreakpoint>
    <TabletBreakpoint>
      <img src="https://via.placeholder.com/200x200?text=Tablet" alt="Tablet" />
    </TabletBreakpoint>
    <DesktopBreakpoint>
      <img src="https://via.placeholder.com/200x200?text=Desktop" alt="Desktop" />
    </DesktopBreakpoint>
    <XLDesktopBreakpoint>
      <img src="https://via.placeholder.com/200x200?text=XL Desktop" alt="XL Desktop" />
    </XLDesktopBreakpoint>
  </div>
  );
};
ComponentExample.story = {
  parameters: {
    docs: {
      storyDescription: `
To access breakpoint components, import \`breakpoints/Breakpoint\` and pass in the configuration object from above.

This will return the following React components: \`MobileBreakpoint\`, \`TabletBreakpoint\`, \`DesktopBreakpoint\`, and \`XLDesktopBreakpoint\`.
`
    }
  }
};


export const HooksExample = () => {
  const isMobile = useMobileBreakpoint();
  const isTablet = useTabletBreakpoint();
  const isDesktop = useDesktopBreakpoint();
  const isXLDestop = useXLDesktopBreakpoint();
  return (
    <div>
      { isMobile && <img src="https://via.placeholder.com/200x200?text=Mobile" alt="Mobile" /> }
      { isTablet && <img src="https://via.placeholder.com/200x200?text=Tablet" alt="Tablet" /> }
      { isDesktop && <img src="https://via.placeholder.com/200x200?text=Desktop" alt="Desktop" /> }
      { isXLDestop && <img src="https://via.placeholder.com/200x200?text=XL Desktop" alt="XL Desktop" /> }
  </div>
  );
};
HooksExample.story = {
  parameters: {
    docs: {
      storyDescription: `
To access breakpoint hooks, import \`breakpoints/useBreakpoint\` and pass in the configuration object form above.

This will return the following hooks: \`useMobileBreakpoint\`, \`useTabletBreakpoint\`, \`useDesktopBreakpoint\`, and \`useXLDesktopBreakpoint\`
`
    }
  }
};

export const MediaQueryExample = () => {
  return (
    <div>
      <div>Mobile: {mediaQuery('mobile')}</div>
      <div>Tablet: {mediaQuery('tablet')}</div>
      <div>Desktop: {mediaQuery('desktop')}</div>
      <div>XL Desktop: {mediaQuery('xldesktop')}</div>
    </div>
  );
};
MediaQueryExample.story = {
  parameters: {
    docs: {
      storyDescription: `
This package also provides a css media query generator for use with any CSS-in-JS Library. Import \`breakpoints/breakpointMediaQuery\` and pass in the configuration object form above.

This will return a javascript function that takes in the breakpoint you wish to use as and argument.
`
    }
  }
};


export const Directionality = () => {
  const isTabletDown = useTabletBreakpoint({ down: true });
  return (
    <div>
      <DesktopBreakpoint up>
        <img src="https://via.placeholder.com/200x200?text=Desktop and Up" alt="Desktop and Up" />
        <div>{mediaQuery('desktop', 'up')}</div>
      </DesktopBreakpoint>
      { 
        isTabletDown && 
        <div>
          <img src="https://via.placeholder.com/200x200?text=Tablet and down" alt="Tablet and down" />
          <div>{mediaQuery('tablet', 'down')}</div>
        </div>
      }
    </div>
  );
};
Directionality.story = {
  parameters: {
    docs: {
      storyDescription: `      
All methods support a parameter that allows you to indicate directionality via \`up\` or \`down\`. Including a direction will include all breakpoints above or below the current one. 

By default, no direction is included and only the breakpoint indicated is used.

The following example renders an image at Desktop and up using a Component, and another image Tablet and below using hooks.
`
    }
  }
};



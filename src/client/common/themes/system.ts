// import Checkbox from './Checkbox.theme';
// import Select from './Select.theme';
// import Button from './Button.theme';
// import Tooltip from '../components/Tooltip.theme';
import BREAKPOINTS from '@/common/utils/breakpoints';
// import IconButton from './IconButton.theme';
// import MenuTheme from './Menu.theme';
// import Alert from './Alert.theme';
// import Switch from './Switch.theme';
// import Tabs from './Tabs.theme';
// import Slider from './Slider.theme';
// import FrameButtonTheme from './FrameButton.theme';
// import { formLabelTheme } from './FormLabel.theme';
// import { inputTheme } from './Input.theme';

export const breakpoints = {
  [BREAKPOINTS.base]: '0rem',
  [BREAKPOINTS.small]: '53rem', // 848px
  [BREAKPOINTS.medium]: '80rem', // 1280px
  [BREAKPOINTS.large]: '101rem', // 1616px
};

import { createSystem, defaultConfig } from '@chakra-ui/react';

const system = createSystem(defaultConfig, {
  theme: {
    breakpoints: {
      tablet: '53rem',
      desktop: '80rem',
    },
  },
  globalCss: {
    'html, body': {
      color: 'gray.50',
    },
    '*:focus-visible': {
      boxShadow: 'outline',
      outline: 'none',
    },
  },
  cssVarsPrefix: '',
});

// const theme = extendTheme({
//   breakpoints,
//   config: {
//     initialColorMode: 'dark',
//     useSystemColorMode: false,
//   },
//   styles: {
//     global: {
//       'html, body': {
//         color: 'gray.50',
//       },
//       '*:focus-visible': {
//         boxShadow: 'outline',
//         outline: 'none',
//       },
//     },
//   },
//   cssVarPrefix: '',
//   colors: {
//     // brand: {
//     //   100: 'red',
//     //   300: '#CBD5E0',
//     //   700: '#A0AEC0',
//     //   800: '#718096',
//     //   900: '#1a202c',
//     //   foreground: '#F7FAFC',
//     //   background: '#1A202C',
//     //   primary: '#ED8936',
//     // },
//   },
//   components: {
//     // Checkbox,
//     // Select,
//     // Switch,
//     // Button,
//     // IconButton,
//     // Tooltip,
//     // Menu: MenuTheme,
//     CalendarDay: CalendarDay,
//     // FrameButton: FrameButtonTheme,
//     // FormLabel: formLabelTheme,
//     // Input: inputTheme,
//     // Alert: Alert,
//     // Tabs: Tabs,
//     // Slider: Slider,
//     // Form: FormControl,
//     // FormLabel: formLabelTheme,
//   },
//   // sizes: {
//   //   '4': '0.25rem',
//   //   '8': '0.5rem',
//   //   '12': '0.75rem',
//   //   '16': '1rem',
//   //   '20': '1.25rem',
//   //   '24': '1.5rem',
//   //   '32': '2rem',
//   //   '40': '2.5rem',
//   //   '48': '3rem',
//   //   '64': '4rem',
//   //   '96': '6rem',
//   //   '128': '8rem',
//   // },
//   // space: {
//   //   '2': '0.125rem',
//   //   '4': '0.25rem',
//   //   '6': '0.375rem',
//   //   '8': '0.5rem',
//   //   '12': '0.75rem',
//   //   '16': '1rem',
//   //   '24': '1.5rem',
//   //   '32': '2rem',
//   //   '48': '3rem',
//   //   '64': '4rem',
//   //   '96': '6rem',
//   //   '128': '8rem',
//   // },
// });

export default system;

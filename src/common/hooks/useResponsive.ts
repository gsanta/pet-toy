import { useMediaQuery } from '@chakra-ui/react';
import BREAKPOINTS from '../utils/breakpoints';
import { breakpoints } from '@/client/common/themes/theme';

const minusOnePixel = (value: string) => {
  const valueInPixels = parseInt(value, 10) * 16;
  return `${valueInPixels - 1}px`;
};

const mediaQueries = [
  `(min-width: ${breakpoints[BREAKPOINTS.base]}) and (max-width: ${minusOnePixel(breakpoints[BREAKPOINTS.small])})`,
  `(min-width: ${breakpoints[BREAKPOINTS.small]}) and (max-width: ${minusOnePixel(breakpoints[BREAKPOINTS.medium])})`,
  `(min-width: ${breakpoints[BREAKPOINTS.medium]}) and (max-width: ${minusOnePixel(
    breakpoints[BREAKPOINTS.large],
  )})`,
  `(min-width: ${breakpoints[BREAKPOINTS.large]})`,
];

const useResponsive = () => {
  const [isMobile, isTablet, isDesktop, isWideDesktop] = useMediaQuery(mediaQueries);
  return { isDesktop, isMobile, isTablet, isWideDesktop };
};

export default useResponsive;

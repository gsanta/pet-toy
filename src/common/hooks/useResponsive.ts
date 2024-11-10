import { useMediaQuery } from 'usehooks-ts';
import BREAKPOINTS from '../utils/breakpoints';
import { breakpoints } from '@/client/common/themes/system';

const minusOnePixel = (value: string) => {
  const valueInPixels = parseInt(value, 10) * 16;
  return `${valueInPixels - 1}px`;
};

const useResponsive = () => {
  const isMobile = useMediaQuery(
    `(min-width: ${breakpoints[BREAKPOINTS.base]}) and (max-width: ${minusOnePixel(breakpoints[BREAKPOINTS.small])})`,
  );
  return { isMobile };
};

export default useResponsive;

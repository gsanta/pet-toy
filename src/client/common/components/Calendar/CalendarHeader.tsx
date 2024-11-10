import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import { ReactNode, createContext, useContext, useMemo } from 'react';

const CalendarHeaderContext = createContext<
  | {
      onPrevious: () => void;
      onNext: () => void;
      controls: 'left' | 'right' | 'both';
    }
  | undefined
>(undefined);

export const useCalendarHeaderContext = () => {
  const context = useContext(CalendarHeaderContext);

  if (!context) {
    throw new Error('useCalendarHeaderContext must be used within a Provider');
  }

  return context;
};

export const DatePickerHeaderContent = (props: BoxProps) => (
  <Box alignSelf="center" display="flex" gap="2" justifyContent="center" {...props} />
);
export const DatePickerHeaderPrevious = ({ label }: { label: string }) => {
  const { controls, onPrevious } = useCalendarHeaderContext();
  return (
    <IconButton
      aria-label={label}
      as="button"
      color="purple.10"
      onClick={onPrevious}
      size="sm"
      type="button"
      variant="ghost"
      visibility={controls === 'right' ? 'hidden' : undefined}
    >
      <ChevronLeftIcon />
    </IconButton>
  );
};
export const DatePickerHeaderNext = ({ label }: { label: string }) => {
  const { controls, onNext } = useCalendarHeaderContext();
  return (
    <IconButton
      aria-label={label}
      color="purple.10"
      onClick={onNext}
      size="sm"
      variant="ghost"
      visibility={controls === 'left' ? 'hidden' : undefined}
    >
      <ChevronRightIcon />
    </IconButton>
  );
};

const CalendarHeader = ({
  children,
  controls = 'both',
  onNext,
  onPrevious,
}: {
  onPrevious: () => void;
  onNext: () => void;
  controls?: 'left' | 'right' | 'both';
  children?: ReactNode;
}): JSX.Element => {
  const ctx = useMemo(() => ({ controls, onNext, onPrevious }), [controls, onNext, onPrevious]);
  return (
    <Box alignItems="center" display="flex" gap="1" gridTemplateColumns="2rem auto 2rem" marginBottom="6">
      <CalendarHeaderContext.Provider value={ctx}>{children}</CalendarHeaderContext.Provider>
    </Box>
  );
};
export default CalendarHeader;

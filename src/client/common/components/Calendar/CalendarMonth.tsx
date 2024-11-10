import { createElement, Fragment, useCallback, useId, useMemo } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import CalendarGrid from './CalendarGrid';
import CalendarHeader, {
  DatePickerHeaderContent,
  DatePickerHeaderNext,
  DatePickerHeaderPrevious,
} from './CalendarHeader';
import CalendarDay, { CalendarDayContext } from './CalendarDay';
import { addMonths, format, setYear, subMonths } from 'date-fns';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input';

const getShortWeekdayNames = () => {
  const weekdays = [];
  const referenceDate = new Date(2023, 0, 1); // Start with a known Sunday

  for (let i = 0; i < 7; i++) {
    const day = new Date(referenceDate);
    day.setDate(referenceDate.getDate() + i);
    weekdays.push(format(day, 'EEE'));
  }

  return weekdays;
};

const daysOfTheWeek = getShortWeekdayNames();
const daysCount = 6 * 7;

type CalendarMonthProps = {
  controls: 'left' | 'right' | 'both';
  onViewDateChange: (viewDate: Date) => void;
  onMonthClick: () => void;
  viewDate: Date;
};

const days = createElement(Fragment, {}, ...Array.from({ length: daysCount }).map((_, i) => <CalendarDay n={i + 1} />));

export const datePickerMinYear = 1990;
export const datePickerMaxYear = 2100;

const CalendarMonth = ({ controls, onMonthClick, onViewDateChange, viewDate }: CalendarMonthProps) => {
  const onNextMonth = useCallback(() => onViewDateChange(addMonths(viewDate, 1)), [onViewDateChange, viewDate]);
  const onPreviousMonth = useCallback(() => onViewDateChange(subMonths(viewDate, 1)), [onViewDateChange, viewDate]);

  const dayContext = useMemo(
    () => ({ onNextMonth, onPreviousMonth, viewDate }),
    [onNextMonth, onPreviousMonth, viewDate],
  );

  const monthLabelId = useId();
  return (
    <Box data-testid={`controls-${controls}`}>
      <CalendarHeader controls={controls} onNext={onNextMonth} onPrevious={onPreviousMonth}>
        <DatePickerHeaderPrevious label="previous month" />
        <DatePickerHeaderContent id={monthLabelId}>
          <Button color="purple.10" flexShrink={0} onClick={onMonthClick} size="sm" variant="ghost">
            {format(viewDate, 'LLLL')}
            <ChevronRightIcon />
          </Button>
          <NumberInputRoot
            aria-label="year"
            flexShrink={1}
            max={datePickerMaxYear}
            min={datePickerMinYear}
            onValueChange={({ valueAsNumber }: { valueAsNumber: number }) => {
              onViewDateChange(setYear(viewDate, valueAsNumber));
            }}
            value={format(viewDate, 'yyyy')}
            w="8rem"
          >
            <NumberInputField />
          </NumberInputRoot>
        </DatePickerHeaderContent>
        <DatePickerHeaderNext label="next month" />
      </CalendarHeader>

      <CalendarGrid alignItems="center" gridTemplateRows="2rem" justifyItems="center">
        {daysOfTheWeek.map((day) => (
          <Text key={day} color="neutral.50" textStyle="md" textTransform="capitalize">
            {day}
          </Text>
        ))}
      </CalendarGrid>
      <CalendarGrid aria-labelledby={monthLabelId} paddingTop="8" role="listbox">
        <CalendarDayContext.Provider value={dayContext}>{days}</CalendarDayContext.Provider>
      </CalendarGrid>
    </Box>
  );
};

export default CalendarMonth;

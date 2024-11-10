import { ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import CalendarHeader, {
  DatePickerHeaderContent,
  DatePickerHeaderNext,
  DatePickerHeaderPrevious,
} from './CalendarHeader';
import { format } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const CalendarMonthItem = ({
  'aria-label': label,
  children,
  id,
  n,
  onClick,
  selected,
}: {
  id?: string;
  'aria-label': string;
  children: ReactNode;
  selected: boolean;
  n: number;
  onClick: (n: number) => void;
}) => {
  const { day, text } = useMultiStyleConfig('CalendarDay', {
    currentMonth: true,
    selectable: true,
    selection: selected ? 'incomplete' : undefined,
  });
  return (
    <Box
      aria-label={label}
      aria-selected={selected ? true : undefined}
      as="button"
      id={id}
      onClick={() => onClick(n)}
      role="option"
      sx={day}
      type="button"
      width="12"
    >
      <Text sx={{ ...text, width: '12' }}>{children}</Text>
    </Box>
  );
};

const getMonthNames = (formatStr: string) => {
  const months = [];
  const referenceDate = new Date(2023, 0, 1); // Start with January 1st of any reference year

  for (let i = 0; i < 12; i++) {
    const month = new Date(referenceDate);
    month.setMonth(i);
    months.push(format(month, formatStr));
  }

  return months;
};

const monthNames = getMonthNames('LLL');
const longMonthNames = getMonthNames('LLLL');

const CalendarMonthSelector = ({
  onMonthSelected,
  viewDate,
}: {
  viewDate: Date;
  onMonthSelected: (month: number, year: number) => void;
}): JSX.Element => {
  const [selectedYear, setSelectedYear] = useState(viewDate.getFullYear());
  const onPreviousYear = useCallback(() => setSelectedYear((year) => year - 1), []);
  const onNextYear = useCallback(() => setSelectedYear((year) => year + 1), []);
  const yearRef = useRef<HTMLInputElement>(null);
  useEffect(() => yearRef.current?.focus(), []);
  const monthClicked = useCallback((m: number) => onMonthSelected(m, selectedYear), [onMonthSelected, selectedYear]);
  const monthId = useId();
  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <CalendarHeader onNext={onNextYear} onPrevious={onPreviousYear}>
        <DatePickerHeaderPrevious label="previous year" />
        <DatePickerHeaderContent>
          <NumberInput
            aria-label="year"
            flexShrink={1}
            max={2100}
            min={1990}
            onChange={(_, year) => {
              setSelectedYear(year);
            }}
            value={selectedYear}
            w="8rem"
          >
            <NumberInputField ref={yearRef} />
            <NumberInputStepper>
              <NumberIncrementStepper>
                <ChevronUpIcon />
              </NumberIncrementStepper>
              <NumberDecrementStepper>
                <ChevronDownIcon />
              </NumberDecrementStepper>
            </NumberInputStepper>
          </NumberInput>
        </DatePickerHeaderContent>
        <DatePickerHeaderNext label="next year" />
      </CalendarHeader>
      <Box
        alignItems="center"
        aria-activedescendant={monthId}
        aria-label="month"
        display="grid"
        gridTemplateColumns="repeat(3,1fr)"
        gridTemplateRows="repeat(4, 1fr)"
        justifyItems="center"
        role="listbox"
        rowGap="6"
      >
        {monthNames.map((month, idx) => {
          const selected = viewDate.getMonth() === idx;
          return (
            <CalendarMonthItem
              key={month}
              aria-label={longMonthNames[idx]}
              id={selected ? monthId : undefined}
              n={idx + 1}
              onClick={monthClicked}
              selected={selected}
            >
              {month}
            </CalendarMonthItem>
          );
        })}
      </Box>
    </Box>
  );
};
export default CalendarMonthSelector;

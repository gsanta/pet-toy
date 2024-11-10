import { ReactNode, createContext, useCallback, useContext } from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/react';
import { addDays, getDaysInMonth, getISODay, isEqual, set, startOfDay, subMonths } from 'date-fns';
import { useCalendarContext } from './Calendar.context';
import { getDayStyle, getTextStyle } from './CalendarDay.theme';
import { Tooltip } from '@/components/ui/tooltip';

interface Context {
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  viewDate: Date;
}

export const CalendarDayContext = createContext<Context | undefined>(undefined);

export const useCalendarDayContext = () => {
  const context = useContext(CalendarDayContext);

  if (!context) {
    throw new Error('useCalendarDayContext must be used within a Provider');
  }

  return context;
};

export interface CalendarDayViewProps {
  tooltip?(day: Pick<CalendarDayViewProps, 'selectable' | 'date'>): string | undefined;
  onClick: () => void;
  date: Date;
  onMouseEnter: () => void;
  selectable: boolean;
  today: boolean;
  currentMonth: boolean;
  showOutsideDays: boolean;
  preview: 'from' | 'to' | undefined;
  selection?: 'from' | 'to' | 'between' | 'incomplete';
  children: ReactNode;
}
const CalendarDayView = ({
  children,
  currentMonth,
  date,
  tooltip,
  onClick,
  onMouseEnter,
  preview,
  selectable,
  selection,
  showOutsideDays,
  today,
}: CalendarDayViewProps) => {
  const { unavailable } = useCalendarContext();

  const dayStart = startOfDay(date).getTime();
  const isSelectable = selectable && !unavailable[dayStart];

  const ariaProps: BoxProps = {};

  if (currentMonth) {
    ariaProps['aria-selected'] =
      selection === 'from' || selection === 'to' || selection === 'incomplete' || selection === 'between';
  } else {
    ariaProps.tabIndex = -1;
  }

  const tooltipText = tooltip?.({ selectable, date });

  return (
    <Tooltip label={tooltipText} isDisabled={!tooltipText}>
      <Box
        {...ariaProps}
        as="button"
        onClick={onClick}
        onFocus={onMouseEnter}
        onMouseEnter={onMouseEnter}
        role="option"
        css={getDayStyle({
          currentMonth,
          preview,
          selectable: isSelectable,
          selection,
          showOutsideDays,
          today,
        })}
      >
        <Text
          css={getTextStyle({
            currentMonth,
            preview,
            selectable: isSelectable,
            selection,
            showOutsideDays,
            today,
          })}
        >
          {children}
        </Text>
      </Box>
    </Tooltip>
  );
};

const CalendarDay = ({ n }: { n: number }): JSX.Element | null => {
  const {
    onPreview,
    onSelect,
    dayTooltip,
    preview,
    selectable,
    selected,
    showOutsideMonths: showOutsideDays,
    today,
  } = useCalendarContext();

  const { onNextMonth, onPreviousMonth, viewDate } = useCalendarDayContext();
  const { from: dateSelectableFrom, to: dateSelectableTo } = selectable || {};
  const { from: dateSelectedFrom, to: dateSelectedTo } = selected || {};

  const date = addDays(viewDate, n - getISODay(viewDate));
  const daysInPreviousMonth = getDaysInMonth(subMonths(viewDate, 1));

  const dayOfWeek = getISODay(viewDate);
  const daysInMonth = getDaysInMonth(viewDate);

  const isPreviousMonth = n < dayOfWeek;
  const isNextMonth = n - dayOfWeek >= daysInMonth;
  const isCurrentMonth = !isPreviousMonth && !isNextMonth;
  const isAfterSelectableFromDate = !dateSelectableFrom || date >= dateSelectableFrom;
  const isBeforeSelectableToDate = !dateSelectableTo || date <= dateSelectableTo;
  const isSelectable = isAfterSelectableFromDate && isBeforeSelectableToDate;

  const hasSelectionRange = dateSelectedFrom && dateSelectedTo && !isEqual(dateSelectedFrom, dateSelectedTo);

  let selection: 'from' | 'to' | 'between' | 'incomplete' | undefined;
  const interactive = isCurrentMonth || showOutsideDays;
  if (hasSelectionRange && interactive && date > dateSelectedFrom && date < dateSelectedTo) {
    selection = 'between';
  }
  if (interactive && dateSelectedFrom && isEqual(date, dateSelectedFrom)) {
    selection = hasSelectionRange ? 'from' : 'incomplete';
  }
  if (interactive && dateSelectedTo && isEqual(date, dateSelectedTo)) {
    selection = hasSelectionRange ? 'to' : 'incomplete';
  }

  const onClick = useCallback(() => {
    if (!isSelectable) {
      return;
    }
    onSelect(date);
    if (isPreviousMonth) {
      onPreviousMonth();
    } else if (isNextMonth) {
      onNextMonth();
    }
  }, [isSelectable, onSelect, date, isPreviousMonth, isNextMonth, onPreviousMonth, onNextMonth]);

  const onMouseEnter = useCallback(() => {
    if (isSelectable) {
      onPreview(date);
    }
  }, [isSelectable, onPreview, date]);

  if (isNextMonth && !showOutsideDays) {
    return null;
  }
  if (isPreviousMonth && !showOutsideDays) {
    return <div />;
  }
  return (
    <CalendarDayView
      currentMonth={isCurrentMonth}
      date={date}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      preview={preview}
      selectable={isSelectable}
      selection={selection}
      showOutsideDays={showOutsideDays}
      today={isEqual(today, startOfDay(set(viewDate, { date: n - dayOfWeek + 1 })))}
      tooltip={dayTooltip}
    >
      {isPreviousMonth && daysInPreviousMonth - (dayOfWeek - n - 1)}
      {isCurrentMonth && n - dayOfWeek + 1}
      {isNextMonth && n - dayOfWeek - daysInMonth + 1}
    </CalendarDayView>
  );
};

export default CalendarDay;

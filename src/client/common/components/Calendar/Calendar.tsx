import { useCallback, useMemo } from 'react';
import { Box, Button } from '@chakra-ui/react';
import CalendarMonth from './CalendarMonth';
import CalendarMonthSelector from './CalendarMonthSelector';
import useDateRange, { DateRange } from './useDateRange';
import useResponsive from '@/common/hooks/useResponsive';
import { startOfDay } from 'date-fns';
import CalendarContext, { CalendarContextType } from './Calendar.context';
import CalendarProps from './CalendarProps';
import useCalendarState from './useCalendarState';

export { useDateRange, DateRange };

const Calendar = (props: CalendarProps) => {
  const { dayTooltip, mode, onApply, onClose, selectable, selected, unavailable = [] } = props;

  const { isMobile } = useResponsive();
  const today = startOfDay(Date.now());

  const handleApply = useCallback(
    (from: typeof dateFrom, to: typeof dateTo) => {
      if (onApply) {
        if (mode === 'day') {
          onApply(from);
        } else {
          onApply(new DateRange(from, to));
        }
      }

      onClose();
    },
    [mode, onApply, onClose],
  );

  const {
    dateFrom,
    dateTo,
    handlePreview,
    handleSelect,
    isMonthSelector,
    leftViewDate,
    onMonthClickLeft,
    onMonthClickRight,
    onMonthSelected,
    preview,
    rightViewDate,
    updateLeftViewDate,
    updateRightViewDate,
  } = useCalendarState({
    initialSelectedRange: selected instanceof Date ? new DateRange(selected, selected) : selected,
    mode,
    onApply: handleApply,
    selectableRange: selectable,
  });

  const isSingleMonthView = mode === 'day' || isMobile;

  const currentSelected = useDateRange([dateFrom, dateTo]);

  const unavailableMap = unavailable.reduce<Record<number, boolean>>((map, date) => {
    const dayStart = startOfDay(date).getTime();
    map[dayStart] = true;
    return map;
  }, {});

  const ctx = useMemo<CalendarContextType>(
    () => ({
      dayTooltip,
      onPreview: handlePreview,
      onSelect: handleSelect,
      preview,
      selectable,
      selected: currentSelected,
      showOutsideMonths: isSingleMonthView,
      today,
      unavailable: unavailableMap,
    }),
    [
      currentSelected,
      dayTooltip,
      handlePreview,
      handleSelect,
      isSingleMonthView,
      preview,
      selectable,
      today,
      unavailableMap,
    ],
  );

  return (
    <CalendarContext.Provider value={ctx}>
      <Box padding="6" background="gray.800" border="1px solid orange" boxShadow="10px 10px 5px 0px rgba(0,0,0,0.75)">
        {isMonthSelector ? (
          <CalendarMonthSelector
            onMonthSelected={onMonthSelected}
            viewDate={isMonthSelector === 'left' ? leftViewDate : rightViewDate}
          />
        ) : (
          <>
            <Box display="flex" gap="8" marginBottom="6">
              <CalendarMonth
                controls={isSingleMonthView ? 'both' : 'left'}
                onMonthClick={onMonthClickLeft}
                onViewDateChange={updateLeftViewDate}
                viewDate={leftViewDate}
              />

              {!isSingleMonthView && (
                <CalendarMonth
                  controls="right"
                  onMonthClick={onMonthClickRight}
                  onViewDateChange={updateRightViewDate}
                  viewDate={rightViewDate}
                />
              )}
            </Box>
            {/* {variant === 'filter' && (
              <DatePickerFooter
                mode={mode || 'range'}
                onApply={() => handleApply(dateFrom, dateTo)}
                onClear={onClear}
                onClose={handleClose}
                selected={currentSelected}
              />
            )} */}
            {mode === 'day' && (
              <Box display="flex" justifyContent="space-around">
                <Button onClick={() => handleSelect(new Date())} variant="outline">
                  Today
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </CalendarContext.Provider>
  );
};

export default Calendar;

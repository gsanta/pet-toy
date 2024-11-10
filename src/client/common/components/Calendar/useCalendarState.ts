import { useCallback, useState } from 'react';
import { DateRange } from './useDateRange';
import useViewDate from './useViewDate';
import CalendarProps from './CalendarProps';
import { set } from 'date-fns';

type UseCalendarStateProps = {
  initialSelectedRange?: DateRange;
  mode: CalendarProps['mode'];
  selectableRange?: DateRange;
  onApply(dateFrom: Date, dateTo?: Date): void;
};

const useCalendarState = ({ initialSelectedRange, mode, onApply, selectableRange }: UseCalendarStateProps) => {
  const [dateFrom, setDateFrom] = useState(initialSelectedRange?.from);
  const [dateTo, setDateTo] = useState(initialSelectedRange?.to);

  const [preview, setPreview] = useState<'from' | 'to' | undefined>(undefined);

  const handlePreview = useCallback(
    (date: Date) => {
      if (!preview) {
        return;
      }
      if (dateFrom) {
        if (date > dateFrom) {
          setPreview('to');
        } else {
          setPreview('from');
        }
      }
      setDateTo(date);
    },
    [preview, dateFrom],
  );

  const handleSelect = useCallback(
    (date: Date) => {
      let previewNew: 'from' | 'to' | undefined;
      let dateFromNew = dateFrom;
      let dateToNew = dateTo;

      if (mode === 'day') {
        dateFromNew = date;
      } else if (dateFrom && dateTo) {
        if (!preview) {
          previewNew = 'from';
          dateFromNew = date;
          dateToNew = undefined;
        }
      } else if (dateTo && date > dateTo) {
        dateFromNew = dateTo;
        dateToNew = date;
      } else if (dateFrom && date < dateFrom) {
        dateFromNew = date;
        dateToNew = dateFrom;
      } else if (dateFrom) {
        dateToNew = date;
      } else {
        previewNew = 'from';
        dateFromNew = date;
      }

      setPreview(previewNew);
      setDateFrom(dateFromNew);
      setDateTo(dateToNew);

      if (!dateFromNew || previewNew) {
        return;
      }

      if (mode !== 'day' && !dateToNew) {
        return;
      }

      onApply(dateFromNew, dateToNew);
      setDateTo(undefined);
      setDateFrom(undefined);
    },
    [dateFrom, dateTo, mode, onApply, preview],
  );

  const [isMonthSelector, setIsMonthSelector] = useState<'left' | 'right' | undefined>(undefined);

  const { leftViewDate, rightViewDate, updateLeftViewDate, updateRightViewDate } = useViewDate({
    initalView: dateFrom || selectableRange?.to,
  });

  const onMonthClickLeft = useCallback(() => setIsMonthSelector('left'), []);
  const onMonthClickRight = useCallback(() => setIsMonthSelector('right'), []);
  const onMonthSelected = useCallback(
    (month: number, year: number) => {
      if (isMonthSelector === 'left') {
        updateLeftViewDate(set(new Date(), { month, year }));
      }
      if (isMonthSelector === 'right') {
        updateRightViewDate(set(new Date(), { month, year }));
      }
      setIsMonthSelector(undefined);
    },
    [isMonthSelector, updateLeftViewDate, updateRightViewDate],
  );

  return {
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
    updateLeftViewDate,
    updateRightViewDate,
    rightViewDate,
  };
};

export default useCalendarState;

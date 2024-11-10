import { addMonths, startOfDay, startOfMonth, subMonths } from 'date-fns';
import { useCallback, useState } from 'react';

function useViewDate({ initalView }: { initalView?: Date }): {
  leftViewDate: Date;
  rightViewDate: Date;
  updateLeftViewDate: (date: Date) => void;
  updateRightViewDate: (date: Date) => void;
} {
  const initLeftDate = startOfMonth(startOfDay(initalView || Date.now()));
  const initRightDate = addMonths(initLeftDate, 1);

  const [leftViewDate, setLeftViewDate] = useState(initLeftDate);
  const [rightViewDate, setRightViewDate] = useState(initRightDate);

  const updateDate = useCallback((which: 'left' | 'right', newDate: Date) => {
    const date = startOfMonth(newDate);
    if (which === 'left') {
      setLeftViewDate(date);
      setRightViewDate(addMonths(date, 1));
    } else {
      setLeftViewDate(subMonths(date, 1));
      setRightViewDate(date);
    }
  }, []);

  const updateLeftViewDate = useCallback((date: Date) => updateDate('left', date), [updateDate]);
  const updateRightViewDate = useCallback((date: Date) => updateDate('right', date), [updateDate]);
  return {
    leftViewDate,
    rightViewDate,
    updateLeftViewDate,
    updateRightViewDate,
  };
}

export default useViewDate;

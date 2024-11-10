import { DateRange } from './useDateRange';
import type { CalendarDayViewProps } from './CalendarDay';
import { createContext, useContext } from 'react';

export type MonthData = {
  days: number;
};

export type CalendarContextType = {
  dayTooltip?: CalendarDayViewProps['tooltip'];
  selectable?: DateRange;
  selected?: DateRange;
  today: Date;
  preview: 'from' | 'to' | undefined;
  onSelect: (d: Date) => void;
  showOutsideMonths: boolean;
  onPreview: (d: Date) => void;
  unavailable: Record<number, boolean>;
  monthData: Record<number, MonthData>;
};

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export default CalendarContext;

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendarContext must be used within a Provider');
  }

  return context;
};

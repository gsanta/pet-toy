import { DateRange } from './Calendar';
import { CalendarDayViewProps } from './CalendarDay';

type CalendarProps = {
  children: React.ReactNode;
  dayTooltip?: CalendarDayViewProps['tooltip'];
  selectable?: DateRange;
  onClose: () => void;
  onClear?: () => void;
  unavailable?: Date[];
  visible: boolean;
} & (
  | {
      selected?: DateRange;
      onApply?: (range: DateRange) => void;
      mode?: 'range';
    }
  | {
      selected?: Date;
      onApply?: (day?: Date) => void;
      mode: 'day';
    }
);

export default CalendarProps;

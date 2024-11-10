import { max, min } from 'date-fns';
import { useMemo } from 'react';

export class DateRange {
  public from?: Date;

  public to?: Date;

  constructor(date1?: Date, date2?: Date) {
    this.from = !date1 || !date2 || date1 < date2 ? date1 : date2;
    this.to = !date1 || !date2 || date1 < date2 ? date2 : date1;
  }

  contains(date: Date): boolean {
    if (this.from && this.to) {
      return this.to > date && this.from < date;
    }
    if (this.from && !this.to) {
      return this.from < date;
    }
    if (this.to && !this.from) {
      return this.to > date;
    }
    return true;
  }

  containsEqual(date: Date): boolean {
    if (this.from && this.to) {
      return this.to >= date && this.from <= date;
    }
    if (this.from && !this.to) {
      return this.from <= date;
    }
    if (this.to && !this.from) {
      return this.to >= date;
    }
    return true;
  }
}

function useDateRange(range: [Date | undefined, Date | undefined]): DateRange;
function useDateRange(from?: Date, to?: Date): DateRange;
function useDateRange(arg1?: Date | [Date | undefined, Date | undefined], arg2?: Date): DateRange {
  let from = arg1;
  let to = arg2;
  if (!to && Array.isArray(from)) {
    to = max(from.filter(Boolean) as Date[]);
    from = min(from.filter(Boolean) as Date[]);
  } else {
    from = from as Date | undefined;
    to = to as Date | undefined;
  }

  return useMemo(() => new DateRange(from as Date | undefined, to as Date | undefined), [from, to]);
}

export default useDateRange;

import { background } from '@chakra-ui/styled-system';
import type { CalendarDayViewProps } from './CalendarDay';

const borderRadii: Record<string, string> = {
  from: '0.5rem 0 0 0.5rem',
  incomplete: '0.5rem',
  to: '0 0.5rem 0.5rem 0',
};
function selectionBorder({ selection }: CalendarDayViewProps) {
  if (!selection || selection === 'between') {
    return {};
  }
  return { borderRadius: borderRadii[selection] };
}

function textStyle({ currentMonth, selectable, selection, today }: CalendarDayViewProps) {
  const endpoint = selection === 'from' || selection === 'to' || selection === 'incomplete';

  if (!selectable) {
    return undefined;
  }

  let backgroundColor: string | undefined;

  if (!selection) {
    if (currentMonth) {
      backgroundColor = 'orange.200';
    } else {
      backgroundColor = 'orange.100';
    }
  }

  if (endpoint) {
    return {
      '&:hover, button:focus-visible > &': {
        backgroundColor,
      },
      borderColor: today && 'orange.200',
    };
  }

  return {
    '&:hover, button:focus-visible > &': {
      backgroundColor,
    },
    borderColor: today && 'orange.400',
  };
}

const buttonStyles = ({ currentMonth, preview, selectable, selection, today }: CalendarDayViewProps) => {
  const beingMoved = selection === preview;

  const baseStyles = {
    active: {
      rangeEnd: {
        style: {
          '&:hover, &:focus-visible': {
            backgroundColor: beingMoved ? undefined : 'orange.500',
            // color: beingMoved ? undefined : 'sys.interactive.moderate',
          },
          backgroundColor: beingMoved ? 'orange.500' : 'orange.800',
          // color: beingMoved ? undefined : 'sys.fg.on-color',
        },
      },
      rangeMid: {
        style: {
          '&:hover, &:focus-visible': {
            backgroundColor: 'orange.700',
          },
          backgroundColor: 'orange.600',
        },
      },
      style: {
        color: today ? 'orange.500' : 'sys.fg.primary',
      },
    },
    'n/a': {
      rangeEnd: {
        style: {
          '&:hover, &:focus-visible': {
            color: 'sys.interactive.minimal',
          },
          backgroundColor: beingMoved ? 'sys.interactive.muted' : 'sys.interactive.highlight',
          color: beingMoved ? 'sys.fg.tertiary' : 'sys.interactive.subtle',
        },
      },
      rangeMid: {
        style: {
          '&:hover, &:focus-visible': {
            backgroundColor: 'sys.interactive.muted',
            color: 'sys.interactive.minimal',
          },
          backgroundColor: 'sys.interactive.moderate',
          color: 'sys.interactive.bold',
        },
      },
      style: {
        color: 'sys.fg.tertiary',
      },
    },
  };

  if (!selectable) {
    return {
      backgroundColor: 'gray.200',
      color: 'gray.500',
    };
  }

  const endpoint = selection === 'from' || selection === 'to' || selection === 'incomplete';
  const range = selection && (endpoint ? 'rangeEnd' : 'rangeMid');
  const dayStyles = baseStyles[currentMonth ? 'active' : 'n/a'];

  return {
    ...dayStyles.style,
    ...(range ? dayStyles?.[range]?.style : {}),
  };
};

const CalendarDay = {
  baseStyle(props: CalendarDayViewProps) {
    const { selectable, today } = props;

    return {
      calendar: {
        background: 'gray.800',
        border: '1px solid orange',
        boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)',
      },
      day: {
        _focusVisible: {
          boxShadow: 'none',
          outline: 'none',
        },
        cursor: !selectable ? 'default' : undefined,
        ...buttonStyles(props),
        ...selectionBorder(props),
      },
      text: {
        alignItems: 'center',
        border: today ? '1.5px solid' : undefined,
        borderRadius: '2',
        display: 'flex',
        height: '8',
        justifyContent: 'center',
        width: '10',
        ...textStyle(props),
      },
    };
  },
  parts: ['day', 'selection'],
};

export default CalendarDay;
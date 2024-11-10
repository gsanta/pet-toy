import { DateRange } from './useDateRange';
import { formatISO } from 'date-fns';
import { useCalendarContext } from './Calendar.context';
import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react';

const CalendarFooter = ({
  mode,
  onApply,
  onClear,
  onClose,
  selected,
}: {
  selected?: DateRange;
  onClose: () => void;
  onApply: () => void;
  onClear?: () => void;
  mode: 'day' | 'range';
}) => {
  const { preview } = useCalendarContext();

  const styleGrid = (mobile: string, desktop: string) => (mode === 'day' ? mobile : [mobile, desktop]);

  const displayDate = selected?.from || selected?.to;

  return (
    <Box
      data-testid="footer"
      display="grid"
      gap={displayDate ? 24 : 0}
      gridTemplateColumns="1fr auto 1fr"
      gridTemplateRows={styleGrid(displayDate ? '1.25rem 2rem' : '0 2rem', 'unset')}
    >
      {!!onClear && (
        <Button
          color="purple.10"
          gridColumn="1"
          gridRow={styleGrid('2', '1')}
          onClick={() => onClear()}
          size="sm"
          variant="tertiary"
          width="fit-content"
        >
          Clear
        </Button>
      )}
      <Text
        alignSelf="center"
        color="text.secondary"
        gridColumn={styleGrid('1 / 4', '2')}
        gridRow="1"
        justifySelf="center"
        size="2"
      >
        {mode === 'day' ? (
          selected?.from ? (
            formatISO(selected.from, { representation: 'date' })
          ) : undefined
        ) : (
          <>
            {(!preview || preview === 'to') && selected?.from && formatISO(selected.from, { representation: 'date' })}
            {selected?.to && (
              <>
                {selected?.from || selected?.to ? ' - ' : undefined}
                {(!preview || preview === 'from') && selected?.to && formatISO(selected.to, { representation: 'date' })}
              </>
            )}
          </>
        )}
      </Text>
      <ButtonGroup gridColumn={styleGrid('2 / 4', '3')} gridRow={styleGrid('2', '1')} justifyContent="end">
        <Button onClick={onClose} size="sm" variant="secondary">
          Cancel
        </Button>

        <Button onClick={onApply} size="sm">
          Apply
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default CalendarFooter;

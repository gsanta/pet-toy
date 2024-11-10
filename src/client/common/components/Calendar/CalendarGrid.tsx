import { Box, BoxProps } from '@chakra-ui/react';
import * as React from 'react';

type Props = BoxProps;

const CalendarGrid: React.FunctionComponent<Props> = (props: Props) => {
  return <Box display="grid" {...props} gridAutoRows="2rem" gridRowGap="4" gridTemplateColumns="repeat(7, 2.5rem)" />;
};

export default CalendarGrid;

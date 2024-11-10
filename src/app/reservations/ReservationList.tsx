import { Box } from '@chakra-ui/react';
import { Reservation } from '@prisma/client';

type ReservationListProps = {
  reservations: Reservation[];
};

const ReservationList = ({ reservations }: ReservationListProps) => {
  debugger;
  return (
    <>
      {reservations.map((reservation) => {
        return <Box>{reservation.from.toISOString()}</Box>;
      })}
    </>
  );
};

export default ReservationList;

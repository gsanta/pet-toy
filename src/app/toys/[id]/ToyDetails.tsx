'use client';

import Calendar from '@/client/common/components/Calendar/Calendar';
import { breakpoints } from '@/client/common/themes/system';
import BREAKPOINTS from '@/common/utils/breakpoints';
import { BreadcrumbCurrentLink, BreadcrumbRoot } from '@/components/ui/breadcrumb';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, BreadcrumbLink, Button, Image } from '@chakra-ui/react';
import { Reservation, Toy } from '@prisma/client';
import Link from 'next/link';
import { useMemo } from 'react';

type ToyDetailsProps = {
  toy: Toy;
  reservations: Reservation[];
};

function getDatesBetween(from: Date, to: Date) {
  const dates = [];
  const currentDate = new Date(from);

  while (currentDate <= to) {
    dates.push(new Date(currentDate)); // Add a new Date object to avoid reference issues
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return dates;
}

const ToyDetails = ({ reservations, toy }: ToyDetailsProps) => {
  const unavailableDates = useMemo(() => {
    const unavailables: Date[] = [];

    reservations.forEach((reservation) => {
      unavailables.push(...getDatesBetween(reservation.from, reservation.to));
    });

    return unavailables;
  }, [reservations]);

  return (
    <>
      <BreadcrumbRoot color="gray.700" padding="0.5rem" separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbLink as={Link} href="/">
          Home
        </BreadcrumbLink>

        <BreadcrumbLink as={Link} href="/toys">
          Toys
        </BreadcrumbLink>

        <BreadcrumbCurrentLink href="#">{toy.name}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Box
        flex="1"
        display="flex"
        flexDir={['column', 'row']}
        gap="2"
        justifyContent="space-around"
        maxWidth="1200px"
        padding="4"
      >
        <Image
          srcSet={`/toys/${toy.imageUrl}-800w.jpg 800w, /toys/${toy.imageUrl}-1440w.jpg 1440w`}
          sizes={`(max-width: ${breakpoints[BREAKPOINTS.small]}) 480px, ${breakpoints[BREAKPOINTS.medium]}`}
        />
        <Box>
          <Calendar mode="range" onClose={() => {}} unavailable={unavailableDates} visible>
            <Button>ok</Button>
          </Calendar>
        </Box>
      </Box>
    </>
  );
};

export default ToyDetails;

'use client';

import { breakpoints } from '@/client/common/themes/system';
import BREAKPOINTS from '@/common/utils/breakpoints';
import { Box, Button, Card, Image } from '@chakra-ui/react';
import { Toy } from '@prisma/client';
import Link from 'next/link';

type ToysProps = {
  toys: Toy[];
};

const Toys = ({ toys }: ToysProps) => {
  return (
    <Box
      flex="1"
      display="flex"
      gap="4"
      flexDir={['column', 'row']}
      justifyContent="space-around"
      marginBlock="2rem"
      padding="4"
    >
      {toys.map((toy) => (
        <Card.Root key={toy.id} maxW="800px" variant="elevated" padding="1rem">
          <Card.Body>
            <Image
              srcSet={`/toys/${toy.imageUrl}-800w.jpg 800w, /toys/${toy.imageUrl}-1440w.jpg 1440w`}
              sizes={`(max-width: ${breakpoints[BREAKPOINTS.small]}) 480px, ${breakpoints[BREAKPOINTS.medium]}`}
            />
          </Card.Body>
          <Card.Footer>
            <Button as={Link} colorScheme="orange" href={`toys/${toy.id}`} size="sm">
              See details
            </Button>
          </Card.Footer>
        </Card.Root>
        // <Calendar mode="range" onClose={() => {}} unavailable={[subDays(new Date(), 1)]} variant="filter" visible>
        //   <Button>ok</Button>
        // </Calendar>
      ))}
    </Box>
  );
};

export default Toys;

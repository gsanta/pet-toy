'use client';

import { breakpoints } from '@/client/common/themes/theme';
import BREAKPOINTS from '@/common/utils/breakpoints';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@chakra-ui/react';
import { Toy } from '@prisma/client';
import Link from 'next/link';

type ToyDetailsProps = {
  toy: Toy;
};

const ToyDetails = ({ toy }: ToyDetailsProps) => {
  return (
    <>
      <Breadcrumb color="gray.700" padding="0.5rem" separator={<ChevronRightIcon color="gray.500" />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/toys">
            Toys
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="#">{toy.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box flex="1" display="flex" justifyContent="space-around" marginBlock="2rem">
        <Card maxW="800px" variant="elevated" padding="1rem">
          <CardBody>
            <Image
              srcSet={`/toys/${toy.imageUrl}-800w.jpg 800w, /toys/${toy.imageUrl}-1440w.jpg 1440w`}
              sizes={`(max-width: ${breakpoints[BREAKPOINTS.small]}) 480px, ${breakpoints[BREAKPOINTS.medium]}`}
            />
          </CardBody>
          <CardFooter>
            <Button as={Link} colorScheme="orange" href={`/toys/${toy.id}`} size="sm">
              See details
            </Button>
          </CardFooter>
        </Card>
        {/* <Calendar mode="range" onClose={() => {}} unavailable={[subDays(new Date(), 1)]} variant="filter" visible>
            <Button>ok</Button>
          </Calendar> */}
      </Box>
    </>
  );
};

export default ToyDetails;

import { authOptions } from '@/bff/config/auth';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import ReservationList from './ReservationList';

const prisma = new PrismaClient();

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: session?.user?.email || '',
    },
  });

  const reservations = await prisma.reservation.findMany({
    where: {
      userId: user.id,
    },
  });

  return <ReservationList reservations={reservations} />;
};

export default Page;

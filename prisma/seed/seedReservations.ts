import { PrismaClient, Reservation } from '@prisma/client';

const seedReservations = async (prisma: PrismaClient) => {
  const user = await prisma.user.findFirst();
  const toy = await prisma.toy.findFirst();

  if (!user) {
    throw new Error('User not found');
  }

  if (!toy) {
    throw new Error('Toy not found');
  }

  const reservationSeeds: Reservation[] = [
    {
      createdAt: new Date(2024, 11, 10, 15),
      id: 1,
      from: new Date(2024, 11, 10),
      to: new Date(2024, 11, 15),
      toyId: toy.id,
      userId: user.id,
      updatedAt: new Date(2024, 9, 10, 15),
    },
  ];

  for (const reservation of reservationSeeds) {
    await prisma.reservation.upsert({
      where: { id: reservation.id },
      update: {},
      create: reservation,
    });
  }
};

export default seedReservations;

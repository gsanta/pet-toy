import { PrismaClient } from '@prisma/client';
import toySeeds from './toy.seed';
import seedUsers from './seedUsers';
import seedReservations from './seedReservations';

const prisma = new PrismaClient();
const main = async () => {
  await seedUsers(prisma);

  for (const toy of toySeeds) {
    await prisma.toy.upsert({
      where: { id: toy.id },
      update: {},
      create: toy,
    });
  }

  await seedReservations(prisma);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

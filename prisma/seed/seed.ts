import { PrismaClient } from '@prisma/client';
import toySeeds from './toy.seed';

const prisma = new PrismaClient();
const main = async () => {
  for (const toy of toySeeds) {
    await prisma.toy.upsert({
      where: { id: toy.id },
      update: {},
      create: toy,
    });
  }
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

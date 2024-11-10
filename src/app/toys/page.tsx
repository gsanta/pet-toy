import Toys from './Toys';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Page = async () => {
  const toys = await prisma.toy.findMany();

  return <Toys toys={toys} />;
};

export default Page;

import { PrismaClient } from '@prisma/client';
import ToyDetails from './ToyDetails';

const prisma = new PrismaClient();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const toy = await prisma.toy.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!toy) {
    throw new Error('Not found');
  }

  return <ToyDetails toy={toy} />;
};

export default Page;

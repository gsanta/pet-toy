import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const seedUsers = async (prisma: PrismaClient) => {
  const hashedPassword = await bcrypt.hash('abcd1234', 10);

  const userSeeds: User[] = [
    {
      createdAt: new Date(2024, 11, 10, 15),
      id: '2538ca4d-a6e3-414e-9185-b172e43b23ec',
      email: 'santagergely90@gmail.com',
      name: 'gsanta',
      password: hashedPassword,
      provider: 'credentials',
      updatedAt: new Date(2024, 9, 10, 15),
    },
  ];

  for (const user of userSeeds) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
};

export default seedUsers;

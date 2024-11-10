import { Toy } from '@prisma/client';

const toySeeds: Toy[] = [
  {
    createdAt: new Date(2024, 9, 10, 15),
    id: 1,
    name: 'Toy 1',
    imageUrl: 'toy-1',
    updatedAt: new Date(2024, 9, 10, 15),
  },
  {
    createdAt: new Date(2024, 10, 10, 15),
    id: 2,
    name: 'Toy 2',
    imageUrl: 'toy-2',
    updatedAt: new Date(2024, 10, 10, 15),
  },
];

export default toySeeds;

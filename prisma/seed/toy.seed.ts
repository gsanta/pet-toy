import { Toy } from '@prisma/client';

const toySeeds: Toy[] = [
  {
    createdAt: new Date(2024, 9, 10, 15),
    id: '04306a33-a55c-4e60-9bb2-cbdc8bf1f4b4',
    name: 'Toy 1',
    imageUrl: 'toy-1',
    updatedAt: new Date(2024, 9, 10, 15),
  },
  {
    createdAt: new Date(2024, 10, 10, 15),
    id: '0b36feb6-2bee-438e-85dd-d852c9015758',
    name: 'Toy 2',
    imageUrl: 'toy-2',
    updatedAt: new Date(2024, 10, 10, 15),
  },
  {
    createdAt: new Date(2024, 10, 10, 15),
    id: '1b34feb6-2bee-438e-85dd-d852c9015758',
    name: 'Toy 3',
    imageUrl: 'toy-3',
    updatedAt: new Date(2024, 10, 10, 15),
  },
];

export default toySeeds;

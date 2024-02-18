import { DataSource } from 'typeorm';
import { User } from '@/domains/authentication/domain/entities/User';

const userData = [
  {
    username: 'user1',
    password: '$2b$10$ty8gr7NMvaHyIHW1vvV7oOCaiDeYop/SFOle.vZ/Me.qcC1xyUqSC',
  },
  {
    username: 'user2',
    password: '$2b$10$ty8gr7NMvaHyIHW1vvV7oOCaiDeYop/SFOle.vZ/Me.qcC1xyUqSC',
  },
];

export const seedUsers = async (dataSource: DataSource) => {
  const userRepository = dataSource.getRepository(User);
  for (const user of userData) {
    const existingUser = await userRepository.findOneBy({
      username: user.username,
    });
    if (!existingUser) {
      const newUser = userRepository.create(user);
      await userRepository.save(newUser);
      console.log(`User ${user.username} created.`);
    } else {
      console.log(`User ${user.username} already exists. Skipping.`);
    }
  }
  console.log('User seeding completed.');
};

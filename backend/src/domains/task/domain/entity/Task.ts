import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@/domains/authentication/domain/entities/User';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  deadline: Date;

  @Column()
  completed: boolean;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

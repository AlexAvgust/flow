import { Task } from 'src/models/Task';
import { User } from 'src/models/User';

export type Schedule = {
  date: string;
  user: User;
  tasks: Task[];
};

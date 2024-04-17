import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from './Task';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  date: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Tasks' })
  tasks: Task[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  date: string;

  @Prop({ type: Types.ObjectId, ref: 'users' })
  user: Types.ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'tasks' })
  tasks: Types.ObjectId[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

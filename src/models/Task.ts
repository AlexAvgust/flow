import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { PriorityNum } from 'src/types/taskTypes';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  taskStartDate: string;

  @Prop()
  taskDuration: number;

  @Prop()
  priority: PriorityNum;

  @Prop()
  description: string;

  @Prop()
  isRepeating: boolean;

  @Prop()
  tags?: string[];

  @Prop({ type: Types.ObjectId, ref: 'users' })
  user: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

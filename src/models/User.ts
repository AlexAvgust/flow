import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Task } from './Task';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  birthDate: Date;

  @Prop()
  profilePicture: string;

  @Prop({ type: [Types.ObjectId], ref: 'Task' })
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);

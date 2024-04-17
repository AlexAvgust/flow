import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Schedule } from './Schedule';

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

  @Prop({ type: [Types.ObjectId], ref: 'Schedule' })
  schedules: Schedule[];
}

export const UserSchema = SchemaFactory.createForClass(User);

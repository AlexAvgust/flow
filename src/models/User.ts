import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  birthDate: Date;

  @Prop()
  profilePicture: string;

  @Prop({ type: [Types.ObjectId], ref: 'schedules' })
  schedules: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Auth extends Document {
  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  mobile: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  role: String;

  @Prop()
  address: string;

  @Prop()
  access_token: number;

  @Prop()
  refresh_token: number;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  create_at: Date;

  @Prop({ default: null })
  delete_at: Date | null;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

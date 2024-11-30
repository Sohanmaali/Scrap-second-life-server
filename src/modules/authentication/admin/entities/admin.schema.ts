import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Automatically manage createdAt and updatedAt
export class Admin extends Document {
  @Prop({ required: true }) // Making fields required
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true }) // Ensure unique email
  email: string;

  @Prop({ required: true })
  password: string; // Consider hashing this before saving

  @Prop()
  mobile: string;

  @Prop()
  role: string;

  @Prop()
  address: string;

  @Prop()
  access_token: string; // Change to string if it's a JWT

  @Prop()
  refresh_token: string; // Change to string if it's a JWT

  @Prop()
  image: string;

  @Prop({ default: null })
  delete_at: Date | null;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

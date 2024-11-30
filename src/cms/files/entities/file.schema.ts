import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class File extends Document {
  @Prop()
  price: number;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  create_at: Date;

  @Prop({ default: null })
  delete_at: Date | null;
}

export const FileSchema = SchemaFactory.createForClass(File);

import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  name: String,
  description: String,
  quantity: Number,
});

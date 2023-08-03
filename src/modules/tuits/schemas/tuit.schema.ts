import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema()
export class Tuit {
  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type TuitDocument = HydratedDocument<Tuit>;

export const TuitSchema = SchemaFactory.createForClass(Tuit);

export type TuitModel = Model<TuitDocument>;

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types  } from 'mongoose';
import mongoose from 'mongoose';
import { Question } from 'src/core/questions/entities/question.entity';
import { User } from 'src/core/users/entities/user.entity';

export type TestDocument = Test & Document;
 
@Schema()
export class Test {
  @Prop({ required: true })
  title: string;
 
  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  ownerId: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }], default: [] })
  questions: Question[];

  _id: Types.ObjectId;
}
 
export const TestSchema = SchemaFactory.createForClass(Test);
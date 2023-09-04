import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types  } from 'mongoose';
import mongoose from 'mongoose';
import { Test } from 'src/core/tests/entities/test.entity';
export type QuestionDocument = Question & Document;
 
@Schema()
export class Question {
  @Prop({ required: true })
  questionTitle: string;
 
  @Prop({ required: true })
  variants: [
    {  name: String,
        isCorrect: Boolean
    }];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Test' })
  testId: Test;


  _id: Types.ObjectId;
}
 
export const QuestionSchema = SchemaFactory.createForClass(Question);